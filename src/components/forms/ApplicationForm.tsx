"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Loader2 } from "lucide-react";
import {
  hasErrors,
  interestOptions,
  limits,
  validateApplication,
  type ApplicationInput,
  type FieldErrors,
} from "@/lib/submissions/validation";
import { ConsentField, Honeypot, SelectField, TextAreaField, TextField } from "./Field";
import { useSubmission } from "./useSubmission";

const initial: ApplicationInput = {
  fullName: "",
  email: "",
  organization: "",
  title: "",
  country: "",
  interest: "",
  background: "",
  reason: "",
  consent: false,
  event: "",
};

const fieldOrder: (keyof ApplicationInput)[] = [
  "fullName",
  "email",
  "organization",
  "title",
  "country",
  "interest",
  "background",
  "reason",
  "consent",
];

export function ApplicationForm({ enabled }: { enabled: boolean }) {
  const [values, setValues] = useState<ApplicationInput>(initial);
  const [errors, setErrors] = useState<FieldErrors<ApplicationInput>>({});
  const [honeypot, setHoneypot] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const { status, formError, serverFieldErrors, reference, submit } = useSubmission("/api/applications");

  // Prefill from links such as /invitation/apply?interest=Events%20and%20Experiences&event=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    const event = params.get("event");
    const matched = interestOptions.find((o) => o === interest);
    if (matched || event) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time prefill from the URL after mount
      setValues((v) => ({
        ...v,
        interest: matched ?? (event ? "Events and Experiences" : v.interest),
        event: event?.slice(0, 120) ?? "",
      }));
    }
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") summaryRef.current?.focus();
  }, [status]);

  const allErrors: FieldErrors<ApplicationInput> = { ...errors, ...serverFieldErrors };

  function update<K extends keyof ApplicationInput>(key: K, value: ApplicationInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "submitting") return;
    const trimmed: ApplicationInput = {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      organization: values.organization.trim(),
      title: values.title.trim(),
      country: values.country.trim(),
      background: values.background.trim(),
      reason: values.reason.trim(),
    };
    const found = validateApplication(trimmed);
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
          Thank you. Your request has been received.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          Every request is reviewed personally. If there is alignment, someone from the GLOBAL
          team will be in touch to arrange an introductory conversation. We are not able to
          respond to every request individually.
        </p>
        {reference ? (
          <p className="mt-6 text-sm text-slate">
            Reference: <span className="font-medium tabular-nums text-ink">{reference}</span>
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-6">
          <Link href="/invitation/experiences" className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            Explore experiences <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            Return to GLOBAL <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-describedby={!enabled ? "submissions-closed" : undefined}
      className="relative rounded-sm border border-navy/10 bg-white p-6 sm:p-10"
    >
      {!enabled ? (
        <div
          id="submissions-closed"
          className="mb-8 flex gap-3 rounded-sm border border-gold/50 bg-[#FBF7EE] p-5 text-[0.92rem] leading-relaxed text-ink-soft"
        >
          <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
          <p>
            <span className="font-semibold text-ink">Online requests open soon. </span>
            This form is not yet connected to our review system, so it cannot accept submissions.
            Nothing you enter here will be sent or stored.
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
        {errorCount > 0 && status !== "error" ? (
          <p className="sr-only">
            {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`}
          </p>
        ) : null}
      </div>

      <Honeypot value={honeypot} onChange={setHoneypot} />

      <fieldset disabled={!enabled || submitting} className="min-w-0">
        <legend className="eyebrow mb-6 text-gold-ink">About you</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            id="fullName"
            label="Full name"
            required
            autoComplete="name"
            maxLength={limits.name.max}
            value={values.fullName}
            onChange={(v) => update("fullName", v)}
            error={allErrors.fullName}
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
            required
            autoComplete="organization"
            maxLength={limits.organization.max}
            hint="If you operate independently, enter “Independent”."
            value={values.organization}
            onChange={(v) => update("organization", v)}
            error={allErrors.organization}
          />
          <TextField
            id="title"
            label="Professional title"
            required
            autoComplete="organization-title"
            maxLength={limits.title.max}
            value={values.title}
            onChange={(v) => update("title", v)}
            error={allErrors.title}
          />
          <TextField
            id="country"
            label="Country / region"
            required
            autoComplete="country-name"
            maxLength={limits.country.max}
            value={values.country}
            onChange={(v) => update("country", v)}
            error={allErrors.country}
          />
          <SelectField
            id="interest"
            label="Primary area of interest"
            required
            options={interestOptions.map((o) => ({ value: o, label: o }))}
            value={values.interest}
            onChange={(v) => update("interest", v)}
            error={allErrors.interest}
          />
        </div>
      </fieldset>

      <fieldset disabled={!enabled || submitting} className="mt-12 min-w-0 border-t border-navy/10 pt-10">
        <legend className="eyebrow float-left mb-6 w-full text-gold-ink">Your perspective</legend>
        <div className="clear-left grid gap-6">
          <TextAreaField
            id="background"
            label="Professional background"
            required
            minLength={limits.longText.min}
            maxLength={limits.longText.max}
            hint="A brief overview of your work, sector, and areas of experience."
            value={values.background}
            onChange={(v) => update("background", v)}
            error={allErrors.background}
          />
          <TextAreaField
            id="reason"
            label="Reason for requesting an invitation"
            required
            minLength={limits.longText.min}
            maxLength={limits.longText.max}
            hint="What you hope to contribute to, and gain from, the Global Invitation community."
            value={values.reason}
            onChange={(v) => update("reason", v)}
            error={allErrors.reason}
          />
          {values.event ? (
            <p className="rounded-sm bg-paper px-4 py-3 text-sm text-ink-soft">
              Request associated with: <span className="font-medium text-ink">{values.event}</span>
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className="mt-10 border-t border-navy/10 pt-8">
        <ConsentField
          id="consent"
          checked={values.consent}
          onChange={(v) => update("consent", v)}
          error={allErrors.consent}
          disabled={!enabled || submitting}
        >
          I consent to GLOBAL processing the information above to review my request, as described
          in the{" "}
          <Link href="/privacy" className="font-medium text-ink underline decoration-gold underline-offset-3">
            Privacy Policy
          </Link>
          . I understand that submitting a request does not guarantee an invitation.
        </ConsentField>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate">
            <span className="text-gold-ink">*</span> Required fields
          </p>
          <button
            type="submit"
            disabled={!enabled || submitting}
            aria-disabled={!enabled || submitting}
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-navy px-8 font-medium text-white transition-colors hover:bg-midnight disabled:cursor-not-allowed disabled:bg-navy/50"
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />
                <span>Submitting request…</span>
              </>
            ) : enabled ? (
              <>
                <span>Request an Invitation</span>
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </>
            ) : (
              <span>Requests opening soon</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
