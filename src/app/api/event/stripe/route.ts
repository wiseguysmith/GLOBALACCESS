import type Stripe from "stripe";
import { db, stripeClient, reconcileSession, type Payment } from "@/lib/registration/backend";
import { reply } from "@/lib/registration/request";
import { reconcileSummit } from "@/lib/registration/summit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) return reply({ error: "Unavailable" }, 503);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 1_000_000) return reply({ error: "Too large" }, 413);
  let event: Stripe.Event;
  const stripe = stripeClient();
  try { event = stripe.webhooks.constructEvent(raw, request.headers.get("stripe-signature") ?? "", process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return reply({ error: "Invalid signature" }, 400); }
  if (event.livemode !== process.env.STRIPE_SECRET_KEY.startsWith("sk_live_")) return reply({ error: "Mode mismatch" }, 400);
  try {
    if (["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed", "checkout.session.expired"].includes(event.type)) {
      const object = event.data.object as Stripe.Checkout.Session;
      const current = await stripe.checkout.sessions.retrieve(object.id);
      await reconcileSession(event.id, current, event.type === "checkout.session.async_payment_failed" && current.payment_status !== "paid" ? "failed" : undefined);
      await reconcileSummit(event.id, current, event.type === "checkout.session.async_payment_failed" && current.payment_status !== "paid" ? "failed" : undefined);
    } else if (["charge.refunded", "charge.dispute.created", "refund.created", "refund.updated", "refund.failed"].includes(event.type)) {
      const object = event.data.object as Stripe.Charge | Stripe.Dispute | Stripe.Refund;
      const intent = typeof object.payment_intent === "string" ? object.payment_intent : object.payment_intent?.id;
      if (intent) {
        const sessions = await stripe.checkout.sessions.list({ payment_intent: intent, limit: 1 });
        if (sessions.data[0]?.metadata?.kind === "summit") await reconcileSummit(event.id, sessions.data[0], "review");
        if (sessions.data[0]?.metadata?.kind === "golf") await reconcileSession(event.id, sessions.data[0], event.type === "refund.created" ? "refund_pending" : "review");
        const payments = await db<Payment[]>(`event_payments?payment_intent=eq.${encodeURIComponent(intent)}`);
        for (const p of payments) if (p.session_id) await db("rpc/apply_event_payment", "POST", { p_event: event.id, p_payment: p.id, p_session: p.session_id, p_intent: intent, p_state: event.type === "refund.created" ? "refund_pending" : "review", p_amount: p.amount });
      }
    } else if (event.type.startsWith("payment_intent.")) {
      const object = event.data.object as Stripe.PaymentIntent;
      if (["golf", "summit"].includes(object.metadata.kind)) {
        const sessions = await stripe.checkout.sessions.list({ payment_intent: object.id, limit: 1 });
        if (sessions.data[0]) await reconcileSession(event.id, sessions.data[0], event.type === "payment_intent.payment_failed" && object.status !== "succeeded" ? "failed" : undefined);
        if (sessions.data[0]) await reconcileSummit(event.id, sessions.data[0], event.type === "payment_intent.payment_failed" && object.status !== "succeeded" ? "failed" : undefined);
      }
    }
    return reply({ received: true });
  } catch { console.error("[event] Webhook reconciliation failed; Stripe retry required."); return reply({ error: "Reconciliation pending" }, 500); }
}
