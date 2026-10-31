import "server-only";

/**
 * Best-effort, in-memory sliding-window rate limiter.
 *
 * Serverless functions may run on several instances and restart often, so
 * this limits bursts from a single client on a warm instance rather than
 * guaranteeing a global quota. For stricter limits, add a shared store
 * (e.g. Upstash Redis) or platform-level rate limiting — see README.
 */
const buckets = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    const retryAfterMs = windowMs - (now - recent[0]);
    buckets.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Keep memory bounded on long-lived instances.
  if (buckets.size > MAX_KEYS) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function clientKey(headers: Headers): string {
  const candidates = [
    headers.get("x-nf-client-connection-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
    headers.get("x-real-ip"),
  ];
  return candidates.find((v) => v && v.trim())?.trim() ?? "anonymous";
}
