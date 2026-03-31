-- Migration: analytics_events table for lightweight conversion tracking
-- Run this in the Supabase SQL Editor

create table analytics_events (
  id uuid default gen_random_uuid() primary key,
  event_name text not null,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

-- Index for querying events by name and date
create index idx_analytics_events_name_created
  on analytics_events (event_name, created_at desc);

-- RLS: allow anonymous inserts, no reads from client
alter table analytics_events enable row level security;

create policy "Allow anonymous inserts"
  on analytics_events
  for insert
  with check (true);
