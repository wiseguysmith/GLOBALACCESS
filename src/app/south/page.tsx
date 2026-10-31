import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { initiatives } from "@/config/initiatives";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { RelationToGlobal } from "@/components/sections/RelationToGlobal";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const gsa = initiatives.south;

export const metadata = buildMetadata({
  title: "Global South Access (GSA) — Connecting Markets",
  description:
    "Global South Access builds pathways between international relationships, strategic partners, and opportunities across Global South markets — beginning with Latin America.",
  path: "/south",
});

const focusAreas = [
  { title: "Market access", body: "Helping international partners understand regional markets — and helping regional leaders reach international relationships." },
  { title: "Regional partnerships", body: "Building trusted relationships with local operators, advisors, institutions, and communities." },
  { title: "Project development", body: "Supporting early-stage conversations around well-structured projects with clear local relevance." },
  { title: "Infrastructure", body: "Engaging with the physical and digital infrastructure that underpins long-term economic activity." },
  { title: "Economic development", body: "Prioritizing initiatives aligned with local employment, resilience, and community benefit." },
  { title: "Cross-border collaboration", body: "Bridging business cultures, languages, and expectations so partnerships can work in practice." },
];

const sectors = [
  "Real estate and hospitality",
  "Agriculture and food systems",
  "Energy transition",
  "Logistics and trade",
  "Tourism",
  "Digital infrastructure",
  "Natural capital and conservation",
];

const regions = [
  {
    name: "Latin America",
    status: "Initial emphasis",
    body: "Where GLOBAL’s relationships and regional understanding are strongest today, and where Global South Access begins.",
  },
  {
    name: "Africa",
    status: "Longer-term outlook",
    body: "A future focus, to be approached through partnership and local expertise as relationships develop.",
  },
  {
    name: "Southeast Asia",
    status: "Longer-term outlook",
    body: "A future focus, explored with the same discipline: understanding first, connection second.",
  },
];

const approach = [
  { title: "Listen", body: "Begin with local priorities, constraints, and context — before proposing anything." },
  { title: "Map", body: "Identify the partners, advisors, and frameworks relevant to a market or sector." },
  { title: "Connect", body: "Make considered introductions between international and regional counterparts." },
  { title: "Coordinate", body: "Support collaboration alongside qualified local legal, financial, and technical advisors." },
];

