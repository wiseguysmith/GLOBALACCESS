import { reply } from "@/lib/registration/request";
export const runtime = "nodejs";

// Team entry now requires organizer acceptance. Keep the former public checkout
// endpoint closed until a verified approval-bound payment invitation is implemented.
// Existing signed payment links/webhooks remain available for reconciliation.
export async function POST() {
  return reply({ error: "Team places require organizer review. Apply at /invitation/inquire/golf. No payment is requested with an application." }, 503);
}
