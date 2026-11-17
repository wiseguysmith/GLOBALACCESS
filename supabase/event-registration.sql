-- Apply to a dedicated staging Supabase project first. Service-role access only.
begin;
create table public.event_teams (
  id uuid primary key default gen_random_uuid(), request_hash text unique not null,
  event_id text not null default 'san-antonio-2027', mode text not null check(mode in ('full','split')),
  status text not null default 'HELD_PENDING_PAYMENT', golfers jsonb not null check(jsonb_array_length(golfers)=2),
  created_at timestamptz not null default now(), expires_at timestamptz not null default now()+interval '60 minutes',
  consent_at timestamptz not null default now(), policy_version text not null,
  source text, lodging_assignment text
);
create table public.event_payments (
  id uuid primary key default gen_random_uuid(), team_id uuid not null references public.event_teams(id),
  player integer not null check(player in (0,1)), amount integer not null check(amount in (500000,1000000)),
  status text not null default 'pending', session_id text unique, payment_intent text unique,
  updated_at timestamptz not null default now(), unique(team_id,player)
);
create table public.event_stripe_events (id text primary key, received_at timestamptz not null default now());
create table public.event_admissions (
  id uuid primary key default gen_random_uuid(), team_id uuid not null references public.event_teams(id),
  player integer not null, summit boolean not null default true, vip boolean not null default true,
  active boolean not null default true, unique(team_id,player)
);
create table public.event_outbox (
  id uuid primary key default gen_random_uuid(), dedupe text unique not null, kind text not null,
  team_id uuid references public.event_teams(id), recipient text not null, payload jsonb not null,
  created_at timestamptz not null default now(), sent_at timestamptz, attempts integer not null default 0,
  claimed_until timestamptz, last_error text
);
create table public.event_leads (
  id uuid primary key default gen_random_uuid(), category text not null check(category in ('summit','sponsor','vendor','general','future')),
  payload jsonb not null, status text not null default 'new', created_at timestamptz not null default now()
);
alter table public.event_teams enable row level security;
alter table public.event_payments enable row level security;
alter table public.event_stripe_events enable row level security;
alter table public.event_admissions enable row level security;
alter table public.event_outbox enable row level security;
alter table public.event_leads enable row level security;
revoke all on public.event_teams,public.event_payments,public.event_stripe_events,public.event_admissions,public.event_outbox,public.event_leads from anon,authenticated;

create function public.reserve_event_team(p_hash text,p_mode text,p_golfers jsonb,p_policy text,p_source text default '',p_hold integer default 60) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare t public.event_teams; n integer;
begin
  perform pg_advisory_xact_lock(738102027);
  select * into t from public.event_teams where request_hash=p_hash;
  if found then
    if t.mode<>p_mode or t.golfers<>p_golfers then raise exception 'request_conflict'; end if;
    return to_jsonb(t);
  end if;
  if p_mode not in ('full','split') or jsonb_array_length(p_golfers)<>2 or p_hold<60 or p_hold>1440 then raise exception 'invalid_team'; end if;
  -- No clock-based release of potentially processing/part-paid teams.
  -- Attached sessions must be reconciled with Stripe before a slot is released.
  select count(*) into n from public.event_teams where status not in ('EXPIRED','CANCELED','REFUNDED');
  if n>=40 then raise exception 'capacity_reached'; end if;
  insert into public.event_teams(request_hash,mode,golfers,policy_version,source,expires_at) values(p_hash,p_mode,p_golfers,p_policy,p_source,now()+make_interval(mins=>p_hold)) returning * into t;
  insert into public.event_payments(team_id,player,amount) values(t.id,0,case when p_mode='full' then 1000000 else 500000 end);
  if p_mode='split' then insert into public.event_payments(team_id,player,amount) values(t.id,1,500000); end if;
  insert into public.event_outbox(dedupe,kind,team_id,recipient,payload)
    values(t.id||':started','started',t.id,p_golfers->0->>'email','{}');
  if p_mode='split' then
    insert into public.event_outbox(dedupe,kind,team_id,recipient,payload)
      select t.id||':split','split',t.id,p_golfers->1->>'email',jsonb_build_object('payment_id',id) from public.event_payments where team_id=t.id and player=1;
  end if;
  return to_jsonb(t);
end $$;

