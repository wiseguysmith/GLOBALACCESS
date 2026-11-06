import { Check, Minus } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { principles } from "@/components/sections/home/HomeSections";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "About GLOBAL",
  description:
    "GLOBAL is an emerging international ecosystem facilitating relationships, market access, collaboration, and cross-border opportunity — guided by a risk-first philosophy.",
  path: "/about",
});

const is = [
  "A relationship-led ecosystem connecting people, markets, capital, and technology across borders",
  "A curated community, convened through Global Invitation",
  "A coordinator of conversations, introductions, and collaboration",
  "An editorial voice on markets, innovation, and development",
];

const isNot = [
  "A bank, broker-dealer, investment adviser, or fund",
  "An offer or solicitation of any security or financial product",
  "A guarantee of access to investments, capital, or transactions",
  "A substitute for independent legal, tax, or financial advice",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GLOBAL"
        image={{
          src: "/images/wing.webp",
          alt: "An aircraft wing above the clouds in bright afternoon light",
        }}
        title={
          <>
            An ecosystem for a{" "}
            <span className="serif-accent text-gold">connected world.</span>
          </>
        }
        lede={
          <p>
            GLOBAL exists to facilitate the relationships, access, and collaboration that meaningful
            cross-border opportunity depends on — carefully, transparently, and over the long term.
          </p>
        }
      />

      <section aria-labelledby="who-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SplitFeature
            image={{
              src: "/images/night-city.webp",
              alt: "A city spread to the horizon under a deep blue evening sky, its lights just coming on",
            }}
            aspect="aspect-[5/4]"
          >
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="who-heading" className="text-headline mt-6 text-ink">
              Global Access, known simply as GLOBAL.
            </h2>
            <div className="text-lede mt-7 space-y-5 text-ink-soft">
              <p>
                GLOBAL is an interconnected ecosystem of initiatives designed to facilitate
                relationships, access to markets, collaboration, innovation, and cross-border
                opportunity.
              </p>
              <p>
                We operate at the intersection of the Global North and Global South, traditional and
                decentralized finance, physical and digital assets, and institutions, entrepreneurs,
                and communities.
              </p>
            </div>
          </SplitFeature>
        </div>
      </section>

      <section aria-labelledby="stage-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Where we are</Eyebrow>
            <h2 id="stage-heading" className="text-headline mt-6 text-ink">
              Early, and deliberate.
            </h2>
          </div>
          <div className="text-lede space-y-5 text-ink-soft lg:col-span-7 lg:col-start-6">
            <p>
              GLOBAL is an emerging ecosystem. We are building our community, our relationships, and
              our initiatives step by step — beginning with Global Invitation and our first flagship
              gathering.
            </p>
            <p>
              We would rather be clear about our stage than overstate it. As initiatives mature,
              we will share more — and we will say plainly what is confirmed and what remains in
              development.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32 lg:py-40"
      >
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x">
          <SectionHeading
            id="principles-heading"
            tone="dark"
            eyebrow="Our philosophy"
            title={
              <>
                Access Is Built on <span className="serif-accent text-gold">Trust.</span>
              </>
            }
            intro={<p>We seek to understand risk before pursuing opportunity. These principles guide how we work.</p>}
          />
          <FocusGrid items={principles} tone="dark" className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="clarity-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="clarity-heading"
            eyebrow="Clarity"
            title="What GLOBAL is — and is not."
            intro={<p>Transparency starts with being precise about our role.</p>}
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div data-reveal className="rounded-sm border border-navy/12 bg-white p-8 sm:p-10">
              <h3 className="font-display text-2xl font-medium text-ink">GLOBAL is</h3>
              <ul className="mt-6 space-y-4">
                {is.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-ink" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="rounded-sm border border-navy/12 bg-paper p-8 sm:p-10">
              <h3 className="font-display text-2xl font-medium text-ink">GLOBAL is not</h3>
              <ul className="mt-6 space-y-4">
                {isNot.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                    <Minus aria-hidden="true" className="mt-1 size-4 shrink-0 text-slate" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <ArrowLink href="/ecosystem" className="text-ink">
              See how the ecosystem is organized
            </ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Connect"
        image={{ src: "/images/hero-horizon.webp", alt: "" }}
        title="Find Your Place in GLOBAL."
        body={<p>Explore our experiences, discuss a partnership, or simply start a conversation.</p>}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">
              Connect With GLOBAL
            </ButtonLink>
            <ButtonLink href="/invitation" variant="outline-dark" size="lg">
              Discover Global Invitation
            </ButtonLink>
          </>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
