"use client";

import { useEffect, useRef, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ServerResponse {
  ok: boolean;
  code?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
}

/**
 * Posts JSON to a submission endpoint and normalises every outcome.
 * Success is only reported when the server confirms delivery.
 */
export function useSubmission(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(payload: Record<string, unknown>, honeypot: string) {
    setStatus("submitting");
    setFormError(null);
    setServerFieldErrors({});
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: honeypot, startedAt: startedAt.current }),
      });
      let data: ServerResponse | null = null;
      try {
        data = (await res.json()) as ServerResponse;
      } catch {
        data = null;
      }
      if (res.ok && data?.ok) {
        setReference(data.reference ?? null);
        setStatus("success");
        return true;
      }
      setServerFieldErrors(data?.fieldErrors ?? {});
      setFormError(
        data?.message ??
          "Something went wrong and your submission was not received. Please try again.",
      );
      setStatus("error");
      return false;
    } catch {
      setFormError(
        "We couldn't reach the server, so nothing was submitted. Please check your connection and try again.",
      );
      setStatus("error");
      return false;
    }
  }

  return { status, formError, setFormError, serverFieldErrors, reference, submit, setStatus };
}
