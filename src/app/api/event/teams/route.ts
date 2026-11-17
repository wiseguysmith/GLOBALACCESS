import { checkout, checkoutReady, db, hash, type Payment, type Team } from "@/lib/registration/backend";
import { validateGolfers } from "@/lib/registration/model";
import { readEventRequest, reply, requestError } from "@/lib/registration/request";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!checkoutReady()) return reply({ error: "Golf registration is not open. No payment has been taken." }, 503);
  try {
    const body = await readEventRequest(request);
    if (!validateGolfers(body.golfers) || !["full", "split"].includes(String(body.mode)) || body.consent !== true || !/^[a-f0-9]{64}$/.test(String(body.requestKey))) return reply({ error: "Enter two different golfer names and email addresses, choose a payment option, and accept the event terms." }, 422);
    const hold = Number(process.env.EVENT_HOLD_MINUTES ?? 60);
    if (!Number.isInteger(hold) || hold < 60 || hold > 1440) return reply({ error: "Registration configuration requires review." }, 503);
    const team = await db<Team>("rpc/reserve_event_team", "POST", { p_hash: hash(String(body.requestKey)), p_mode: body.mode, p_golfers: body.golfers.map(p => ({ name: p.name.trim(), email: p.email.trim().toLowerCase() })), p_policy: process.env.EVENT_POLICY_VERSION, p_source: typeof body.source === "string" ? body.source.slice(0, 300) : "", p_hold: hold });
    const [payment] = await db<Payment[]>(`event_payments?team_id=eq.${team.id}&player=eq.0`);
    const url = await checkout(payment, team);
    return reply({ url, teamId: team.id });
  } catch (error) { return requestError(error); }
}
