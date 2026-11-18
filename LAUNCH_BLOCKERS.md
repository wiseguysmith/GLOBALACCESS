# GLOBAL Invitational — launch blockers

Updated November 17, 2026. **Not ready to accept production money. No deployment or real transaction has occurred.**

## Owner / organizer / counsel

- Confirm merchant legal entity, Stripe onboarding, bank payout verification, receipt descriptor and accountable operator. Owner supplied public contact `info@globalaccess.live`; delivery and monitoring are not yet tested.
- Approve event terms: cancellations, refunds, transfers, failed or incomplete split payments, liability/waivers, privacy/retention and support process. Replace the placeholder event-terms page. No retention of half-team funds or automatic resale policy has been invented.
- Secure all 80 golfers' Summit admissions, fireside chats, private salon capacity and hosted dinner seats; secure food and beverage arrangements both days. Until confirmed, the website labels package inclusions as planned.
- Document $100,000 charity funding, award custody, eligible recipients, selection/allocation, tie/dispute rules and required insurance. Source materials conflict about allocation. The public guarantee and award split are deliberately hidden pending written approval.
- Confirm Summit venue and logistics. Public wording currently says San Antonio, venue to be announced; approve before publication.
- Approve lodging dates, eligibility, pricing/inclusion, assignments and overflow arrangements. 60 beds / 15 casitas does not cover 80 golfers.
- Completed for photography: owner confirmed written commercial-use permission in chat on November 17, 2026. Seven official Briggs Ranch photographs are stored locally as optimized WebP assets with source credits. Four appear in the interactive gallery. No Dormie Network logo was added. Preserve the underlying permission record and comply with its license terms.
- Approve standalone $1,200 Summit price and merchant product treatment before activating live standalone checkout. Working sponsor tiers remain unpublished.
- Approve staging preview, test orders, confirmation wording, inventory recovery, reporting and customer-support runbook before enabling production.

## Technical setup and external verification

- Apply `supabase/event-registration.sql` to a dedicated **staging** Supabase database first. This is a one-time migration; do not run repeatedly or against unreviewed production data.
- Configure environment variables from `.env.event.example` in the appropriate Netlify deployment context. Never paste keys into chat or commit `.env.local`.
- Use Stripe **test** keys and a test webhook first. No Stripe account, keys, webhook registration or Resend destination were supplied or inspected in this session.
- Complete actual Stripe hosted test flows: full $10,000, both linked $5,000 obligations, abandoned checkout, declined card, asynchronous ACH success/failure, replay, out-of-order notifications, partial/full refund and disputes. Local PostgreSQL tests do not replace processor test transactions.
- Verify the current Stripe SDK/API `allowed_payment_method_types` behavior and merchant-enabled card/ACH methods through test checkout. ACH stays off unless explicitly configured.
- Verify real inbox delivery, domain authentication, outbox retries, staff notifications, bounced messages, split-payment links, Summit approval links and admission messages. No real email was sent during implementation.
- Validate scheduled maintenance in Netlify production and a manually invoked staging equivalent. Alert on unsent mail, stale holds, processing payments and manual-review records. Outbox retries stop after ten attempts and need staff recovery.
- Complete organizer-reviewed refund/cancellation processing. Current refund/dispute webhooks suspend admissions and retain the inventory slot for review; they do not automatically refund, release inventory or reinstate admission.
- Holds default to 60 minutes; `EVENT_HOLD_MINUTES` accepts 60–1440 minutes server-side. Stripe requires at least 30 minutes of session lifetime at creation; the linked teammate must open checkout while more than 31 minutes remain. Confirm a suitable hold window with the organizer before sales. No auto-renewal of expired payment links.
- Approve and implement an incomplete-team reminder cadence. Initial and payment-status emails are implemented; timed reminders are not yet implemented.
- Test serverless distributed abuse controls / WAF. Current request throttling is per process, with honeypot, timing, origin, payload and server validation. Add durable/global throttling before high-traffic sales if required by the deployment topology.
- Secure the admin bearer credential in operator tooling; rotate per deployment. Export is a bounded JSON export (40 teams, 1,000 latest leads), not a staffed dashboard. Define pagination/export retention if lead volume exceeds that limit.
- Complete real mobile hosted-checkout, keyboard/screen-reader, Lighthouse and hosted performance testing. Local desktop/mobile visual review was performed; credentials and hosted staging were unavailable.
- Completed locally: Next.js patched from 16.4.3 to 16.4.6 and compatible transitive fixes applied; final dependency audit reports zero vulnerabilities. Repeat dependency audit as part of release CI.

## Approval switches

`src/lib/registration/gates.ts` intentionally contains all-false owner launch approvals. Production keys plus an environment switch are insufficient to open checkout. Each switch needs recorded evidence, a code review and deployment approval.

`src/config/invitational.ts` separately gates public charity, package, lodging, imagery and Summit-price claims. A false value is not evidence of approval. Keep private test deploys noindex.

## Conflicting source material handled

- $10,000 team / two linked $5,000 obligations supersedes the older $8,000 team price.
- February 3 golf and February 4 Summit supersede “dates to be announced.”
- Golfers' VIP inclusions are not extra checkout upgrades. Standalone Summit attendees do not receive them.
- No all-80 on-site lodging promise, personal cash-prize promise, unconfirmed celebrity, invented sponsor, announced future city or public sponsor price was added.
- No tax-deduction or tax-write-off wording was added to the site, checkout or email templates.

## Supplied evidence limits

The pasted consolidated handoff was available. The planning PDFs, DOCX and HTML files named inside it were not supplied as readable attachments in this chat; their contents have not been independently audited. Course facts were checked against the official Dormie Network page on November 17, 2026.
