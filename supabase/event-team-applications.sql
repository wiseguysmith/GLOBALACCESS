-- Additive migration for databases that already applied event-registration.sql.
-- Run before enabling online golf applications. Payment remains closed.
begin;
alter table public.event_leads drop constraint if exists event_leads_category_check;
alter table public.event_leads add constraint event_leads_category_check
  check (category in ('golf','summit','sponsor','vendor','general','future'));
commit;
