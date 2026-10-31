import { buildMetadata } from "@/lib/seo";
import { initiatives } from "@/config/initiatives";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { RelationToGlobal } from "@/components/sections/RelationToGlobal";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const gda = initiatives.digital;

export const metadata = buildMetadata({
  title: "Global Digital Access (GDA) — Physical Value, Digital Infrastructure",
  description:
    "Global Digital Access explores and coordinates the responsible digital transformation of real-world assets — tokenization readiness, compliance-aware technology, and institutional interoperability.",
  path: "/digital",
});

const layers = [
  {
    name: "Physical asset",
    detail: "Real estate, infrastructure, natural resources, and other real-world value.",
  },
  {
    name: "Legal and ownership",
    detail: "Clear title, an appropriate legal structure, and clearly defined holder rights.",
  },
  {
    name: "Data and verification",
    detail: "Reliable, current, and independently verifiable information about the asset.",
  },
  {
    name: "Digital representation",
    detail: "Standards-based records and registries that represent the asset digitally.",
  },
  {
    name: "Access and compliance",
    detail: "Permissioning, identity checks, and reporting — delivered by licensed providers.",
  },
];

const readiness = [
  { title: "Title and ownership", body: "Is ownership of the underlying asset documented, clear, and free of unresolved claims?" },
  { title: "Legal structure", body: "What legal wrapper connects the asset to its digital form, and what rights does a holder actually have?" },
  { title: "Data integrity", body: "Can information about condition, valuation, income, and obligations be kept current and verified?" },
  { title: "Regulatory pathway", body: "Which regimes apply in each jurisdiction, and which licensed parties carry out regulated activity?" },
  { title: "Operational controls", body: "How are custody, records, permissions, and dispute resolution governed?" },
];

const focusAreas = [
  { title: "Real-world assets", body: "Understanding which assets are suited to digital representation — and which are not." },
  { title: "Asset tokenization", body: "Exploring tokenization as infrastructure, approached through readiness rather than hype." },
  { title: "Blockchain infrastructure", body: "Evaluating networks, standards, and tooling on security, resilience, and fit for purpose." },
  { title: "Digital ownership frameworks", body: "How rights, records, and governance can be represented and maintained digitally." },
  { title: "Compliance-aware integration", body: "Designing with legal, identity, and reporting requirements in mind from the beginning." },
  { title: "Institutional interoperability", body: "Connecting digital systems with existing registries, custodians, and institutions." },
  { title: "Technology partnerships", body: "Coordinating with specialist providers rather than reinventing what already works." },
];

