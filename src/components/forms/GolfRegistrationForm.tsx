"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
export function GolfRegistrationForm({ mode }: { mode: "closed" | "test" | "live" }) {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState("");
  const [paymentMode, setPaymentMode] = useState("full");
  const started = useRef(0); const requestKey = useRef("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return; setBusy(true); setMessage("");
    const data = new FormData(e.currentTarget);
    const fingerprint = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify([paymentMode, data.get("name0"),data.get("email0"),data.get("name1"),data.get("email1")])))),b=>b.toString(16).padStart(2,"0")).join("");
    try { requestKey.current = sessionStorage.getItem(`golf-request-${fingerprint}`) ?? ""; } catch { /* Storage may be disabled; in-memory retry still works. */ }
    if (!requestKey.current) requestKey.current = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2,"0")).join("");
    try { sessionStorage.setItem(`golf-request-${fingerprint}`, requestKey.current); } catch { /* Same-tab retries remain idempotent. */ }
    try {
      const res = await fetch("/api/event/teams", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: paymentMode, golfers: [0,1].map(i => ({ name: data.get(`name${i}`), email: data.get(`email${i}`) })), consent: data.has("consent"), website: data.get("website"), startedAt: started.current, requestKey: requestKey.current, source: location.search.slice(0,300) }) });
      const result = await res.json(); if (!res.ok) setMessage(result.error);
      else if (new URL(result.url).hostname === "checkout.stripe.com") window.location.assign(result.url);
      else setMessage("Checkout could not be opened. Please contact the event team.");
    } catch { setMessage("We could not open checkout. Your team is not confirmed. Retry with the same details to recover your registration."); } finally { setBusy(false); }
  }
  return <form className="event-form" onSubmit={submit} onFocus={() => { if (!started.current) started.current=Date.now(); }} aria-label="Golf team registration">
    <p className="event-notice">{mode === "closed" ? "Registration is not open yet. No payment is being accepted. Package details are shown for planning." : mode === "test" ? "TEST CHECKOUT — use Stripe test payment details only. This does not reserve a place at the event." : "Hosted secure checkout. Your team is confirmed after the full $10,000 clears."}</p>
    {mode === "closed" && <p>Questions? <a className="underline" href="mailto:info@globalaccess.live">info@globalaccess.live</a></p>}
    <fieldset disabled={mode === "closed" || busy} className="space-y-6"><legend className="sr-only">Two-person golf team</legend>
      {[0,1].map(i => <div key={i} className="grid gap-4 sm:grid-cols-2"><label className="event-field">Golfer {i+1} full name<input name={`name${i}`} required minLength={2} maxLength={120} autoComplete="off"/></label><label className="event-field">Golfer {i+1} email<input name={`email${i}`} type="email" required maxLength={254} autoComplete="off"/></label></div>)}
      <fieldset className="space-y-3"><legend className="font-medium mb-3">Choose how your team pays</legend>
        <label className="event-option"><input type="radio" name="mode" value="full" checked={paymentMode === "full"} onChange={() => setPaymentMode("full")}/><span>Pay $10,000 in full<small>One payer · one two-person team</small></span></label>
        <label className="event-option"><input type="radio" name="mode" value="split" checked={paymentMode === "split"} onChange={() => setPaymentMode("split")}/><span>Split into two $5,000 payments<small>Two linked payers · one team · both payments required</small></span></label>
      </fieldset>
      <p className="text-sm text-slate">A split-payment link goes to golfer 2. A first $5,000 payment does not confirm a team or issue Summit passes. ACH, when enabled, requires settlement before confirmation. On-site lodging is not universally included.</p>
      <label className="hidden" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
      <label className="flex items-start gap-3"><input name="consent" type="checkbox" required className="mt-1"/><span>I accept the <Link href="/invitation/event-terms" className="underline">event terms and cancellation policy</Link> and <Link href="/privacy" className="underline">privacy policy</Link>, and have permission to provide both golfers’ contact information.</span></label>
      <button type="submit" className="event-button w-full">{busy ? "Opening secure checkout…" : mode === "closed" ? "Registration opening soon" : `${mode === "test" ? "Test: " : ""}Continue to ${paymentMode === "full" ? "$10,000" : "$5,000"} Checkout`}</button>
    </fieldset><p role="status" aria-live="polite">{message}</p>
  </form>;
}
