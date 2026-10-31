-- GLOBAL — submission storage schema for Supabase (PostgreSQL)
-- Run once in the Supabase SQL editor. Row Level Security is enabled with
-- NO public policies, so only the server-side service key can read or write.
-- Applicant data is never exposed to the browser.

create table if not exists public.invitation_applications (
  id            uuid primary key,
  submitted_at  timestamptz not null default now(),
  full_name     text not null,
  email         text not null,
  organization  text not null,
  title         text not null,
  country       text not null,
  interest      text not null,
  background    text not null,
  reason        text not null,
  event         text,
  consent_at    timestamptz not null,
  status        text not null default 'new'
    check (status in ('new', 'reviewing', 'conversation', 'approved', 'declined', 'archived')),
  notes         text
);

create index if not exists invitation_applications_submitted_at_idx
  on public.invitation_applications (submitted_at desc);
create index if not exists invitation_applications_status_idx
  on public.invitation_applications (status);

create table if not exists public.contact_inquiries (
  id            uuid primary key,
  submitted_at  timestamptz not null default now(),
  name          text not null,
  email         text not null,
  organization  text,
  topic         text not null,
  message       text not null,
  consent_at    timestamptz not null,
  status        text not null default 'new'
    check (status in ('new', 'in_progress', 'responded', 'archived')),
  notes         text
);

create index if not exists contact_inquiries_submitted_at_idx
  on public.contact_inquiries (submitted_at desc);

alter table public.invitation_applications enable row level security;
alter table public.contact_inquiries enable row level security;

-- Intentionally no policies: anon and authenticated roles have no access.
revoke all on public.invitation_applications from anon, authenticated;
revoke all on public.contact_inquiries from anon, authenticated;
