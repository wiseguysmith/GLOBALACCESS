import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { isSubmissionConfigured } from "@/lib/submissions/destinations";
import { CompactHero } from "@/components/sections/CompactHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Request an Invitation — Global Invitation",
  description:
    "Request an invitation to Global Invitation, a curated international community of entrepreneurs, investors, institutional representatives, and strategic partners.",
  path: "/invitation/apply",
});

const lookFor = [
  "Professional experience and integrity",
  "A genuine international or cross-border outlook",
  "Something to contribute as well as to gain",
  "Alignment with the community’s principles of discretion and reciprocity",
];

const next = [
  "We read your request personally.",
  "If there may be a fit, we arrange an introductory conversation.",
  "Invitations to selected gatherings are extended individually.",
];

export default function ApplyPage() {
  const enabled = isSubmissionConfigured();

  return (
    <>
      <CompactHero
        eyebrow="Global Invitation"
        breadcrumbs={[
          { label: "GLOBAL", href: "/" },
          { label: "Global Invitation", href: "/invitation" },
          { label: "Request an Invitation" },
        ]}
        title={
          <>
            Request an <span className="serif-accent text-gold">Invitation.</span>
          </>
        }
        lede={
          <p>
            Tell us about yourself and what draws you to Global Invitation. Every request is reviewed
            personally, and the form takes around five minutes.
          </p>
        }
      />
      <SectionNav items={invitationNav} label="Global Invitation" />

      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="space-y-12 lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
              <div>
                <h2 className="eyebrow text-gold-ink">What we look for</h2>
                <ul className="mt-5 space-y-3">
                  {lookFor.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow text-gold-ink">What happens next</h2>
                <ol className="mt-5 space-y-4">
                  {next.map((item, i) => (
                    <li key={item} className="grid grid-cols-[2rem_1fr] leading-relaxed text-ink-soft">
                      <span className="font-display text-sm text-gold-ink tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex gap-3 border-t border-navy/12 pt-8 text-[0.9rem] leading-relaxed text-slate">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
                <p>
                  Your information is used only to review your request and is never published or
                  shared with other participants without your consent. See our{" "}
                  <Link href="/privacy" className="text-ink underline decoration-gold underline-offset-3">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <ApplicationForm enabled={enabled} />
            <p className="mt-6 text-xs leading-relaxed text-slate">
              Submitting a request does not guarantee an invitation. Participation does not imply or
              guarantee access to investments, financial products, or transactions.
            </p>
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "GLOBAL", path: "/" },
          { name: "Global Invitation", path: "/invitation" },
          { name: "Request an Invitation", path: "/invitation/apply" },
        ])}
      />
    </>
  );
}
