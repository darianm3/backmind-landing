import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LOOPS_API_KEY = Deno.env.get("LOOPS_API_KEY")!;
const LOOPS_WELCOME_EMAIL_ID = Deno.env.get("LOOPS_WELCOME_EMAIL_ID")!;

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: {
    id: string;
    email: string;
    referral_code: string;
    beta_tester: boolean;
    referral_count: number;
    source?: string;
  };
  schema: string;
}

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();
    const { record } = payload;

    // Compute waitlist position using existing RPC
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: position } = await supabase.rpc("get_waitlist_position", {
      user_id: record.id,
    });

    const isFoundingMember = position !== null && position <= 200;

    const loopsHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOOPS_API_KEY}`,
    };

    // 1. Create contact in Loops with custom properties and tag
    const contactRes = await fetch(
      "https://app.loops.so/api/v1/contacts/create",
      {
        method: "POST",
        headers: loopsHeaders,
        body: JSON.stringify({
          email: record.email,
          source: "waitlist",
          referralCode: record.referral_code,
          isBetaTester: record.beta_tester ?? false,
          signupPosition: position ?? 0,
          referralCount: record.referral_count ?? 0,
        }),
      }
    );

    if (!contactRes.ok) {
      console.error(
        "Loops contact creation failed:",
        await contactRes.text()
      );
    }

    // 2. Tag the contact: "founding_member" if position <= 200, else "waitlist"
    const tag = isFoundingMember ? "founding_member" : "waitlist";
    const tagRes = await fetch("https://app.loops.so/api/v1/contacts/tag", {
      method: "POST",
      headers: loopsHeaders,
      body: JSON.stringify({
        email: record.email,
        tagName: tag,
      }),
    });

    if (!tagRes.ok) {
      console.error("Loops tagging failed:", await tagRes.text());
    }

    // 3. Send transactional welcome email
    const emailRes = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: loopsHeaders,
      body: JSON.stringify({
        transactionalId: LOOPS_WELCOME_EMAIL_ID,
        email: record.email,
        dataVariables: {
          position: String(position ?? "—"),
          isFoundingMember: isFoundingMember ? "true" : "false",
          isBetaTester: (record.beta_tester ?? false) ? "true" : "false",
          subject: isFoundingMember
            ? `You're Founding Member #${position} — here's what that means`
            : `You're in — here's how to claim a Founding Spot`,
          title: isFoundingMember
            ? `Founding Member #${position}`
            : `#${position ?? "—"} on the waitlist`,
          rate: isFoundingMember ? "$10/month" : "$15/month",
          referralLink: `https://backmind.app/?ref=${record.referral_code}`,
          referralCode: record.referral_code,
        },
      }),
    });

    if (!emailRes.ok) {
      console.error(
        "Loops transactional email failed:",
        await emailRes.text()
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("loops-webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
