"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useRef, useState, type FormEvent } from "react";
import { leadFields, leadLabels, summitTopics, type LeadCategory } from "@/lib/registration/leads";
export function EventLeadForm({ category, enabled }: { category: LeadCategory; enabled: boolean }) {
  const [message, setMessage] = useState(""); const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);
  const started = useRef(0); const formRef = useRef<HTMLFormElement>(null);
  const fields = [{ name: "name", label: category === "golf" ? "Team captain / first golfer full name" : "Full name", required: true }, { name: "email", label: category === "golf" ? "Team captain email" : "Email", type: "email", required: true }, { name: "phone", label: "Phone", type: "tel", required: category === "summit" }, { name: "organization", label: "Organization / business", required: ["summit", "sponsor", "vendor"].includes(category) }, ...leadFields[category]];
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return; setBusy(true); setMessage(""); setErrors({});
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/event/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(data), topics: data.getAll("topics"), category, consent: data.has("consent"), teammateConsent: data.has("teammateConsent"), sponsorSharing: data.has("sponsorSharing"), startedAt: started.current, source: window.location.search.slice(0, 300) }) });
      const result = await res.json();
      if (!res.ok) { setErrors(result.fieldErrors ?? {}); setMessage(result.error); const first = Object.keys(result.fieldErrors ?? {})[0]; if (first) { const field = formRef.current?.elements.namedItem(first); (field instanceof RadioNodeList ? field.item(0) as HTMLElement : field as HTMLElement | null)?.focus(); } }
      else { setDone(true); setMessage(`${category === "golf" ? "Team application received. Participation is subject to review and approval; no place is reserved and no payment is due at this stage." : "Request received. We will follow up after review."} Reference: ${result.reference.slice(0, 8).toUpperCase()}.`); }
    } catch { setMessage("We could not confirm submission. Please try again."); } finally { setBusy(false); }
  }
  return <form ref={formRef} className="event-form" onSubmit={submit} onFocus={() => { if (!started.current) started.current = Date.now(); }} aria-label={leadLabels[category]}>
    {!enabled && (
      <div className="event-notice">
        <p>{category === "golf"
          ? "Online team applications are closed. Email both golfers’ names and your contact details. No payment is requested."
          : category === "summit" ? "Online requests are closed. Email your role, organization, title, and LinkedIn profile. Include your topics of interest or referral code if you have one."
          : "Online inquiries are closed. Email us about your request."}</p>
        <a className="underline" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`San Antonio 2027 — ${leadLabels[category]}`)}`}>
          {category === "summit" ? "Email for a Summit invitation" : "Email GLOBAL"}
        </a>
        <p>{siteConfig.contactEmail}</p>
      </div>
    )}
    {category === "golf" && <div className="space-y-3"><p><strong>A curated field. A competitive spirit.</strong> $10,000 per two-person team, subject to approval. Apply → Review → Acceptance → Payment → Confirmation.</p><p>Applications do not reserve a team place. Accepted teams will be invited to pay when registration opens. Tournament format, handicap requirements, and official competition rules will follow once finalized.</p></div>}
    {category === "summit" && (
      <div className="space-y-4">
        <p className="eyebrow text-gold-ink">Future in Finance Summit · San Antonio · February 4, 2027</p>
        <p>The Summit brings together accredited investors, family offices, financial advisors, private equity leaders, and policymakers. Standalone attendance is by approved invitation.</p>
        <p>{enabled ? "Complete the short profile below. " : ""}We aim to review requests within 48 hours. If approved, you’ll receive a personal registration link. Requests with an invitation or referral code receive priority review.</p>
        <p>Golf teams receive two Summit admissions after full payment. Confirmed sponsors and speakers coordinate admission directly with the event team. Sponsors, speakers, and golf teams can contact the team about referral codes for their guests.</p>
        <p>Vendors and service providers seeking access to attendees should use the <Link href="/invitation/inquire/sponsor" className="underline">sponsorship inquiry</Link> instead of requesting general admission.</p>
      </div>
    )}
    {category === "summit" && <p>Planned standalone admission: $1,200 per person, including planned marketplace access. Final registration terms will be confirmed before payment opens. Golf, lodging, and golfers’ VIP experiences are excluded.</p>}
    {category === "sponsor" && <p>Current sponsorship discussions are for San Antonio 2027 only. Track, workshop, golf, hospitality, and marketplace opportunities are subject to review. Pricing, placements, speaking roles, and any category exclusivity are confirmed separately in a written agreement.</p>}
    {category === "vendor" && <p>The planned Summit marketplace operates during lunch, workshops, and networking, with pauses during keynotes and panels. Booth pricing, floor plan, and exhibiting terms are being finalized.</p>}
    {category === "vendor" && <p>Applications are reviewed individually. Submitting does not provide a booth or Summit admission.</p>}
    <fieldset disabled={!enabled || busy || done} className="grid gap-5 sm:grid-cols-2">
      <legend className="sr-only">{leadLabels[category]}</legend>
      {fields.map(field => <label key={field.name} className="event-field">{field.label}{field.required ? " *" : ""}
        {field.options ? <select name={field.name} required={field.required} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${category}-${field.name}-error` : undefined}><option value="">Select an option</option>{field.options.map(option => <option key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type ?? "text"} required={field.required} maxLength={300} autoComplete={field.name === "email" ? "email" : field.name === "name" ? "name" : field.name === "phone" ? "tel" : undefined} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${category}-${field.name}-error` : undefined}/>}
        {errors[field.name] && <span id={`${category}-${field.name}-error`} className="text-sm text-red-800">{errors[field.name]}</span>}
      </label>)}
      <label className="event-field sm:col-span-2">{category === "future" ? "Anything else? (optional)" : "Message"}<textarea name="message" rows={4} maxLength={3000} required={["general", "sponsor", "vendor"].includes(category)} aria-invalid={!!errors.message}/>{errors.message && <span className="text-sm text-red-800">{errors.message}</span>}</label>
      <label className="hidden" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
      {category === "golf" && <label className="sm:col-span-2 flex items-start gap-3"><input type="checkbox" name="teammateConsent" required className="mt-1"/><span>I have permission to provide the second golfer’s details for team-application review.</span></label>}
      {errors.teammateConsent && <p className="sm:col-span-2 text-sm text-red-800">{errors.teammateConsent}</p>}
      {category === "summit" && (
        <>
          <fieldset className="sm:col-span-2">
            <legend className="mb-3 font-medium">Topics of interest (choose any)</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {summitTopics.map((topic) => (
                <label key={topic} className="flex items-start gap-3">
                  <input type="checkbox" name="topics" value={topic} className="mt-1" />
                  {topic}
                </label>
              ))}
            </div>
            {errors.topics && <p className="mt-2 text-sm text-red-800">{errors.topics}</p>}
          </fieldset>
          <label className="sm:col-span-2 flex items-start gap-3"><input type="checkbox" name="sponsorSharing" className="mt-1"/>I agree to share my profile with event sponsors and to be matched for one-to-one meetings (optional).</label>
        </>
      )}
      <label className="sm:col-span-2 flex items-start gap-3"><input type="checkbox" name="consent" required className="mt-1"/> <span>I agree to the <Link href="/privacy" className="underline">privacy policy</Link> and to being contacted about this request{category === "future" ? " and future GLOBAL Invitational editions" : ""}.</span></label>
      <button className="event-button sm:col-span-2" type="submit">{busy ? "Submitting…" : leadLabels[category]}</button>
    </fieldset>
    <p role="status" aria-live="polite">{message}</p>
  </form>;
}
