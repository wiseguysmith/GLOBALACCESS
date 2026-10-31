import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { initiatives } from "@/config/initiatives";
import { getFlagshipEvent } from "@/content/events";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelationToGlobal } from "@/components/sections/RelationToGlobal";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const gcn = initiatives.capital;

export const metadata = buildMetadata({
  title: "Global Capital Network (GCN) — Where Capital Relationships Begin",
  description:
    "Global Capital Network develops long-term relationships among family offices, institutional investors, financial professionals, and strategic capital partners across traditional and digital finance.",
  path: "/capital",
});

const network = [
  { title: "Family offices", body: "Single- and multi-family offices with a long-term, multi-generational outlook." },
  { title: "Institutional investors", body: "Organizations that steward capital on behalf of others, with the governance that requires." },
  { title: "Financial professionals", body: "Advisors, asset and wealth managers, and specialists across private and public markets." },
  { title: "Strategic capital partners", body: "Corporate and strategic participants seeking aligned, long-term relationships." },
  { title: "Financial institutions", body: "Banks, custodians, and infrastructure providers spanning traditional and digital finance." },
  { title: "Founders and operators", body: "Leaders building businesses that benefit from thoughtful capital relationships." },
];

const principles = [
  { title: "Discretion", body: "Relationships, mandates, and conversations are treated as private by default." },
  { title: "Alignment before introduction", body: "We seek to understand priorities and constraints before suggesting any connection." },
  { title: "Qualified introductions", body: "Introductions are made selectively, with context, and only with both parties’ agreement." },
  { title: "Long-term orientation", body: "We value enduring relationships over transactional activity." },
];

const process = [
  { title: "Introduction", body: "A first conversation to understand who you are and how you work." },
  { title: "Understanding", body: "Learning priorities, areas of interest, and the constraints that matter." },
  { title: "Alignment", body: "Identifying where relationships within the network could be genuinely relevant." },
  { title: "Ongoing dialogue", body: "Staying in conversation over time — through gatherings, forums, and direct contact." },
];

