# Loops.so Setup Guide

Email automation for the Backmind waitlist. Loops receives new signups via a Supabase Edge Function and sends a transactional welcome email.

---

## Prerequisites

- Loops.so account (free tier, up to 1,000 contacts)
- Supabase project with `subscribers` table and referral tracking migration applied
- Edge function `loops-webhook` deployed

---

## 1. Contact Properties

In **Settings > Contact Properties**, create:

| Property Name   | Key (auto-generated) | Type    |
|-----------------|----------------------|---------|
| Referral Code   | `referralCode`       | Text    |
| Is Beta Tester  | `isBetaTester`       | Boolean |
| Signup Position  | `signupPosition`     | Number  |
| Referral Count   | `referralCount`      | Number  |

These are populated automatically by the edge function on contact creation.

---

## 2. Tags

Go to **Contacts > Tags** and create:

- `founding_member` — applied when signup position <= 200
- `waitlist` — applied when signup position > 200

The edge function applies these via the `/contacts/tag` API endpoint.

---

## 3. Transactional Welcome Email

Go to **Transactional > Create New**.

### Settings

- **Internal name**: Welcome Email
- **From**: Darian <darian@backmind.app>
- **Reply-to**: Your personal email (you say "reply to this email — I read every one")
- **Subject line**: `{{subject}}`

The `subject` variable is set by the edge function:
- Position <= 200: `You're Founding Member #42 — here's what that means`
- Position > 200: `You're in — here's how to claim a Founding Spot`

### Data Variables Available

These are passed from the edge function and can be used in the email body:

| Variable          | Example Value                                  | Description                        |
|-------------------|------------------------------------------------|------------------------------------|
| `subject`         | `You're Founding Member #42 — ...`             | Dynamic subject line               |
| `position`        | `42`                                           | Waitlist position number           |
| `title`           | `Founding Member #42`                          | Display title for header           |
| `isFoundingMember`| `true` or `false`                              | For conditional content blocks     |
| `isBetaTester`    | `true` or `false`                              | For conditional content blocks     |
| `rate`            | `$10/month` or `$15/month`                     | Their specific rate                |
| `referralLink`    | `https://backmind.app/?ref=a1b2c3d4`           | Personal referral URL              |
| `referralCode`    | `a1b2c3d4`                                     | Raw referral code                  |

### Email Body

Build this in the Loops visual editor or paste into the HTML source.

#### Header

```
{{title}}
```

#### Pricing Block (conditional)

```html
{{#if isFoundingMember equals "true"}}
<p>
  Your Founding Member rate of <strong>$10/month</strong> is locked in — forever.
  That's $5/month less than the standard $15/month price.
</p>
{{else}}
<p>
  Backmind launches at <strong>$15/month</strong>. Want the Founding Member rate
  of $10/month? Refer 3 friends to lock it in permanently.
</p>
{{/if}}

<p style="color: #7A6E62; font-size: 14px;">
  No free tier, because real AI costs real money to run. We absorb ~$4/month in
  AI costs per user so you get the full experience from day one.
</p>
```

#### Beta Tester Block (conditional)

```html
{{#if isBetaTester equals "true"}}
<p>
  You're in as a tester. You'll get TestFlight access soon — I'm onboarding
  testers in small batches to keep quality high.
</p>
{{/if}}
```

#### Referral Block

```html
<h3>Move up the list</h3>
<p>Share your personal link:</p>
<p><a href="{{referralLink}}">{{referralLink}}</a></p>
<ul>
  <li><strong>Refer 3 friends</strong> — lock in $10/month forever</li>
  <li><strong>Refer 5</strong> — founding rate + private community access</li>
</ul>
```

#### Personal Note

```html
<p>
  I built Backmind because I kept losing sight of who I was becoming — not from
  lack of ambition, but from having too many versions of myself competing for
  attention. If that sounds familiar, you're in the right place.
</p>

<p>Reply to this email if you want to chat — I read every one.</p>

<p>— Darian</p>
```

### After Saving

Copy the **Transactional ID** from the email settings page. You'll need it for the edge function secrets.

---

## 4. Secrets & Deployment

Set the required secrets in Supabase:

```bash
supabase secrets set LOOPS_API_KEY=<your-loops-api-key>
supabase secrets set LOOPS_WELCOME_EMAIL_ID=<transactional-id-from-step-3>
```

Deploy the edge function:

```bash
supabase functions deploy loops-webhook
```

---

## 5. Database Webhook

If not already applied, run `docs/migration_webhook_loops.sql` in the Supabase SQL Editor after replacing:

- `<project-ref>` — your Supabase project reference (e.g. `abcdefghijkl`)
- `<service-role-key>` — your service role key (Dashboard > Settings > API)

Make sure the `pg_net` extension is enabled (Dashboard > Database > Extensions > search "pg_net" > Enable).

---

## 6. Data Flow

```
User submits form
  → INSERT into subscribers (referral_code auto-generated)
  → DB trigger fires (pg_net POST to Edge Function)
  → Edge Function:
      1. Calls get_waitlist_position RPC
      2. Creates Loops contact with custom properties
      3. Tags contact as founding_member or waitlist
      4. Sends transactional welcome email with dynamic variables
```

---

## 7. Testing

1. Insert a test row in Supabase SQL Editor:
   ```sql
   INSERT INTO subscribers (email, beta_tester)
   VALUES ('test@example.com', true);
   ```
2. Check Supabase Edge Function logs for success/error output
3. Verify in Loops dashboard:
   - Contact created with correct properties
   - Tag applied (`founding_member` or `waitlist`)
   - Transactional email sent (check Loops > Transactional > Logs)
4. Check your inbox for the welcome email
5. Delete the test contact from Loops and the test row from Supabase when done

---

## Fallback: Kit (ConvertKit) + Resend

If Loops doesn't work or you outgrow the 1,000-contact free tier:

- **Kit free tier**: 10,000 subscribers, visual automation builder, tagging, custom fields
- **Resend free tier**: 3,000 emails/month, transactional email API
- The edge function pattern stays the same — swap the Loops API calls for Kit + Resend endpoints
- Kit handles contact management and drip sequences; Resend handles transactional sends
