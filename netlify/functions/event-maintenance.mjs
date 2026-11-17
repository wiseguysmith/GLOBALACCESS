// Deploy only after EVENT_ADMIN_SECRET and EVENT_PUBLIC_ORIGIN are configured.
// Netlify scheduled invocations run on published deploys; use manual admin maintenance for staging.
export default async function eventMaintenance() {
  const origin = process.env.EVENT_PUBLIC_ORIGIN;
  const secret = process.env.EVENT_ADMIN_SECRET;
  if (!origin || !secret) return new Response("Event maintenance not configured", { status: 503 });
  const response = await fetch(`${origin}/api/event/admin`, { method: "POST", headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" }, body: JSON.stringify({ action: "maintenance" }) });
  return new Response(response.ok ? "Event maintenance completed" : "Event maintenance failed", { status: response.status });
}
export const config = { schedule: "*/5 * * * *" };
