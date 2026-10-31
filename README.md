# GLOBAL — globalaccess.live

**Bridging Worlds. Expanding Access.**

The website for GLOBAL (Global Access), an international ecosystem of five connected initiatives:

| Route | Initiative | Positioning |
| --- | --- | --- |
| `/` | GLOBAL | Bridging Worlds. Expanding Access. |
| `/invitation` | Global Invitation | Access Begins With Connection. |
| `/south` | Global South Access (GSA) | Connecting Markets. Unlocking Potential. |
| `/digital` | Global Digital Access (GDA) | Connecting Physical Value to Digital Infrastructure. |
| `/capital` | Global Capital Network (GCN) | Where Capital Relationships Begin. |
| `/forum` | Global Forum | Ideas That Cross Borders. |

Supporting routes: `/about`, `/ecosystem`, `/invitation/membership`, `/invitation/experiences`,
`/invitation/experiences/[slug]`, `/invitation/opportunities`, `/invitation/apply`, `/forum/[slug]`,
`/contact`, `/privacy`, `/terms`, plus `/sitemap.xml` and `/robots.txt`.

---

## Stack

- **Next.js 16.4** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/styles/globals.css`
- **Lucide** icons · `next/font` (Manrope, Inter, Newsreader italic) · `next/image`
- Two server routes (`/api/applications`, `/api/inquiries`); every page is statically prerendered
- Deployed on **Netlify** (GitHub → Netlify → Namecheap DNS)

Cache Components is intentionally **off**: the site is fully static apart from the form APIs,
which keeps Netlify compatibility simple.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see "Form submissions"
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run check` | Typecheck, lint, and build in one step |
| `npm run og` | Regenerate social images in `public/og` (needs Playwright and a running server) |

Requires Node.js 20.9+ (Netlify is pinned to Node 22 in `netlify.toml`).

## Project structure

```
src/
  app/                 Routes, metadata, sitemap, robots, icons, API route handlers
  components/
    layout/            Site header and footer
    navigation/        Desktop nav, accessible mobile nav (<dialog>), section nav
    sections/          Page sections: heroes, grids, steps, events, CTAs, legal layout
    forms/             Application and inquiry forms, accessible field components
    ui/                Buttons, eyebrow labels, headings, wordmark, reveal observer
  config/
    site.ts            Site URL, navigation, regulatory notice, social links
    initiatives.ts     Single typed source of truth for every initiative
  content/
    events.ts          Event registry (verified vs. sample content)
    forum.ts           Global Forum articles
    invitation.ts      Global Invitation copy blocks
  lib/
    submissions/       Validation, spam checks, rate limiting, delivery adapters
    seo.ts, jsonld.tsx Metadata helpers and structured data
  styles/globals.css   Design tokens, utilities, motion
  types/               Shared TypeScript types
public/
  images/              Optimized WebP photography
  og/                  1200×630 social sharing images
supabase/schema.sql    Storage schema for form submissions
```

### Editing content

- **Initiatives** (names, taglines, descriptions, imagery, accent colors): `src/config/initiatives.ts`
- **Events**: `src/content/events.ts`. Only entries with `verification: "verified"` appear in
  production; `"sample"` entries render in development only and are labelled as samples.
  Add `startDate` (YYYY-MM-DD) once confirmed to enable Event structured data.
- **Forum articles**: `src/content/forum.ts`
- **Social profiles / public email**: `src/config/site.ts` (`social`, `contactEmail`). Both are
  empty until verified, and render nothing while empty.

## Form submissions

`/invitation/apply` and `/contact` post JSON to `/api/applications` and `/api/inquiries`.
Every submission is:

1. Checked for same-origin, JSON content type, and a 20 KB size limit
2. Screened by a honeypot field and a minimum completion time (3 s)
3. Rate limited (8 per 10 minutes per client, best-effort per serverless instance)
4. Normalized and validated server-side with the same rules the browser uses
5. Delivered to **every configured destination**; success is reported only if at least one
   destination confirms receipt

**If no destination is configured, the forms say so plainly and the API returns `503`.
Nothing is silently discarded.**

| Destination | Variables | Notes |
| --- | --- | --- |
| Supabase (recommended) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Run `supabase/schema.sql` first. RLS is on with no public policies. |
| Webhook (n8n, Make, Zapier) | `SUBMISSIONS_WEBHOOK_URL`, `SUBMISSIONS_WEBHOOK_SECRET` | HTTPS only in production; HMAC signature in `X-Global-Signature`. |
| Email via Resend | `RESEND_API_KEY`, `SUBMISSIONS_NOTIFY_TO`, `SUBMISSIONS_NOTIFY_FROM` | Sender domain must be verified in Resend. |
| Local file (dev only) | `SUBMISSIONS_DEV_STORE=file` | Writes `.data/submissions.ndjson`; ignored in production. |

Pages are prerendered, so **redeploy after changing these variables** to update the
"opening soon" state on the forms.

## Deploying to Netlify

1. **Push to GitHub**

   ```bash
   git add . && git commit -m "Update site" && git push
   ```

2. **Create the Netlify site** (first time only): *Add new site → Import an existing project →
   GitHub → GLOBALACCESS*. Netlify detects Next.js and uses its Next.js runtime automatically.
   Build settings come from `netlify.toml` (`npm run build`, publish `.next`, Node 22).
3. **Environment variables**: *Site configuration → Environment variables*. Add
   `NEXT_PUBLIC_SITE_URL=https://globalaccess.live` and at least one submission destination.
   Trigger a new deploy afterwards.
4. **Custom domain**: *Domain management → Add a domain → globalaccess.live*. In Namecheap,
   either switch nameservers to the Netlify DNS nameservers Netlify shows you, or keep Namecheap
   DNS and add:
   - `A` record, host `@` → Netlify's load balancer IP shown in the Netlify domain panel
   - `CNAME` record, host `www` → `<your-site>.netlify.app`

   Netlify provisions HTTPS automatically once DNS resolves. Set `globalaccess.live` as the
   primary domain so `www` redirects to it.
5. **Verify**: open the site, then check `/sitemap.xml`, `/robots.txt`, a page's social preview,
   and submit a test application once a destination is configured.

Deploy previews and branch deploys are automatically marked `noindex` through `robots.txt`.

## Security

- No secrets in client code; all credentials are server-only environment variables
- Security headers in `next.config.ts`: HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, COOP, and a production Content Security Policy
- `/api/*` responses are `no-store`; logs record delivery failures without applicant data
- No IP addresses or user agents are stored with submissions

## Accessibility and performance

- Semantic landmarks, skip link, one `h1` per page, labelled navigation regions
- Native `<dialog>` mobile menu (focus containment, Escape to close, focus return)
- Visible focus states, WCAG AA color contrast, 44 px minimum touch targets
- Forms: explicit labels, `aria-invalid` / `aria-describedby`, focus moves to the first error,
  announced status messages
- Motion is CSS-first and disabled under `prefers-reduced-motion`; content is visible without JavaScript
- Static prerendering, `next/image` (AVIF/WebP, responsive sizes), self-hosted fonts, minimal client JavaScript

## Image credits

Photography is from [Unsplash](https://unsplash.com) under the Unsplash License, except
`event-golf.webp`, `event-dining.webp`, and `event-san-antonio.webp`, which come from the
existing Investor Golf Capital Summit site. See `public/images/CREDITS.md`.

## Content approvals and open items

See `docs/LAUNCH_CHECKLIST.md`.
