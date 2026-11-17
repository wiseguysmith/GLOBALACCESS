import "server-only";
import Stripe from "stripe";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { registrationMode } from "./gates";
import type { Golfer, PaymentMode, TeamStatus } from "./model";

export interface Team { id: string; mode: PaymentMode; golfers: [Golfer, Golfer]; status: TeamStatus; expires_at: string }
export interface Payment { id: string; team_id: string; player: number; amount: number; status: string; session_id: string | null; payment_intent: string | null }
export function stripeClient() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { maxNetworkRetries: 2, timeout: 12000 }); }
export function hash(value: string) { return createHash("sha256").update(value).digest("hex"); }
export function paymentToken(id: string) { return createHmac("sha256", process.env.EVENT_LINK_SECRET!).update(`payment:${id}`).digest("hex"); }
export function validToken(id: string, token: string) {
  if (!process.env.EVENT_LINK_SECRET || !/^[a-f0-9]{64}$/.test(token)) return false;
  return timingSafeEqual(Buffer.from(paymentToken(id), "hex"), Buffer.from(token, "hex"));
}
export async function db<T>(resource: string, method = "GET", data?: unknown): Promise<T> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("storage_unavailable");
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${resource}`, {
    method, headers: { apikey: key, ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}), "Content-Type": "application/json", Prefer: "return=representation" },
    body: data === undefined ? undefined : JSON.stringify(data), cache: "no-store", signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (error.message === "capacity_reached") throw new Error("capacity_reached");
    throw new Error("storage_failed");
  }
  return response.json() as Promise<T>;
}
export function eventOrigin() {
  const url = new URL(process.env.EVENT_PUBLIC_ORIGIN!);
  if (url.protocol !== "https:" && url.hostname !== "localhost") throw new Error("invalid_origin");
  return url.origin;
}
export function checkoutReady() { return registrationMode() !== "closed" && (process.env.EVENT_LINK_SECRET?.length ?? 0) >= 32 && (process.env.EVENT_ADMIN_SECRET?.length ?? 0) >= 32 && process.env.EVENT_MAIL_WORKER_VERIFIED === "true" && !!process.env.EVENT_POLICY_VERSION && !!process.env.EVENT_NOTIFY_TO && !!process.env.RESEND_API_KEY && !!process.env.SUBMISSIONS_NOTIFY_FROM; }

export async function checkout(payment: Payment, team: Team) {
  if (!checkoutReady()) throw new Error("checkout_closed");
  if (payment.status !== "pending" || !["HELD_PENDING_PAYMENT", "PARTIALLY_PAID", "PAYMENT_PROCESSING"].includes(team.status)) throw new Error("payment_unavailable");
  const stripe = stripeClient();
  if (payment.session_id) {
    const session = await stripe.checkout.sessions.retrieve(payment.session_id);
    if (session.status !== "open" || !session.url) throw new Error("payment_unavailable");
    return session.url;
  }
  if (new Date(team.expires_at).getTime() - Date.now() < 31 * 60_000) throw new Error("hold_expired");
  const origin = eventOrigin();
  const session = await stripe.checkout.sessions.create({
    mode: "payment", allowed_payment_method_types: process.env.EVENT_ACH_ENABLED === "true" ? ["card", "us_bank_account"] : ["card"],
    customer_email: team.golfers[payment.player].email,
    client_reference_id: team.id,
    metadata: { team_id: team.id, payment_id: payment.id, kind: "golf" },
    payment_intent_data: { metadata: { team_id: team.id, payment_id: payment.id, kind: "golf" } },
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: payment.amount, product_data: { name: team.mode === "full" ? "GLOBAL Invitational — two-person golf team" : "GLOBAL Invitational — linked half-team payment", description: "San Antonio · February 3–4, 2027. Team confirmation requires $10,000 total. Includes two Summit admissions and golfer VIP experiences upon full team confirmation." } } }],
    expires_at: Math.floor(new Date(team.expires_at).getTime() / 1000),
    success_url: `${origin}/invitation/registration/return`, cancel_url: `${origin}/invitation/registration/return?canceled=1`,
  }, { idempotencyKey: `golf-checkout-${payment.id}` });
  await db(`event_payments?id=eq.${payment.id}&session_id=is.null`, "PATCH", { session_id: session.id });
  if (!session.url) throw new Error("checkout_unavailable");
  return session.url;
}

export async function reconcileSession(eventId: string, session: Stripe.Checkout.Session, state?: string) {
  const paymentId = session.metadata?.payment_id;
  if (!paymentId || session.metadata?.kind !== "golf") return;
  if (!/^[a-f0-9-]{36}$/.test(paymentId)) throw new Error("invalid_payment_id");
  const [payment] = await db<Payment[]>(`event_payments?id=eq.${paymentId}`);
  if (!payment || payment.team_id !== session.metadata?.team_id || session.currency !== "usd" || session.amount_total !== payment.amount) throw new Error("payment_mismatch");
  const intent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? "";
  // Current Stripe object is authoritative, so late/reordered notifications cannot downgrade paid funds.
  let current = state ?? (session.payment_status === "paid" ? "paid" : session.status === "expired" ? "expired" : session.status === "complete" ? "processing" : "pending");
  if (intent && current === "paid") {
    const pi = await stripeClient().paymentIntents.retrieve(intent, { expand: ["latest_charge"] });
    const charge = typeof pi.latest_charge === "object" ? pi.latest_charge : null;
    const refunds = await stripeClient().refunds.list({ payment_intent: intent, limit: 10 });
    if (charge && (charge.disputed || charge.refunded || charge.amount_refunded > 0)) current = "review";
    else if (refunds.data.some(r => r.status === "pending" || r.status === "requires_action")) current = "refund_pending";
    else if (pi.status !== "succeeded") current = "processing";
  }
  if (current === "pending") return;
  await db("rpc/apply_event_payment", "POST", { p_event: eventId, p_payment: payment.id, p_session: session.id, p_intent: intent, p_state: current, p_amount: payment.amount });
}
