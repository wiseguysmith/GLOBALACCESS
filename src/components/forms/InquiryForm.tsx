"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Loader2 } from "lucide-react";
import {
  hasErrors,
  inquiryTopics,
  limits,
  validateInquiry,
  type FieldErrors,
  type InquiryInput,
} from "@/lib/submissions/validation";
import { ConsentField, Honeypot, SelectField, TextAreaField, TextField } from "./Field";
import { useSubmission } from "./useSubmission";

const initial: InquiryInput = {
  name: "",
  email: "",
  organization: "",
  topic: "",
  message: "",
  consent: false,
};

const fieldOrder: (keyof InquiryInput)[] = ["name", "email", "organization", "topic", "message", "consent"];

export function InquiryForm({ enabled }: { enabled: boolean }) {
  const [values, setValues] = useState<InquiryInput>(initial);
  const [errors, setErrors] = useState<FieldErrors<InquiryInput>>({});
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const { status, formError, serverFieldErrors, reference, submit } = useSubmission("/api/inquiries");

  // Prefill topic from links such as /contact?topic=partnership
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && inquiryTopics.some((t) => t.value === topic)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time prefill from the URL after mount
      setValues((v) => ({ ...v, topic }));
    }
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") summaryRef.current?.focus();
  }, [status]);

  const allErrors: FieldErrors<InquiryInput> = { ...errors, ...serverFieldErrors };

  function update<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "submitting") return;
    const trimmed: InquiryInput = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      organization: values.organization.trim(),
      message: values.message.trim(),
    };
    const found = validateInquiry(trimmed);
    setErrors(found);
    if (hasErrors(found as Record<string, string | undefined>)) {
      const first = fieldOrder.find((k) => found[k]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    await submit({ ...trimmed }, honeypot);
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-navy/10 bg-white p-8 sm:p-12" role="status">
        <CheckCircle2 aria-hidden="true" className="size-9 text-gold-ink" strokeWidth={1.25} />
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-title text-ink outline-none">
          Thank you. Your message has been received.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          We read every message. Where there is a clear fit, a member of the team will follow up
          by email.
        </p>
        {reference ? (
          <p className="mt-6 text-sm text-slate">
            Reference: <span className="font-medium tabular-nums text-ink">{reference}</span>
          </p>
        ) : null}
        <Link href="/ecosystem" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Explore the ecosystem <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative rounded-sm border border-navy/10 bg-white p-6 sm:p-10"
    >
      {!enabled ? (
        <div className="mb-8 flex gap-3 rounded-sm border border-gold/50 bg-[#FBF7EE] p-5 text-[0.92rem] leading-relaxed text-ink-soft">
          <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
          <p>
            <span className="font-semibold text-ink">Online inquiries open soon. </span>
            This form is not yet connected, so it cannot accept messages. Nothing you enter here
            will be sent or stored.
          </p>
        </div>
      ) : null}

      <div aria-live="assertive">
        {status === "error" && formError ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            className="mb-8 flex gap-3 rounded-sm border border-[#9B2C2C]/40 bg-[#FBF1F1] p-5 text-[0.92rem] text-[#7A1F1F] outline-none"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
            <p>{formError}</p>
          </div>
        ) : null}
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <fieldset disabled={!enabled || submitting} className="grid min-w-0 gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your details and message</legend>
        <TextField
          id="name"
          label="Name"
          required
          autoComplete="name"
          maxLength={limits.name.max}
          value={values.name}
          onChange={(v) => update("name", v)}
          error={allErrors.name}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          maxLength={limits.email.max}
          value={values.email}
          onChange={(v) => update("email", v)}
          error={allErrors.email}
        />
        <TextField
          id="organization"
          label="Organization"
          autoComplete="organization"
          maxLength={limits.organization.max}
          value={values.organization}
          onChange={(v) => update("organization", v)}
          error={allErrors.organization}
        />
        <SelectField
          id="topic"
          label="Topic"
          required
          options={inquiryTopics.map((t) => ({ value: t.value, label: t.label }))}
          value={values.topic}
          onChange={(v) => update("topic", v)}
          error={allErrors.topic}
        />
        <TextAreaField
          id="message"
          label="Message"
          required
          className="sm:col-span-2"
          minLength={limits.message.min}
          maxLength={limits.message.max}
          hint="Share some context about who you are and what you would like to explore."
          value={values.message}
          onChange={(v) => update("message", v)}
          error={allErrors.message}
        />
      </fieldset>

      <div className="mt-8 border-t border-navy/10 pt-8">
        <ConsentField
          id="consent"
          checked={values.consent}
          onChange={(v) => update("consent", v)}
          error={allErrors.consent}
          disabled={!enabled || submitting}
        >
          I consent to GLOBAL processing this information to respond to my inquiry, as described in
          the{" "}
          <Link href="/privacy" className="font-medium text-ink underline decoration-gold underline-offset-3">
            Privacy Policy
          </Link>
          .
        </ConsentField>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={!enabled || submitting}
            className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-navy px-8 font-medium text-white transition-colors hover:bg-midnight disabled:cursor-not-allowed disabled:bg-navy/50 sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />
                <span>Sending…</span>
              </>
            ) : enabled ? (
              <>
                <span>Send message</span>
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </>
            ) : (
              <span>Inquiries opening soon</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