export default function SouthPage() {
  return (
    <>
      <PageHero
        eyebrow="Global South Access · GSA"
        accent={gsa.theme.accent}
        image={gsa.image}
        imagePosition="center 40%"
        title={
          <>
            Connecting Markets.
            <br />
            <span className="serif-accent" style={{ color: gsa.theme.accent }}>
              Unlocking Potential.
            </span>
          </>
        }
        lede={
          <p>
            Building pathways between international relationships, strategic partners, and
            opportunities across Global South markets — beginning with Latin America.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=south" size="lg">
              Explore a partnership
            </ButtonLink>
            <ButtonLink href="#approach" variant="outline-dark" size="lg" icon="none">
              Our approach
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="mission-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow accent={gsa.theme.accentInk}>Mission</Eyebrow>
            <h2 id="mission-heading" className="sr-only">
              Mission
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p
              data-reveal
              className="font-display text-[1.75rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.6rem]"
            >
              To build trusted pathways between international relationships and the people, places,
              and projects of the Global South —{" "}
              <span className="serif-accent" style={{ color: gsa.theme.accentInk }}>
                as partners, not passers-through.
              </span>
            </p>
            <p className="text-lede mt-10 max-w-3xl text-ink-soft">
              Global South Access focuses on market access, regional partnerships, and cross-border
              collaboration. We believe the most durable opportunities are built with local
              knowledge, aligned with local priorities, and developed over time.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="regions-heading"
        className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32 lg:py-40"
      >
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x">
          <SectionHeading
            id="regions-heading"
            tone="dark"
            accent={gsa.theme.accent}
            eyebrow="Geographic outlook"
            title="Starting where relationships already exist."
            intro={
              <p>
                We intend to grow deliberately — region by region, relationship by relationship —
                rather than claim a reach that has not yet been earned.
              </p>
            }
          />
          <ul className="mt-16 grid gap-5 lg:grid-cols-12">
            <li data-reveal className="relative isolate min-h-[26rem] overflow-hidden rounded-sm lg:col-span-6 lg:row-span-2 lg:min-h-[34rem]">
              <Image
                src="/images/rio.webp"
                alt="A coastal Latin American city wrapped around a bay beneath green mountains"
                fill
                quality={70}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <p className="eyebrow" style={{ color: gsa.theme.accent }}>
                  {regions[0].status}
                </p>
                <h3 className="mt-3 font-display text-4xl font-medium tracking-[-0.03em]">{regions[0].name}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/80">{regions[0].body}</p>
              </div>
            </li>
            {regions.slice(1).map((r) => (
              <li
                key={r.name}
                data-reveal
                className="flex flex-col justify-between rounded-sm border border-white/15 p-8 sm:p-10 lg:col-span-6"
              >
                <p className="eyebrow text-white/60">{r.status}</p>
                <div className="mt-10">
                  <h3 className="font-display text-3xl font-medium tracking-[-0.025em]">{r.name}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-mist">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="focus-heading"
            accent={gsa.theme.accentInk}
            eyebrow="Areas of focus"
            title="What Global South Access works on."
          />
          <FocusGrid items={focusAreas} accent={gsa.theme.accentInk} className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="sectors-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SplitFeature
            image={{
              src: "/images/port.webp",
              alt: "An aerial view of stacked shipping containers at a busy port",
            }}
            aspect="aspect-[5/4]"
          >
            <Eyebrow accent={gsa.theme.accentInk}>Strategic sectors</Eyebrow>
            <h2 id="sectors-heading" className="text-headline mt-6 text-ink">
              Sectors of interest.
            </h2>
            <p className="text-lede mt-6 text-ink-soft">
              These are areas where we see meaningful potential for cross-border collaboration. They
              describe our interests, not a portfolio of active projects.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {sectors.map((s) => (
                <li key={s} className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </SplitFeature>
        </div>
      </section>

      <section id="approach" aria-labelledby="approach-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="approach-heading"
            accent={gsa.theme.accentInk}
            eyebrow="Our approach"
            title="Partnership over extraction."
            intro={
              <p>
                Regional relationships succeed when they respect local context. Our process is
                designed to put understanding first.
              </p>
            }
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={approach} accent={gsa.theme.accentInk} label="Global South Access approach" />
          </div>
          <NoticePanel className="mt-20 max-w-4xl" title="Scope of Global South Access">
            Global South Access is a relationship and coordination initiative. It is not an
            investment manager, registered broker, or issuer, and it does not offer or sell
            securities or manage capital. Any regulated activity in any jurisdiction is the
            responsibility of appropriately licensed parties.
          </NoticePanel>
        </div>
      </section>

      <RelationToGlobal current="south">
        <p>
          Global South Access gives the GLOBAL ecosystem its regional depth. It draws on
          relationships formed through Global Invitation, informs the perspectives published in
          Global Forum, and works alongside Global Capital Network and Global Digital Access where
          regional opportunities call for capital relationships or digital infrastructure.
        </p>
      </RelationToGlobal>

      <CtaBand
        eyebrow="Global South Access"
        accent={gsa.theme.accent}
        image={{ src: "/images/mexico-city.webp", alt: "" }}
        title="Build a pathway with us."
        body={
          <p>
            For regional partners, institutions, and international organizations interested in
            collaborating across Latin America and the wider Global South.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=south" size="lg">
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/invitation" variant="outline-dark" size="lg">
              Discover Global Invitation
            </ButtonLink>
          </>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: gsa.name, path: "/south" }])} />
    </>
  );
}