export default function CapitalPage() {
  const flagship = getFlagshipEvent();
  return (
    <>
      <PageHero
        eyebrow="Global Capital Network · GCN"
        accent={gcn.theme.accent}
        image={gcn.image}
        title={
          <>
            Where Capital{" "}
            <span className="serif-accent" style={{ color: gcn.theme.accent }}>
              Relationships Begin.
            </span>
          </>
        }
        lede={
          <p>
            A discreet network of family offices, institutional investors, financial professionals,
            and strategic capital partners — built on relationships rather than transactions.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=capital" variant="light" size="lg">
              Begin a conversation
            </ButtonLink>
            <ButtonLink href="#principles" variant="outline-dark" size="lg" icon="none">
              Our principles
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="mission-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow accent={gcn.theme.accentInk}>Mission</Eyebrow>
            <h2 id="mission-heading" className="sr-only">Mission</h2>
          </div>
          <div className="lg:col-span-8">
            <p
              data-reveal
              className="font-display text-[1.75rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.6rem]"
            >
              Capital follows confidence. Confidence follows{" "}
              <span className="serif-accent" style={{ color: gcn.theme.accentInk }}>
                relationships built with care.
              </span>
            </p>
            <p className="text-lede mt-10 max-w-3xl text-ink-soft">
              Global Capital Network develops institutional relationships across borders and across
              traditional and digital finance. Its role is relationship development, coordination,
              and networking — creating the conditions for well-informed dialogue between the right
              people.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="network-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="network-heading"
            accent={gcn.theme.accentInk}
            eyebrow="The network"
            title="Who Global Capital Network convenes."
          />
          <FocusGrid items={network} accent={gcn.theme.accentInk} className="mt-16" />
        </div>
      </section>

      <section
        id="principles"
        aria-labelledby="principles-heading"
        className="surface-dark relative isolate overflow-hidden bg-abyss py-24 text-white sm:py-32 lg:py-40"
      >
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
          <Image src="/images/glass-x.webp" alt="" fill quality={70} sizes="50vw" className="object-cover opacity-30" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-abyss to-abyss/30" />
        </div>
        <div className="container-x">
          <div className="max-w-2xl">
            <Eyebrow tone="dark" accent={gcn.theme.accent}>
              Principles
            </Eyebrow>
            <h2 id="principles-heading" className="text-headline mt-6">
              Discreet by design.
            </h2>
            <p className="text-lede mt-7 text-mist">
              The network is built on a small number of principles, applied consistently.
            </p>
          </div>
          <div className="mt-16 lg:max-w-3xl">
            <FocusGrid items={principles} tone="dark" accent={gcn.theme.accent} columns={2} />
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="process-heading"
            accent={gcn.theme.accentInk}
            eyebrow="How relationships develop"
            title="Unhurried, by intent."
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={process} accent={gcn.theme.accentInk} label="How relationships develop" />
          </div>
        </div>
      </section>

      <section aria-labelledby="finance-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="finance-heading"
            accent={gcn.theme.accentInk}
            eyebrow="Across finance"
            title="Traditional and digital finance, in the same conversation."
            intro={
              <p>
                Capital markets are evolving. GCN brings together participants from established
                institutions and from emerging financial infrastructure, so that each can understand
                the other.
              </p>
            }
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Traditional finance",
                items: ["Private markets and private credit", "Real estate capital", "Family office strategy", "Institutional governance"],
              },
              {
                title: "Digital finance",
                items: ["Real-world asset infrastructure", "Stablecoin and settlement infrastructure", "Digital custody and compliance", "Digital wealth platforms"],
              },
            ].map((col) => (
              <div key={col.title} data-reveal className="rounded-sm border border-navy/12 bg-ivory p-8 sm:p-10">
                <h3 className="font-display text-2xl font-medium text-ink">{col.title}</h3>
                <ul className="mt-6 space-y-3 border-t border-navy/12 pt-6">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-4 text-ink-soft">
                      <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0" style={{ background: gcn.theme.accentInk }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate">Topics of dialogue — not products or services offered by GLOBAL.</p>
        </div>
      </section>

      {flagship ? (
        <section className="bg-ivory py-24 sm:py-32">
          <div className="container-x">
            <Link
              href={`/invitation/experiences/${flagship.slug}`}
              className="surface-dark group relative isolate grid overflow-hidden rounded-sm bg-navy text-white md:grid-cols-2"
            >
              <div className="relative min-h-64 md:min-h-[22rem]">
                <Image src={flagship.image.src} alt="" fill quality={70} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow" style={{ color: gcn.theme.accent }}>Where the network convenes</p>
                <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.025em]">
                  {flagship.title} — {flagship.location}
                </h2>
                <p className="mt-4 leading-relaxed text-mist">
                  GCN relationships come together in person at Global Invitation experiences,
                  including our flagship gathering in February 2027.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  View the gathering
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                </span>
              </div>
            </Link>
            <NoticePanel className="mt-16 max-w-4xl" title="Scope of Global Capital Network">
              Global Capital Network is a relationship and networking initiative. It is not a
              broker-dealer, placement agent, investment adviser, or fund. It does not solicit
              investments, arrange or negotiate transactions, or provide investment advice, and it
              makes no representation about fundraising outcomes. Any regulated activity is the sole
              responsibility of appropriately licensed parties.
            </NoticePanel>
          </div>
        </section>
      ) : null}

      <RelationToGlobal current="capital">
        <p>
          Global Capital Network is the ecosystem’s relationship layer for capital. It connects with
          Global Invitation for in-person gatherings, with Global South Access and Global Digital
          Access for regional and infrastructure perspective, and with Global Forum for shared
          thinking on markets.
        </p>
      </RelationToGlobal>

      <CtaBand
        eyebrow="Global Capital Network"
        accent={gcn.theme.accent}
        image={{ src: "/images/skyline-dusk.webp", alt: "" }}
        title="Begin a conversation."
        body={
          <p>
            For family offices, institutions, and financial professionals interested in joining the
            network’s dialogue.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=capital" variant="light" size="lg">
              Contact the network
            </ButtonLink>
            <ButtonLink href="/invitation/apply?interest=Investment%20and%20Capital%20Markets" variant="outline-dark" size="lg">
              Request an Invitation
            </ButtonLink>
          </>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: gcn.name, path: "/capital" }])} />
    </>
  );
}
