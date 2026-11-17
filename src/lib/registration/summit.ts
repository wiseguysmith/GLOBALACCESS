import "server-only";
import type Stripe from "stripe";
import { publicEventApprovals } from "@/config/invitational";
import { registrationMode } from "./gates";
import { db, eventOrigin, stripeClient, checkoutReady } from "./backend";
export interface SummitOrder { id: string; lead_id: string; email: string; status: string; amount: number; expires_at: string; session_id: string | null }
export function summitReady() { const mode = registrationMode(); return checkoutReady() && (mode === "test" || (mode === "live" && publicEventApprovals.summitPrice)); }
export async function summitCheckout(order: SummitOrder) {
  if (!summitReady() || order.status !== "approved" || new Date(order.expires_at).getTime() < Date.now()) throw new Error("summit_unavailable");
  const stripe = stripeClient();
  if (order.session_id) { const session=await stripe.checkout.sessions.retrieve(order.session_id); if (session.status !== "open" || !session.url) throw new Error("summit_unavailable"); return session.url; }
  if (new Date(order.expires_at).getTime()-Date.now()<31*60000) throw new Error("summit_expired");
  const session=await stripe.checkout.sessions.create({ mode:"payment",allowed_payment_method_types:process.env.EVENT_ACH_ENABLED==="true"?["card","us_bank_account"]:["card"],customer_email:order.email,metadata:{kind:"summit",order_id:order.id},payment_intent_data:{metadata:{kind:"summit",order_id:order.id}},line_items:[{quantity:1,price_data:{currency:"usd",unit_amount:120000,product_data:{name:"Future in Finance Summit — standalone admission",description:"February 4, 2027 · San Antonio. Food and beverages on Summit day. Excludes golf, lodging, and golfer VIP experiences."}}}],expires_at:Math.floor(new Date(order.expires_at).getTime()/1000),success_url:`${eventOrigin()}/invitation/registration/return?summit=1`,cancel_url:`${eventOrigin()}/invitation/registration/return?canceled=1&summit=1`},{idempotencyKey:`summit-${order.id}`});
  await db(`event_summit_orders?id=eq.${order.id}&session_id=is.null`,"PATCH",{session_id:session.id});
  if (!session.url) throw new Error("summit_unavailable"); return session.url;
}
export async function reconcileSummit(eventId:string,session:Stripe.Checkout.Session,state?:string) {
  if (session.metadata?.kind!=="summit") return;
  const id=session.metadata.order_id;
  if (!/^[a-f0-9-]{36}$/.test(id ?? "")) throw new Error("invalid_summit");
  if (session.amount_total!==120000 || session.currency!=="usd") throw new Error("summit_mismatch");
  let current=state ?? (session.payment_status==="paid"?"paid":session.status==="expired"?"expired":session.status==="complete"?"processing":"pending");
  if (current === "paid" && session.payment_intent) {
    const intent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent.id;
    const pi = await stripeClient().paymentIntents.retrieve(intent, { expand: ["latest_charge"] });
    const charge = typeof pi.latest_charge === "object" ? pi.latest_charge : null;
    const refunds = await stripeClient().refunds.list({ payment_intent: intent, limit: 10 });
    if ((charge && (charge.refunded || charge.disputed || charge.amount_refunded > 0)) || refunds.data.some(r=>r.status === "pending" || r.status === "requires_action")) current = "review";
    else if (pi.status !== "succeeded") current = "processing";
  }
  if (current!=="pending") await db("rpc/apply_summit_payment","POST",{p_event:eventId,p_order:id,p_session:session.id,p_state:current,p_amount:120000});
}
