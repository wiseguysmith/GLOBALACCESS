import "server-only";
import { randomUUID } from "node:crypto";
import { siteConfig } from "@/config/site";
import { clientKey, rateLimit } from "./rate-limit";
import { deliver, isSubmissionConfigured, type SubmissionKind, type SubmissionRecord } from "./destinations";
import {
  hasErrors,
  limits,
  normalizeText,
  validateApplication,
  validateInquiry,
  type ApplicationInput,
  type InquiryInput,
} from "./validation";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;
const MAX_LINKS = 3;

export interface SubmissionResponse {
  ok: boolean;
  code?:
    | "not_configured"
    | "invalid"
    | "rate_limited"
    | "rejected"
    | "delivery_failed"
    | "bad_request";
  message?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
}

function json(body: SubmissionResponse, status: number, headers?: Record<string, string>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Non-browser clients; other checks still apply.
  try {
    const originHost = new URL(origin).host;
    const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const siteHost = new URL(siteConfig.url).host;
    return originHost === requestHost || originHost === siteHost || originHost === `www.${siteHost}`;
  } catch {
    return false;
  }
}

function countLinks(...values: string[]): number {
  return values.reduce((n, v) => n + (v.match(/https?:\/\/|www\./gi)?.length ?? 0), 0);
}

export async function handleSubmission(request: Request, kind: SubmissionKind): Promise<Response> {
  if (!sameOrigin(request)) {
    return json({ ok: false, code: "bad_request", message: "Request origin not allowed." }, 403);
  }

  if (!isSubmissionConfigured()) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Online submissions are not open yet. Your information has not been sent or stored. Please check back soon.",
      },
      503,
    );
  }

  const limit = rateLimit(`${kind}:${clientKey(request.headers)}`, { limit: 8, windowMs: 10 * 60_000 });
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many submissions from this connection. Please wait a few minutes and try again.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Unsupported request format." }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, code: "bad_request", message: "Submission is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "bad_request", message: "Submission could not be read." }, 400);
  }

  // Spam mitigation: honeypot field and minimum completion time.
  const honeypot = normalizeText(body.website, 200);
  const startedAt = Number(body.startedAt);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    return json(
      {
        ok: false,
        code: "rejected",
        message: "We couldn't accept this submission. Please review the form and try again.",
      },
      422,
    );
  }

  const id = randomUUID();
  const submittedAt = new Date().toISOString();
  let record: SubmissionRecord;

  if (kind === "application") {
    const input: ApplicationInput = {
      fullName: normalizeText(body.fullName, limits.name.max + 1),
      email: normalizeText(body.email, limits.email.max + 1).toLowerCase(),
      organization: normalizeText(body.organization, limits.organization.max + 1),
      title: normalizeText(body.title, limits.title.max + 1),
      country: normalizeText(body.country, limits.country.max + 1),
      interest: normalizeText(body.interest, 80),
      background: normalizeText(body.background, limits.longText.max + 1),
      reason: normalizeText(body.reason, limits.longText.max + 1),
      consent: body.consent === true,
      event: normalizeText(body.event, 120),
    };
    const errors = validateApplication(input);
    if (hasErrors(errors)) {
      return json(
        { ok: false, code: "invalid", message: "Please correct the highlighted fields.", fieldErrors: errors as Record<string, string> },
        422,
      );
    }
    if (countLinks(input.background, input.reason) > MAX_LINKS) {
      return json(
        { ok: false, code: "invalid", message: "Please include no more than three links.", fieldErrors: { background: "Please include no more than three links." } },
        422,
      );
    }
    record = {
      id,
      kind,
      submittedAt,
      fullName: input.fullName,
      email: input.email,
      organization: input.organization,
      title: input.title,
      country: input.country,
      interest: input.interest,
      background: input.background,
      reason: input.reason,
      event: input.event || null,
      consentAt: submittedAt,
      status: "new",
    };
  } else {
    const input: InquiryInput = {
      name: normalizeText(body.name, limits.name.max + 1),
      email: normalizeText(body.email, limits.email.max + 1).toLowerCase(),
      organization: normalizeText(body.organization, limits.organization.max + 1),
      topic: normalizeText(body.topic, 40),
      message: normalizeText(body.message, limits.message.max + 1),
      consent: body.consent === true,
    };
    const errors = validateInquiry(input);
    if (hasErrors(errors)) {
      return json(
        { ok: false, code: "invalid", message: "Please correct the highlighted fields.", fieldErrors: errors as Record<string, string> },
        422,
      );
    }
    if (countLinks(input.message) > MAX_LINKS) {
      return json(
        { ok: false, code: "invalid", message: "Please include no more than three links.", fieldErrors: { message: "Please include no more than three links." } },
        422,
      );
    }
    record = {
      id,
      kind,
      submittedAt,
      name: input.name,
      email: input.email,
      organization: input.organization || null,
      topic: input.topic,
      message: input.message,
      consentAt: submittedAt,
      status: "new",
    };
  }

  const { delivered } = await deliver(record);
  if (delivered.length === 0) {
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "We couldn't record your submission just now, so nothing was saved. Please try again in a few minutes.",
      },
      502,
    );
  }

  return json({ ok: true, reference: id.slice(0, 8).toUpperCase() }, 201);
}
