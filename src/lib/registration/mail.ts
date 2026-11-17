import "server-only";
import { db, eventOrigin, paymentToken, type Team } from "./backend";
interface Mail { id: string; dedupe: string; kind: string; team_id: string | null; recipient: string; payload: Record<string, unknown> }
export async function sendEventMail() {
  if (!process.env.RESEND_API_KEY || !process.env.SUBMISSIONS_NOTIFY_FROM || !process.env.EVENT_LINK_SECRET) throw new Error("mail_not_configured");
  const messages = await db<Mail[]>("rpc/claim_event_mail", "POST", {});
  let sent = 0;
  for (const mail of messages) {
    try {
      const [team] = mail.team_id ? await db<Team[]>(`event_teams?id=eq.${mail.team_id}`) : [];
      if ((mail.kind === "confirmed" && team?.status !== "PAID_CONFIRMED") || (mail.kind === "status" && team?.status !== mail.payload.status) || (mail.kind === "started" && team?.status !== "HELD_PENDING_PAYMENT") || (mail.kind === "split" && team && (new Date(team.expires_at).getTime() <= Date.now() || !["HELD_PENDING_PAYMENT", "PARTIALLY_PAID"].includes(team.status)))) {
        await db(`event_outbox?id=eq.${mail.id}`, "PATCH", { sent_at: new Date().toISOString(), last_error: "suppressed_stale_message" }); continue;
      }
      if (mail.kind === "summit_confirmed") {
        const orders=await db<{status:string}[]>(`event_summit_orders?admission_id=eq.${encodeURIComponent(String(mail.payload.admission_id))}`);
        if (orders[0]?.status !== "paid") { await db(`event_outbox?id=eq.${mail.id}`,"PATCH",{sent_at:new Date().toISOString(),last_error:"suppressed_stale_message"}); continue; }
      }
      let subject = "GLOBAL Invitational — request received";
      let text = "Your request has been received. We will follow up after review. This does not confirm attendance.\n";
      if (mail.kind === "started" && team) { subject = "Your golf team registration has started"; text = `Team reference: ${team.id}. A team is confirmed only after $10,000 in total clears. Your checkout hold ends at ${team.expires_at}. Returning from checkout does not confirm payment.\n`; }
      if (mail.kind === "split" && team) {
        subject = "Your linked $5,000 golf-team payment";
        const id = String(mail.payload.payment_id);
        text = `You have been listed as golfer 2 on team ${team.id}. If you were not expecting this, do not pay; contact the organizer.\nThis $5,000 payment is half of one two-person team. Both halves must clear before the team and two included Summit admissions are confirmed.\nSecure link: ${eventOrigin()}/invitation/registration/pay#id=${id}&token=${paymentToken(id)}\nHold ends: ${team.expires_at}. An expired or already used link cannot take another payment.\n`;
      }
      if (mail.kind === "confirmed" && team) {
        subject = "Your golf team is fully paid — Summit access included";
        text = `Team ${team.id} is fully paid. Your individual Summit admission reference: ${mail.payload.admission_id}.\nGolf: February 3, 2027, Briggs Ranch Golf Club.\nFuture in Finance Summit: February 4, 2027, San Antonio. Venue details will follow.\nYour Summit admission and golfer VIP fireside-chat, private salon, and company-hosted dinner access are included. Do not make a second Summit purchase. Food and beverages on both event days are included.\nOn-site lodging is not guaranteed for every golfer; allocations and terms will be communicated separately.\n`;
      }
      if (mail.kind === "status") {
        const status = String(mail.payload.status);
        subject = `Golf team payment update — ${status.replaceAll("_", " ").toLowerCase()}`;
        const explanations: Record<string,string> = { PARTIALLY_PAID: "One linked payment has been received. Your team remains pending until both shares clear. No Summit admissions have been issued yet.", PAYMENT_PROCESSING: "A payment is processing. Bank payments can take several business days. Your team is not yet confirmed.", EXPIRED: "The unpaid checkout hold has expired. Your team is not confirmed.", PAYMENT_FAILED: "A payment was unsuccessful. Your team is not confirmed. Contact support before making another payment.", MANUAL_REVIEW: "Your team requires organizer review. Do not make another payment. Any existing admission is suspended pending review.", REFUND_PENDING: "A refund requires review. Any existing admission is suspended pending reconciliation." };
        text = `${explanations[status] ?? "Your registration needs organizer attention."}\nTeam reference: ${mail.team_id}.\n`;
      }
      if (mail.kind === "lead") { subject = `GLOBAL event lead — ${mail.payload.category}`; text = `Review in the controlled event admin export. Reference: ${mail.payload.lead_id}\nCategory: ${mail.payload.category}\n\n${JSON.stringify(mail.payload.details, null, 2)}\n`; }
      if (mail.kind === "summit_approved") { const id=String(mail.payload.order_id); subject="Your Future in Finance Summit invitation"; text=`Your Summit-only request has been approved. Admission is $1,200 USD, with food and beverages on February 4. Golf, lodging, and golfer VIP experiences are excluded. Payment is required before admission is confirmed. The invitation expires 24 hours after approval.\n${eventOrigin()}/invitation/registration/pay#id=${id}&token=${paymentToken(id)}&kind=summit\n`; }
      if (mail.kind === "summit_confirmed") { subject="Future in Finance Summit — admission confirmed"; text=`Your standalone Summit admission is confirmed for February 4, 2027, San Antonio. Admission reference: ${mail.payload.admission_id}. Venue details will follow. Food and beverages on Summit day are included. Golf, lodging, and golfer VIP experiences are excluded.\n`; }
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `event-${mail.id}` }, body: JSON.stringify({ from: process.env.SUBMISSIONS_NOTIFY_FROM, to: mail.recipient.split(",").map(v=>v.trim()).filter(Boolean), ...(mail.kind === "status" && ["MANUAL_REVIEW","REFUND_PENDING","PAYMENT_FAILED"].includes(String(mail.payload.status)) && process.env.EVENT_NOTIFY_TO ? { cc: process.env.EVENT_NOTIFY_TO.split(",").map(v=>v.trim()).filter(Boolean) } : {}), subject, text: `${text}\nSupport: info@globalaccess.live\n${eventOrigin()}/invitation/inquire/general\nGLOBAL Invitational` }), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("delivery_failed");
      await db(`event_outbox?id=eq.${mail.id}`, "PATCH", { sent_at: new Date().toISOString(), last_error: null }); sent++;
    } catch { await db(`event_outbox?id=eq.${mail.id}`, "PATCH", { last_error: "delivery_failed" }); }
  }
  return { claimed: messages.length, sent };
}
