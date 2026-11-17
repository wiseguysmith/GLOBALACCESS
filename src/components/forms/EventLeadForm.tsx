"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { leadFields, leadLabels, type LeadCategory } from "@/lib/registration/leads";
export function EventLeadForm({ category, enabled }: { category: LeadCategory; enabled: boolean }) {
  const [message, setMessage] = useState(""); const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);
  const started = useRef(0); const formRef = useRef<HTMLFormElement>(null);
  const fields = [{ name: "name", label: "Full name", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: category === "summit" }, { name: "organization", label: "Organization / business", required: ["summit", "sponsor", "vendor"].includes(category) }, ...leadFields[category]];
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return; setBusy(true); setMessage(""); setErrors({});
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/event/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(data), category, consent: data.has("consent"), sponsorSharing: data.has("sponsorSharing"), startedAt: started.current, source: window.location.search.slice(0, 300) }) });
      const result = await res.json();
      if (!res.ok) { setErrors(result.fieldErrors ?? {}); setMessage(result.error); const first = Object.keys(result.fieldErrors ?? {})[0]; if (first) (formRef.current?.elements.namedItem(first) as HTMLElement)?.focus(); }
      else { setDone(true); setMessage(`Request received. We will follow up after review. Reference: ${result.reference.slice(0, 8).toUpperCase()}.`); }
    } catch { setMessage("We could not confirm submission. Please try again."); } finally { setBusy(false); }
  }
  return <form ref={formRef} className="event-form" onSubmit={submit} onFocus={() => { if (!started.current) started.current = Date.now(); }} aria-label={leadLabels[category]}>
    {!enabled && <p className="event-notice">Online inquiries are opening soon. Please email <a className="underline" href="mailto:info@globalaccess.live">info@globalaccess.live</a> about your request. Submissions through this form are currently disabled.</p>}
    {category === "summit" && <p>For Summit-only attendance on February 4. Golf teams receive their two Summit admissions automatically after full payment. No second application is required.</p>}
    {category === "vendor" && <p>Applications are reviewed individually. Submitting does not provide a booth or Summit admission.</p>}
    <fieldset disabled={!enabled || busy || done} className="grid gap-5 sm:grid-cols-2">
      <legend className="sr-only">{leadLabels[category]}</legend>
      {fields.map(field => <label key={field.name} className="event-field">{field.label}{field.required ? " *" : ""}
        {field.options ? <select name={field.name} required={field.required} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${category}-${field.name}-error` : undefined}><option value="">Select an option</option>{field.options.map(option => <option key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type ?? "text"} required={field.required} maxLength={300} autoComplete={field.name === "email" ? "email" : field.name === "name" ? "name" : field.name === "phone" ? "tel" : undefined} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${category}-${field.name}-error` : undefined}/>}
        {errors[field.name] && <span id={`${category}-${field.name}-error`} className="text-sm text-red-800">{errors[field.name]}</span>}
      </label>)}
      <label className="event-field sm:col-span-2">{category === "future" ? "Anything else? (optional)" : "Message"}<textarea name="message" rows={4} maxLength={3000} required={["general", "sponsor", "vendor"].includes(category)} aria-invalid={!!errors.message}/>{errors.message && <span className="text-sm text-red-800">{errors.message}</span>}</label>
      <label className="hidden" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
      {category === "summit" && <label className="sm:col-span-2 flex items-start gap-3"><input type="checkbox" name="sponsorSharing" className="mt-1"/>I optionally consent to profile sharing with event sponsors for meeting matching. This is separate from my invitation request.</label>}
      <label className="sm:col-span-2 flex items-start gap-3"><input type="checkbox" name="consent" required className="mt-1"/> <span>I agree to the <Link href="/privacy" className="underline">privacy policy</Link> and to being contacted about this request{category === "future" ? " and future GLOBAL Invitational editions" : ""}.</span></label>
      <button className="event-button sm:col-span-2" type="submit">{busy ? "Submitting…" : leadLabels[category]}</button>
    </fieldset>
    <p role="status" aria-live="polite">{message}</p>
  </form>;
}