create function public.apply_event_payment(p_event text,p_payment uuid,p_session text,p_intent text,p_state text,p_amount integer) returns text
language plpgsql security invoker set search_path='' as $$
declare t public.event_teams; p public.event_payments; paid integer; processing integer; failed integer; expired integer; total integer; next_status text;
begin
  -- Same lock order across inventory, payments and admin operations.
  perform pg_advisory_xact_lock(738102027);
  if exists(select 1 from public.event_stripe_events where id=p_event) then return 'duplicate'; end if;
  select * into p from public.event_payments where id=p_payment for update;
  if not found or (p.session_id is not null and p.session_id<>p_session) or p.amount<>p_amount then raise exception 'payment_mismatch'; end if;
  select * into t from public.event_teams where id=p.team_id for update;
  if p_state not in ('paid','processing','failed','expired','review','refund_pending','refunded') then raise exception 'invalid_state'; end if;
  insert into public.event_stripe_events(id) values(p_event);
  if p.status in ('review','refund_pending','refunded') and p_state in ('paid','processing','failed','expired') then return t.status; end if;
  if p.status='paid' and p_state in ('processing','failed','expired') then return t.status; end if;
  update public.event_payments set status=p_state,session_id=p_session,payment_intent=coalesce(nullif(p_intent,''),payment_intent),updated_at=now() where id=p.id;
  select coalesce(sum(amount) filter(where status='paid'),0),count(*) filter(where status='processing'),count(*) filter(where status='failed'),count(*) filter(where status='expired'),count(*)
    into paid,processing,failed,expired,total from public.event_payments where team_id=t.id;
  next_status:=case
    when p_state='refund_pending' then 'REFUND_PENDING'
    when p_state in ('refunded','review') then 'MANUAL_REVIEW'
    when t.status in ('MANUAL_REVIEW','REFUND_PENDING','REFUNDED','CANCELED') then t.status
    when paid=1000000 and t.status='EXPIRED' then 'MANUAL_REVIEW'
    when paid=1000000 then 'PAID_CONFIRMED'
    when processing>0 then 'PAYMENT_PROCESSING'
    when paid>0 and expired+failed>0 then 'MANUAL_REVIEW'
    when paid>0 then 'PARTIALLY_PAID'
    when expired=total then 'EXPIRED'
    when failed>0 then 'PAYMENT_FAILED'
    else t.status end;
  update public.event_teams set status=next_status where id=t.id;
  if next_status='PAID_CONFIRMED' then
    insert into public.event_admissions(team_id,player) values(t.id,0),(t.id,1) on conflict(team_id,player) do nothing;
    insert into public.event_outbox(dedupe,kind,team_id,recipient,payload)
      select t.id||':confirmed:'||a.player,'confirmed',t.id,t.golfers->a.player->>'email',jsonb_build_object('admission_id',a.id)
      from public.event_admissions a where a.team_id=t.id on conflict(dedupe) do nothing;
  elsif next_status in ('MANUAL_REVIEW','REFUND_PENDING','REFUNDED','CANCELED') then
    update public.event_admissions set active=false where team_id=t.id;
  end if;
  if next_status<>t.status and next_status<>'PAID_CONFIRMED' then
    insert into public.event_outbox(dedupe,kind,team_id,recipient,payload)
      values(p_event||':status','status',t.id,t.golfers->0->>'email',jsonb_build_object('status',next_status)) on conflict(dedupe) do nothing;
  end if;
  return next_status;
end $$;

create function public.save_event_lead(p_category text,p_payload jsonb,p_notify text) returns uuid
language plpgsql security invoker set search_path='' as $$
declare lead_id uuid;
begin
  insert into public.event_leads(category,payload) values(p_category,p_payload) returning id into lead_id;
  insert into public.event_outbox(dedupe,kind,recipient,payload) values(lead_id||':staff','lead',p_notify,jsonb_build_object('lead_id',lead_id,'category',p_category,'details',p_payload));
  insert into public.event_outbox(dedupe,kind,recipient,payload) values(lead_id||':ack','ack',p_payload->>'email',jsonb_build_object('category',p_category,'reference',lead_id));
  return lead_id;
end $$;

create function public.claim_event_mail() returns setof public.event_outbox
language sql security invoker set search_path='' as $$
  update public.event_outbox set claimed_until=now()+interval '2 minutes',attempts=attempts+1
  where id in (select id from public.event_outbox where sent_at is null and (claimed_until is null or claimed_until<now()) and attempts<10 order by created_at for update skip locked limit 20)
  returning *;
