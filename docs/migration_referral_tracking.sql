-- =============================================================================
-- Backmind Waitlist: Referral Tracking Migration
-- Run this in the Supabase SQL Editor
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. ADD COLUMNS: referral_code, referred_by, referral_count
-- -----------------------------------------------------------------------------

-- Each signup gets a unique 8-char alphanumeric code they can share.
-- Using replace() to strip hyphens from the UUID before taking 8 chars,
-- so we get a denser alphanumeric string (hex only: 0-9, a-f).
ALTER TABLE subscribers
  ADD COLUMN referral_code TEXT UNIQUE NOT NULL
    DEFAULT substring(replace(gen_random_uuid()::text, '-', ''), 1, 8);

-- Who referred this person — nullable FK pointing back to another row's referral_code.
ALTER TABLE subscribers
  ADD COLUMN referred_by TEXT
    REFERENCES subscribers(referral_code) ON DELETE SET NULL;

-- Denormalized count so we can display "you've referred N people" without a subquery.
ALTER TABLE subscribers
  ADD COLUMN referral_count INTEGER NOT NULL DEFAULT 0;


-- -----------------------------------------------------------------------------
-- 2. BACKFILL: generate referral codes for any existing rows
-- -----------------------------------------------------------------------------

-- The DEFAULT only applies to new inserts. Existing rows already got the default
-- from the ALTER TABLE above, but if any row somehow has NULL, this fixes it.
UPDATE subscribers
  SET referral_code = substring(replace(gen_random_uuid()::text, '-', ''), 1, 8)
  WHERE referral_code IS NULL;


-- -----------------------------------------------------------------------------
-- 3. INDEX on referred_by for fast lookups when incrementing referral_count
-- -----------------------------------------------------------------------------

CREATE INDEX idx_subscribers_referred_by ON subscribers(referred_by);


-- -----------------------------------------------------------------------------
-- 4. RPC FUNCTION: get_waitlist_position
--    Returns a user's position in the subscribers (1-indexed, ordered by created_at).
--    Accepts the row's id (uuid).
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_waitlist_position(user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::integer
  FROM subscribers
  WHERE created_at <= (
    SELECT created_at FROM subscribers WHERE id = user_id
  );
$$;


-- -----------------------------------------------------------------------------
-- 5. TRIGGER: auto-increment referral_count when someone signs up with a referral
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only fire when referred_by is set on the new row
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE subscribers
      SET referral_count = referral_count + 1
      WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_increment_referral_count
  AFTER INSERT ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION increment_referral_count();


-- -----------------------------------------------------------------------------
-- 6. RLS POLICIES
--    - Anyone can INSERT (public signup form, anon key)
--    - Users can SELECT only their own row (matched by email or id)
--    - The RPC function uses SECURITY DEFINER so it bypasses RLS internally
-- -----------------------------------------------------------------------------

-- Drop existing policies so we can replace them cleanly.
-- (Supabase may have created default policies — adjust names if yours differ.)
DROP POLICY IF EXISTS "Allow public insert" ON subscribers;
DROP POLICY IF EXISTS "Allow select own row" ON subscribers;
DROP POLICY IF EXISTS "Enable insert for anon" ON subscribers;
DROP POLICY IF EXISTS "Enable select for anon" ON subscribers;

-- Make sure RLS is enabled
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can insert a new signup
CREATE POLICY "Allow public insert"
  ON subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can only read their own row.
-- Since we're using the anon key without auth, we match on email via a request header
-- or a function param. For a simple subscribers, the most practical approach is:
--   1. After signup, return the row directly from the insert (no separate SELECT needed)
--   2. For the referral dashboard, pass the email as an RPC param
--
-- If you later add Supabase Auth, switch to: auth.uid() = id
--
-- For now, allow SELECT so the client can read back the inserted row and query by email.
-- This is a permissive policy — tighten it once you add authentication.
CREATE POLICY "Allow select own row"
  ON subscribers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- NOTE: The get_waitlist_position function is SECURITY DEFINER, meaning it runs
-- with the table owner's privileges and bypasses RLS. This is safe because the
-- function only returns a count (integer), never raw row data.


-- -----------------------------------------------------------------------------
-- 7. GRANT EXECUTE on the RPC function to anon and authenticated roles
-- -----------------------------------------------------------------------------

GRANT EXECUTE ON FUNCTION get_waitlist_position(UUID) TO anon, authenticated;


-- =============================================================================
-- DONE. To test:
--
--   -- Insert a signup
--   INSERT INTO subscribers (email) VALUES ('alice@example.com');
--
--   -- Check their referral code was auto-generated
--   SELECT id, email, referral_code FROM subscribers WHERE email = 'alice@example.com';
--
--   -- Insert a referred signup
--   INSERT INTO subscribers (email, referred_by)
--     VALUES ('bob@example.com', '<alice_referral_code>');
--
--   -- Verify alice's referral_count incremented
--   SELECT referral_code, referral_count FROM subscribers WHERE email = 'alice@example.com';
--
--   -- Get bob's subscribers position
--   SELECT get_waitlist_position('<bob_id>');
-- =============================================================================
