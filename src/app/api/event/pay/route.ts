import { checkout, checkoutReady, db, validToken, type Payment, type Team } from "@/lib/registration/backend";
import { readEventRequest, reply, requestError } from "@/lib/registration/request";
import { summitCheckout, type SummitOrder } from "@/lib/registration/summit";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!checkoutReady()) return reply({ error: "Payment is currently unavailable." }, 503);
  try {
    const body = await readEventRequest(request);
    const id = String(body.paymentId ?? "");
    if (!/^[a-f0-9-]{36}$/.test(id) || !validToken(id, String(body.token ?? ""))) return reply({ error: "This payment link is invalid." }, 403);
    if (body.kind === "summit") {
      const [order] = await db<SummitOrder[]>(`event_summit_orders?id=eq.${id}`);
      if (!order) return reply({ error: "This payment link is unavailable." }, 404);
      return reply({ url: await summitCheckout(order) });
    }
    const [payment] = await db<Payment[]>(`event_payments?id=eq.${id}`);
    if (!payment) return reply({ error: "This payment link is unavailable." }, 404);
    const [team] = await db<Team[]>(`event_teams?id=eq.${payment.team_id}`);
    return reply({ url: await checkout(payment, team) });
  } catch (error) { return requestError(error); }
}
