# Launch checklist — globalaccess.live

## Integrations and credentials

| Item | Status | Action |
| --- | --- | --- |
| Form submission destination | **Not configured** | Set up Supabase (run `supabase/schema.sql`), a webhook (for example n8n), and/or Resend. Add the variables in Netlify and redeploy. Until then, forms show "opening soon" and accept nothing. |
| `NEXT_PUBLIC_SITE_URL` | Defaults to `https://globalaccess.live` | Set explicitly in Netlify. |
| Custom domain and HTTPS | Not verified | Point Namecheap DNS to Netlify (see README) and confirm the certificate is issued. |
| Stricter rate limiting | Optional | The in-memory limiter is best-effort. Add a shared store (for example Upstash Redis) or Netlify rate limiting if spam volume grows. |
| Analytics | None installed | If added, update the Privacy Policy and the CSP in `next.config.ts`. |

## Content requiring approval

- [ ] **The Global Invitation event (San Antonio, February 2027).** All details are carried over
      from the IGCS site and renamed: the Briggs Ranch Golf Club golf day, ~150 planned
      participants, 40 teams/80 players, agenda, themes, salon themes, audience and partner tiers.
      Confirm each is still accurate. Add exact dates (`startDate`/`endDate`) once fixed, which
      enables Event structured data.
- [ ] **Partner tiers.** Confirm the eight tier names. No pricing is published.
- [ ] **Forum articles.** Approve or edit the four founding perspectives in `src/content/forum.ts`.
      They are published under the "GLOBAL Editorial" byline.
- [ ] **Global South Access sectors of interest** (`/south`). Confirm the list.
- [ ] **Regulatory notice and scope statements.** Have counsel review the footer notice and
      the "Scope of…" panels on `/south`, `/digital`, `/capital`, and `/invitation/opportunities`.
- [ ] **Privacy Policy and Terms of Use.** These are drafts. Complete the bracketed items
      (legal entity, effective date, governing law, retention periods, provider list, privacy
      contact) with counsel.
- [ ] **Membership FAQ.** The answer to "What are the terms of membership?" is deliberately
      non-committal. Update it once terms are set.
- [ ] **Image rights.** Confirm rights to the three event images carried over from IGCS.
- [ ] **Social profiles and public email.** Add verified values in `src/config/site.ts`.

## Not built in this release (by design)

Member authentication, payments, investment marketplace features, and private dashboards.
The typed initiative config, event registry, and submission adapters are structured so these
can be added later without restructuring.