export default function DigitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Digital Access · GDA"
        accent={gda.theme.accent}
        image={gda.image}
        title={
          <>
            Connecting Physical Value to{" "}
            <span className="serif-accent" style={{ color: gda.theme.accent }}>
              Digital Infrastructure.
            </span>
          </>
        }
        lede={
          <p>
            Exploring and coordinating the responsible digital transformation of real-world assets —
            from tokenization readiness to the infrastructure that supports it.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=digital" size="lg">
              Discuss a technology partnership
            </ButtonLink>
            <ButtonLink href="#readiness" variant="outline-dark" size="lg" icon="none">
              Readiness framework
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="mission-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow accent={gda.theme.accentInk}>Mission</Eyebrow>
            <h2 id="mission-heading" className="sr-only">Mission</h2>
          </div>
          <div className="lg:col-span-8">
            <p
              data-reveal
              className="font-display text-[1.75rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.6rem]"
            >
              Technology can make a sound structure more efficient.{" "}
              <span className="serif-accent" style={{ color: gda.theme.accentInk }}>
                It cannot make a weak structure sound.
              </span>
            </p>
            <p className="text-lede mt-10 max-w-3xl text-ink-soft">
              Global Digital Access examines how real-world assets can move onto digital
              infrastructure responsibly — with legal clarity, data integrity, and compliance-aware
              technology at the foundation. We focus on readiness first, and on infrastructure that
              works alongside existing institutions rather than around them.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="stack-heading"
        className="surface-dark relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32 lg:py-40"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(134,169,203,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(134,169,203,0.07)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark" accent={gda.theme.accent}>
              The infrastructure stack
            </Eyebrow>
            <h2 id="stack-heading" className="text-headline mt-6">
              From physical value to digital access — layer by layer.
            </h2>
            <p className="text-lede mt-7 text-mist">
              A digital representation is only as trustworthy as every layer beneath it. Each layer
              has its own specialists, standards, and obligations.
            </p>
          </div>
          <ol className="relative lg:col-span-7" aria-label="Infrastructure layers, from foundation to access">
            {[...layers].reverse().map((layer, i) => {
              const n = layers.length - i;
              return (
                <li
                  key={layer.name}
                  data-reveal
                  className="relative mb-3 grid grid-cols-[3rem_1fr] items-start gap-4 rounded-sm border bg-white/[0.02] p-6 last:mb-0 sm:grid-cols-[4rem_1fr] sm:p-7"
                  style={{
                    borderColor: `rgba(134,169,203,${0.12 + n * 0.06})`,
                    marginLeft: `${(layers.length - n) * 0}rem`,
                  }}
                >
                  <span className="font-display text-sm tabular-nums" style={{ color: gda.theme.accent }}>
                    L{n}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-medium">{layer.name}</span>
                    <span className="mt-1.5 block leading-relaxed text-mist">{layer.detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="readiness" aria-labelledby="readiness-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="readiness-heading"
            accent={gda.theme.accentInk}
            eyebrow="Readiness framework"
            title="Readiness before tokenization."
            intro={
              <p>
                Before any asset is represented digitally, five questions need clear answers. They
                are rarely glamorous — and they determine almost everything.
              </p>
            }
          />
          <FocusGrid items={readiness} accent={gda.theme.accentInk} className="mt-16" />
          <div className="mt-14">
            <ArrowLink href="/forum/readiness-before-tokenization" className="text-ink">
              Read the perspective in Global Forum
            </ArrowLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="focus-heading"
            accent={gda.theme.accentInk}
            eyebrow="Areas of focus"
            title="Where Global Digital Access concentrates."
          />
          <FocusGrid items={focusAreas} accent={gda.theme.accentInk} columns={4} className="mt-16" />
        </div>
      </section>

      <section className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <SplitFeature
            reverse
            image={{
              src: "/images/server.webp",
              alt: "Rows of network cables connected to server equipment in a data center",
            }}
            aspect="aspect-[5/4]"
          >
            <Eyebrow accent={gda.theme.accentInk}>Principles</Eyebrow>
            <h2 className="text-headline mt-6 text-ink">Infrastructure, not spectacle.</h2>
            <ul className="mt-8 space-y-5 text-ink-soft">
              {[
                "Security and resilience are assessed before features.",
                "Compliance requirements shape design from the first conversation.",
                "Specialist and licensed partners are engaged wherever their authority is required.",
                "Interoperability with existing institutions is treated as essential.",
              ].map((p) => (
                <li key={p} className="flex gap-4 leading-relaxed">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0" style={{ background: gda.theme.accentInk }} />
                  {p}
                </li>
              ))}
            </ul>
          </SplitFeature>
          <NoticePanel className="mt-20 max-w-4xl" title="Scope of Global Digital Access">
            Global Digital Access explores, evaluates, and coordinates. It does not issue, sell, or
            trade tokens or digital assets, and it does not provide custody, brokerage, exchange, or
            other regulated services. Where such services are required, they are the responsibility
            of appropriately licensed providers in the relevant jurisdiction.
          </NoticePanel>
        </div>
      </section>

      <RelationToGlobal current="digital">
        <p>
          Global Digital Access is the ecosystem’s infrastructure layer. It brings technical and
          structural rigor to conversations that begin in Global Invitation and Global Capital
          Network, and to regional opportunities identified through Global South Access.
        </p>
      </RelationToGlobal>

      <CtaBand
        eyebrow="Global Digital Access"
        accent={gda.theme.accent}
        image={{ src: "/images/glass-x.webp", alt: "" }}
        title="Build the infrastructure carefully."
        body={
          <p>
            For asset owners, technology providers, legal specialists, and institutions exploring the
            responsible digitization of real-world value.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=digital" size="lg">
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/ecosystem" variant="outline-dark" size="lg">
              Explore the ecosystem
            </ButtonLink>
          </>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: gda.name, path: "/digital" }])} />
    </>
  );
}
