import { timingSafeEqual } from "node:crypto";
import { db, reconcileSession, stripeClient, type Payment } from "@/lib/registration/backend";
import { sendEventMail } from "@/lib/registration/mail";
import { reply } from "@/lib/registration/request";
import { summitReady, reconcileSummit, type SummitOrder } from "@/lib/registration/summit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const expected = process.env.EVENT_ADMIN_SECRET;
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!expected || expected.length < 32 || token.length !== expected.length || !timingSafeEqual(Buffer.from(token), Buffer.from(expected))) return reply({ error: "Unauthorized" }, 401);
  const body = await request.json().catch(() => ({}));
  try {
    if (body.action === "approve_summit") {
      if (!summitReady() || !/^[a-f0-9-]{36}$/.test(String(body.leadId))) return reply({ error: "Summit registration is not approved/configured." }, 409);
      return reply({ orderId: await db("rpc/approve_summit_lead", "POST", { p_lead: body.leadId }) });
    }
    if (body.action === "export") {
      return reply({ teams: await db("event_teams?order=created_at.desc&limit=100"), payments: await db("event_payments?limit=200"), admissions: await db("event_admissions?limit=200"), summitOrders: await db("event_summit_orders?limit=1000"), leads: await db("event_leads?order=created_at.desc&limit=1000"), unsent: await db("event_outbox?sent_at=is.null&select=id,kind,attempts,last_error&limit=100") });
    }
    if (body.action === "maintenance") {
      const payments = await db<Payment[]>("event_payments?status=in.(pending,processing,failed)&session_id=not.is.null&limit=100");
      for (const p of payments) { const session = await stripeClient().checkout.sessions.retrieve(p.session_id!); await reconcileSession(`reconcile:${session.id}:${session.status}:${session.payment_status}`, session); }
      await db("rpc/release_unattached_holds", "POST", {});
      const summitOrders = await db<SummitOrder[]>("event_summit_orders?status=in.(approved,processing,failed)&session_id=not.is.null&limit=1000");
      for (const order of summitOrders) { const session = await stripeClient().checkout.sessions.retrieve(order.session_id!); await reconcileSummit(`summit-reconcile:${session.id}:${session.status}:${session.payment_status}`, session); }
      return reply({ reconciled: payments.length, mail: await sendEventMail() });
    }
    return reply({ error: "Unsupported action" }, 400);
  } catch { return reply({ error: "Admin operation failed. Review service health and retry." }, 503); }
}
