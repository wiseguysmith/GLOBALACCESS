import "server-only";
import { createHmac } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type SubmissionKind = "application" | "inquiry";

export type SubmissionRecord = {
  id: string;
  kind: SubmissionKind;
  submittedAt: string;
} & Record<string, string | boolean | null>;

interface Destination {
  name: string;
  /** Durable destinations store or forward the full record. */
  durable: boolean;
  send: (record: SubmissionRecord) => Promise<void>;
}

const TIMEOUT_MS = 8000;

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

const isProduction = process.env.NODE_ENV === "production";

/* ---------------------------------------------------------------- Supabase */

function toSnakeCase(record: SubmissionRecord): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    out[key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)] = value;
  }
  return out;
}

function supabaseDestination(): Destination | null {
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY") ?? env("SUPABASE_SECRET_KEY");
  if (!url || !key) return null;

  return {
    name: "supabase",
    durable: true,
    async send(record) {
      const table =
        record.kind === "application"
          ? (env("SUPABASE_APPLICATIONS_TABLE") ?? "invitation_applications")
          : (env("SUPABASE_INQUIRIES_TABLE") ?? "contact_inquiries");
      const { kind: _kind, ...row } = record;
      void _kind;
      const headers: Record<string, string> = {
        apikey: key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      };
      // Legacy service-role keys are JWTs and must also be sent as a bearer token.
      if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

      const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${encodeURIComponent(table)}`, {
        method: "POST",
        headers,
        body: JSON.stringify(toSnakeCase(row as SubmissionRecord)),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
    },
  };
}

/* ----------------------------------------------------------------- Webhook */

function webhookDestination(): Destination | null {
  const url = env("SUBMISSIONS_WEBHOOK_URL");
  if (!url) return null;
  if (isProduction && !url.startsWith("https://")) {
    console.error("[submissions] SUBMISSIONS_WEBHOOK_URL must use https in production; ignoring.");
    return null;
  }
  const secret = env("SUBMISSIONS_WEBHOOK_SECRET");

  return {
    name: "webhook",
    durable: true,
    async send(record) {
      const body = JSON.stringify(record);
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (secret) {
        headers["X-Global-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
      }
      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    },
  };
}

/* ------------------------------------------------------- Email (Resend) */

const LABELS: Record<string, string> = {
  fullName: "Full name",
  name: "Name",
  email: "Email",
  organization: "Organization",
  title: "Professional title",
  country: "Country / region",
  interest: "Primary area of interest",
  background: "Professional background",
  reason: "Reason for requesting an invitation",
  topic: "Topic",
  message: "Message",
  event: "Event",
  submittedAt: "Submitted at",
  id: "Reference",
};

function emailDestination(): Destination | null {
  const apiKey = env("RESEND_API_KEY");
  const to = env("SUBMISSIONS_NOTIFY_TO");
  const from = env("SUBMISSIONS_NOTIFY_FROM");
  if (!apiKey || !to || !from) return null;

  return {
    name: "email",
    // Email delivers the full record to a configured inbox.
    durable: true,
    async send(record) {
      const heading =
        record.kind === "application"
          ? "New Global Invitation request"
          : "New inquiry via globalaccess.live";
      const lines = Object.entries(record)
        .filter(([key, value]) => key !== "kind" && key !== "consent" && value !== null && value !== "")
        .map(([key, value]) => `${LABELS[key] ?? key}:\n${String(value)}\n`);
      const text = `${heading}\n\n${lines.join("\n")}`;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: typeof record.email === "string" ? record.email : undefined,
          subject: `${heading} — ${String(record.fullName ?? record.name ?? "")}`.slice(0, 180),
          text,
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    },
  };
}

/* ------------------------------------------------ Local file (dev only) */

function devFileDestination(): Destination | null {
  if (isProduction || env("SUBMISSIONS_DEV_STORE") !== "file") return null;
  return {
    name: "dev-file",
    durable: true,
    async send(record) {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "submissions.ndjson"), `${JSON.stringify(record)}\n`, "utf8");
    },
  };
}

/* ---------------------------------------------------------------- Public */

export function getDestinations(): Destination[] {
  return [supabaseDestination(), webhookDestination(), emailDestination(), devFileDestination()].filter(
    (d): d is Destination => d !== null,
  );
}

/** True when at least one durable destination is configured. */
export function isSubmissionConfigured(): boolean {
  return getDestinations().some((d) => d.durable);
}

export async function deliver(record: SubmissionRecord): Promise<{
  delivered: string[];
  failed: string[];
}> {
  const destinations = getDestinations();
  const results = await Promise.allSettled(destinations.map((d) => d.send(record)));
  const delivered: string[] = [];
  const failed: string[] = [];
  results.forEach((result, i) => {
    const name = destinations[i].name;
    if (result.status === "fulfilled") delivered.push(name);
    else {
      failed.push(name);
      // Log destination and reason only — never applicant data.
      console.error(`[submissions] ${record.kind} delivery to ${name} failed: ${String(result.reason?.message ?? result.reason)}`);
    }
  });
  return { delivered, failed };
}