$$;
revoke all on function public.reserve_event_team(text,text,jsonb,text,text,integer),public.apply_event_payment(text,uuid,text,text,text,integer),public.save_event_lead(text,jsonb,text),public.claim_event_mail() from public,anon,authenticated;
grant execute on function public.reserve_event_team(text,text,jsonb,text,text,integer),public.apply_event_payment(text,uuid,text,text,text,integer),public.save_event_lead(text,jsonb,text),public.claim_event_mail() to service_role;
grant all on public.event_teams,public.event_payments,public.event_stripe_events,public.event_admissions,public.event_outbox,public.event_leads to service_role;
create table public.event_summit_orders (
  id uuid primary key default gen_random_uuid(), lead_id uuid unique not null references public.event_leads(id),
  email text not null, status text not null default 'approved', amount integer not null default 120000 check(amount=120000),
  expires_at timestamptz not null default now()+interval '24 hours', session_id text unique,
  admission_id uuid unique, created_at timestamptz not null default now()
);
alter table public.event_summit_orders enable row level security;
revoke all on public.event_summit_orders from anon,authenticated;
grant all on public.event_summit_orders to service_role;
create function public.approve_summit_lead(p_lead uuid) returns uuid
language plpgsql security invoker set search_path='' as $$
declare l public.event_leads; order_id uuid;
begin
  select * into l from public.event_leads where id=p_lead and category='summit' for update;
  if not found then raise exception 'invalid_lead'; end if;
  select id into order_id from public.event_summit_orders where lead_id=p_lead;
  if found then return order_id; end if;
  insert into public.event_summit_orders(lead_id,email) values(p_lead,l.payload->>'email') returning id into order_id;
  update public.event_leads set status='approved' where id=p_lead;
  insert into public.event_outbox(dedupe,kind,recipient,payload) values(order_id||':approved','summit_approved',l.payload->>'email',jsonb_build_object('order_id',order_id));
  return order_id;
end $$;
create function public.apply_summit_payment(p_event text,p_order uuid,p_session text,p_state text,p_amount integer) returns text
language plpgsql security invoker set search_path='' as $$
declare o public.event_summit_orders;
begin
  select * into o from public.event_summit_orders where id=p_order for update;
  if not found or p_amount<>o.amount or (o.session_id is not null and o.session_id<>p_session) then raise exception 'summit_mismatch'; end if;
  if exists(select 1 from public.event_stripe_events where id=p_event) then return 'duplicate'; end if;
  insert into public.event_stripe_events(id) values(p_event);
  if o.status='review' or (o.status='paid' and p_state in ('processing','failed','expired')) then return o.status; end if;
  if p_state not in ('paid','processing','failed','expired','review') then raise exception 'invalid_state'; end if;
  update public.event_summit_orders set status=p_state,session_id=p_session,admission_id=case when p_state='paid' then coalesce(admission_id,gen_random_uuid()) else admission_id end where id=o.id;
  if p_state='paid' then
    insert into public.event_outbox(dedupe,kind,recipient,payload)
      select o.id||':summit-confirmed','summit_confirmed',email,jsonb_build_object('admission_id',admission_id) from public.event_summit_orders where id=o.id on conflict(dedupe) do nothing;
  end if;
  return p_state;
end $$;
revoke all on function public.approve_summit_lead(uuid),public.apply_summit_payment(text,uuid,text,text,integer) from public,anon,authenticated;
grant execute on function public.approve_summit_lead(uuid),public.apply_summit_payment(text,uuid,text,text,integer) to service_role;

create function public.release_unattached_holds() returns integer
language plpgsql security invoker set search_path='' as $$
declare n integer;
begin
  perform pg_advisory_xact_lock(738102027);
  update public.event_teams t set status='EXPIRED'
    where t.status in ('HELD_PENDING_PAYMENT','PAYMENT_FAILED') and t.expires_at<now()
    and not exists(select 1 from public.event_payments p where p.team_id=t.id and (p.status in ('paid','processing','review','refund_pending','refunded') or (p.session_id is not null and p.status<>'expired')));
  update public.event_teams t set status='MANUAL_REVIEW'
    where t.status='PARTIALLY_PAID' and t.expires_at<now()
    and not exists(select 1 from public.event_payments p where p.team_id=t.id and p.status='processing');
  get diagnostics n=row_count;
  return n;
end $$;
revoke all on function public.release_unattached_holds() from public,anon,authenticated;
grant execute on function public.release_unattached_holds() to service_role;
commit;
