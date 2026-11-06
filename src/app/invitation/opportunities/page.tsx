import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { initiativeList } from "@/config/initiatives";
import { opportunityTypes } from "@/content/invitation";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Opportunities — Global Invitation",
  description:
    "Strategic partnerships, business development, collaboration, and considered introductions across the GLOBAL ecosystem. Global Invitation is not an investment marketplace.",
  path: "/invitation/opportunities",
});

const introductionSteps = [
  {
    title: "Understand",
    body: "We start by learning what each participant is working on, what they need, and what they can offer.",
  },
  {
    title: "Identify",
    body: "Where we see clear relevance between people or initiatives, we consider whether an introduction would be valuable to both.",
  },
  {
    title: "Consent",
    body: "Introductions are made only with the agreement of both parties — never by circulating personal details.",
  },
  {
    title: "Connect",
    body: "We make the introduction with context, then step back so the relationship can develop on its own terms.",
  },
];

export default function OpportunitiesPage() {
  const others = initiativeList.filter((i) => i.id !== "invitation");
  return (
    <>
      <PageHero
        eyebrow="Global Invitation · Opportunities"
        breadcrumbs={[
          { label: "GLOBAL", href: "/" },
          { label: "Global Invitation", href: "/invitation" },
          { label: "Opportunities" },
        ]}
        image={{
          src: "/images/boardroom.webp",
          alt: "A bright, modern meeting room with a long table and floor-to-ceiling windows",
        }}
        title={
          <>
            Where connection becomes{" "}
            <span className="serif-accent text-gold">collaboration.</span>
          </>
        }
        lede={
          <p>
            Global Invitation can open the door to relevant introductions, partnerships, and initiatives
            across the GLOBAL ecosystem — always through considered, mutually agreed connections.
          </p>
        }
        actions={
          <ButtonLink href="/invitation/apply?interest=Strategic%20Partnerships" size="lg">
            Request an Invitation
          </ButtonLink>
        }
      />
      <SectionNav items={invitationNav} label="Global Invitation" />

      <section aria-labelledby="types-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="types-heading"
            eyebrow="What opportunities can include"
            title="Relationships with purpose."
            intro={
              <p>
                Opportunities emerge from the community itself — from the people participants meet, the
                conversations they join, and the initiatives they choose to engage with.
              </p>
            }
          />
          <FocusGrid items={opportunityTypes} className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="intro-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="intro-heading"
            eyebrow="How introductions work"
            title="Considered, consented, and in context."
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={introductionSteps} label="How introductions work" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="across-heading"
        className="surface-dark bg-navy py-24 text-white sm:py-32"
      >
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">Across the ecosystem</Eyebrow>
            <h2 id="across-heading" className="text-headline mt-6">
              One relationship. <span className="serif-accent text-gold">A wider ecosystem.</span>
            </h2>
            <p className="text-lede mt-7 text-mist">
              Global Invitation connects participants to the other GLOBAL initiatives, where their
              interests and expertise are relevant.
            </p>
          </div>
          <ul className="border-t border-white/15 lg:col-span-6 lg:col-start-7">
            {others.map((i) => (
              <li key={i.id} className="border-b border-white/15">
                <Link href={i.href} className="group flex items-start justify-between gap-6 py-6">
                  <span>
                    <span className="block font-display text-xl font-medium">{i.name}</span>
                    <span className="mt-1 block text-[0.95rem] text-mist">{i.tagline}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1.5 size-5 shrink-0 text-white/40 transition-[color,transform] group-hover:translate-x-1 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-x">
          <NoticePanel title="What Global Invitation is not" className="max-w-4xl">
            Global Invitation is not a securities marketplace, broker, or investment platform. It does
            not offer, sell, recommend, or arrange investments or financial products. Participation
            does not guarantee access to any investment or transaction. Any regulated activity is
            the sole responsibility of appropriately licensed parties.
          </NoticePanel>
        </div>
      </section>

      <CtaBand
        eyebrow="Global Invitation"
        image={{ src: "/images/terrace.webp", alt: "" }}
        title="Begin with the right introduction."
        body={<p>Request an invitation and tell us what you are building, exploring, or seeking.</p>}
        actions={
          <>
            <ButtonLink href="/invitation/apply" size="lg">
              Request an Invitation
            </ButtonLink>
            <ButtonLink href="/contact?topic=partnership" variant="outline-dark" size="lg">
              Explore a partnership
            </ButtonLink>
          </>
        }
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "GLOBAL", path: "/" },
          { name: "Global Invitation", path: "/invitation" },
          { name: "Opportunities", path: "/invitation/opportunities" },
        ])}
      />
    </>
  );
}
