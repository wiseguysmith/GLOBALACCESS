import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { isSubmissionConfigured } from "@/lib/submissions/destinations";
import { CompactHero } from "@/components/sections/CompactHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Contact — Connect With GLOBAL",
  description:
    "Connect with GLOBAL about membership, partnerships, or any of our initiatives: Global Invitation, Global South Access, Global Digital Access, Global Capital Network, and Global Forum.",
  path: "/contact",
});

const pathways = [
  { label: "Request an invitation", body: "Membership in Global Invitation", href: "/invitation/apply" },
  { label: "Partnership or sponsorship", body: "Including The Global Invitation, San Antonio", href: "/contact?topic=partnership" },
  { label: "Global South Access", body: "Regional partnerships and market access", href: "/contact?topic=south" },
  { label: "Global Digital Access", body: "Technology and infrastructure partnerships", href: "/contact?topic=digital" },
  { label: "Global Capital Network", body: "Institutional and capital relationships", href: "/contact?topic=capital" },
  { label: "Global Forum", body: "Contributions and interviews", href: "/contact?topic=forum" },
];

export default function ContactPage() {
  const enabled = isSubmissionConfigured();
  return (
    <>
      <CompactHero
        eyebrow="Contact"
        breadcrumbs={[{ label: "GLOBAL", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Connect With <span className="serif-accent text-gold">GLOBAL.</span>
          </>
        }
        lede={
          <p>
            Tell us who you are and what you would like to explore. We read every message and
            respond where there is a clear fit.
          </p>
        }
      />
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <h2 className="eyebrow text-gold-ink">Choose a pathway</h2>
            <ul className="mt-5 border-t border-navy/12">
              {pathways.map((p) => (
                <li key={p.label} className="border-b border-navy/12">
                  <a href={p.href} className="group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block font-medium text-ink">{p.label}</span>
                      <span className="block text-sm text-slate">{p.body}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-1 group-hover:text-ink"
                      strokeWidth={1.75}
                    />
                  </a>
                </li>
              ))}
            </ul>
            {siteConfig.contactEmail ? (
              <p className="mt-8 text-sm text-ink-soft">
                Or email{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline decoration-gold underline-offset-3">
                  {siteConfig.contactEmail}
                </a>
              </p>
            ) : null}
            <p className="mt-8 text-sm leading-relaxed text-slate">
              Please don&apos;t share confidential financial or personal documents through this form.
              See our{" "}
              <Link href="/privacy" className="text-ink underline decoration-gold underline-offset-3">
                Privacy Policy
              </Link>
              .
            </p>
          </aside>
          <div className="lg:col-span-8">
            <InquiryForm enabled={enabled} />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
