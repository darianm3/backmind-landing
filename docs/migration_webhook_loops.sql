-- =============================================================================
-- Backmind: Database Webhook → Loops Edge Function
-- Run this in the Supabase SQL Editor AFTER deploying the Edge Function
-- =============================================================================

-- This trigger fires on every new subscriber and POSTs the record to the
-- loops-webhook Edge Function, which creates the Loops contact and sends
-- the transactional welcome email.
--
-- ALTERNATIVE: You can set this up via Dashboard → Database → Webhooks instead
-- of running this SQL. Both approaches do the same thing.
--
-- Replace the two placeholders before running:
--   <project-ref>    → your Supabase project reference (e.g. abcdefghijkl)
--   <service-role-key> → your service_role key (Settings → API → service_role)

-- 1. Trigger function: POST the new row to the Edge Function
CREATE OR REPLACE FUNCTION notify_loops_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM net.http_post(
    url    := 'https://<project-ref>.supabase.co/functions/v1/loops-webhook',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <service-role-key>'
    ),
    body   := jsonb_build_object(
      'type',   TG_OP,
      'table',  TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$;

-- 2. Attach trigger to the subscribers table
CREATE TRIGGER on_subscriber_created_loops
  AFTER INSERT ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION notify_loops_on_signup();

-- =============================================================================
-- NOTE: pg_net (the net.http_post function) is pre-installed on Supabase.
-- If you get "schema net does not exist", enable it via:
--   Dashboard → Database → Extensions → search "pg_net" → Enable
-- =============================================================================
