import "server-only";
import { clientKey, rateLimit } from "@/lib/submissions/rate-limit";
export const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function readEventRequest(request: Request): Promise<Record<string, unknown>> {
  const expected = new URL(process.env.EVENT_PUBLIC_ORIGIN || request.url).origin;
  if (request.headers.get("origin") !== expected) throw new Error("origin");
  if (!rateLimit(`event:${clientKey(request.headers)}`, { limit: 8, windowMs: 600000 }).allowed) throw new Error("rate");
  if (!request.headers.get("content-type")?.includes("application/json")) throw new Error("format");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("format");
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.length; if (size > 20000) { await reader.cancel(); throw new Error("size"); }
    chunks.push(value);
  }
  const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("format");
  const body = parsed as Record<string, unknown>;
  if (body.website || typeof body.startedAt !== "number" || Date.now() - body.startedAt < 3000 || body.startedAt > Date.now()) throw new Error("spam");
  return body;
}
export function requestError(error: unknown) {
  const message = error instanceof Error ? error.message : "unknown";
  if (message === "rate") return reply({ error: "Please wait a few minutes before trying again." }, 429);
  if (["origin", "format", "size", "spam"].includes(message)) return reply({ error: "We could not accept this request. Review your details and try again." }, 400);
  if (message === "capacity_reached") return reply({ error: "All team slots are currently reserved. Please contact the event team." }, 409);
  return reply({ error: "We could not complete this request. No team is confirmed. Please try again or contact the event team." }, 503);
}
