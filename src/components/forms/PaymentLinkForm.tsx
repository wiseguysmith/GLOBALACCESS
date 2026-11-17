"use client";
import { useRef, useState } from "react";
export function PaymentLinkForm() {
  const started = useRef(0); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
  async function pay() {
    if (!started.current) { started.current=Date.now(); setMessage("Please review the linked payment information, then continue in a few seconds."); return; }
    setBusy(true);
    try {
      const params = new URLSearchParams(location.hash.slice(1));
      const response=await fetch("/api/event/pay",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({paymentId:params.get("id"),token:params.get("token"),kind:params.get("kind"),startedAt:started.current,website:""})});
      const data=await response.json();
      if (response.ok && new URL(data.url).hostname==="checkout.stripe.com") location.assign(data.url); else setMessage(data.error || "Payment unavailable.");
    } catch { setMessage("Checkout could not be opened. Please contact the event team."); } finally { setBusy(false); }
  }
  return <div><button className="event-button" disabled={busy} onClick={pay}>{busy?"Opening checkout…":"Continue to secure payment"}</button><p role="status" className="mt-5">{message}</p></div>;
}
