# Launch checklist — globalaccess.live

## Integrations and credentials

| Item | Status | Action |
| --- | --- | --- |
| Form submission destination | **Resend chosen, not yet configured** | Follow `docs/RESEND_SETUP.md` (Resend account, domain DNS records, three Netlify variables, redeploy). Until then, forms show "opening soon" and accept nothing. |
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
- [ ] **The Global Invitational (golf tournament).** Published as a two-person scramble, 40 teams /
      80 players, golfers only, by invitation. Still to confirm and add in `src/content/events.ts`
      (`golf`): exact date and tee time, start format (e.g. shotgun), charitable beneficiary, and
      award categories.
- [ ] **Partner tiers.** Confirm the eight tier names. No pricing is published.
- [x] **Forum articles.** The four founding perspectives were approved as published (Nov 2026).
- [ ] **Global South Access sectors of interest** (`/south`). Confirm the list.
- [ ] **Regulatory notice and scope statements.** Have counsel review the footer notice and
      the "Scope of…" panels on `/south`, `/digital`, `/capital`, and `/invitation/opportunities`.
- [ ] **Privacy Policy and Terms of Use.** These are drafts. Complete the bracketed items
      (legal entity, effective date, governing law, retention periods, provider list, privacy
      contact) with counsel.
- [x] **Membership removed.** No membership program; participation FAQ lives on `/invitation/participation`. Superseded item:
- [ ] ~~**Membership FAQ.**~~ The answer to "What are the terms of membership?" is deliberately
      non-committal. Update it once terms are set.
- [ ] **Image rights.** Confirm rights to the three event images carried over from IGCS.
- [ ] **Social profiles and public email.** Add verified values in `src/config/site.ts`.

- [ ] **Event dates.** Shown as "February 3–4, 2027 · Subject to confirmation". Once confirmed,
      update `dateLabel` and add `startDate`/`endDate` in `src/content/events.ts` (enables Event
      structured data).
- [ ] **Legal review of updated wording.** Footer notice and Terms §3 now say "participation"
      instead of "membership". Counsel to confirm.
- [ ] **Human Element photography.** Uses illustrative Unsplash imagery, captioned as such.
      Replace with approved original photography when available.

## Not built in this release (by design)

Member authentication, payments, investment marketplace features, and private dashboards.
The typed initiative config, event registry, and submission adapters are structured so these
can be added later without restructuring.
