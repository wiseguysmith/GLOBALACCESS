import Image from "next/image";
import type { CSSProperties } from "react";
import { buildMetadata } from "@/lib/seo";
import { initiativeList } from "@/config/initiatives";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { GlobalMark } from "@/components/ui/Wordmark";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "The GLOBAL Ecosystem",
  description:
    "Five connected initiatives — Global Invitation, Global South Access, Global Digital Access, Global Capital Network, and Global Forum — sharing one philosophy and one set of standards.",
  path: "/ecosystem",
});

const flow = [
  { title: "Ideas", body: "Global Forum frames the questions and shares perspective." },
  { title: "Connection", body: "Global Invitation brings people together and builds trust." },
  { title: "Focus", body: "South Access, Digital Access, and Capital Network give relationships direction." },
  { title: "Collaboration", body: "Aligned parties work together — with qualified specialists where required." },
];

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        eyebrow="The Ecosystem"
        image={{
          src: "/images/night-city.webp",
          alt: "A city spread to the horizon under a deep blue evening sky",
        }}
        title={
          <>
            Five initiatives.{" "}
            <span className="serif-accent text-gold">One coherent philosophy.</span>
          </>
        }
        lede={
          <p>
            Each initiative has its own focus. Together they form a single ecosystem — so that a
            relationship formed in one place can find its purpose in another.
          </p>
        }
      />

      {/* Structure diagram */}
      <section aria-labelledby="structure-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="structure-heading"
            eyebrow="Structure"
            title="One foundation. Five layers of focus."
            intro={
              <p>
                Every initiative shares GLOBAL’s philosophy, standards, and relationships. Each
                contributes a distinct layer to the whole.
              </p>
            }
          />
          <div className="mt-16 lg:mt-20" role="group" aria-label="GLOBAL ecosystem structure">
            <div className="surface-dark flex flex-col items-center gap-4 rounded-t-sm bg-navy px-6 py-10 text-center text-white sm:flex-row sm:justify-center sm:gap-6">
              <GlobalMark className="h-10 w-14 text-white" />
              <div>
                <p className="font-display text-xl font-semibold tracking-[0.3em]">GLOBAL</p>
                <p className="mt-1 text-sm text-mist">Shared philosophy · standards · relationships</p>
              </div>
            </div>
            <ul className="grid border-x border-b border-navy/12 bg-white sm:grid-cols-2 lg:grid-cols-5">
              {initiativeList.map((i) => (
                <li
                  key={i.id}
                  className="relative border-t border-navy/12 p-7 sm:[&:nth-child(2n)]:border-l lg:border-t-0 lg:[&:not(:first-child)]:border-l"
                  style={{ "--layer": i.theme.accentInk } as CSSProperties}
                >
                  <span aria-hidden="true" className="absolute top-0 left-0 h-0.5 w-full bg-[var(--layer)]" />
                  <p className="font-display text-xs tabular-nums text-[var(--layer)]">{i.index}</p>
                  <p className="mt-3 font-display text-lg font-medium text-ink">{i.name}</p>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{i.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Initiative detail */}
      <section aria-label="Initiatives" className="bg-paper py-24 sm:py-32">
        <div className="container-x space-y-24 sm:space-y-32">
          {initiativeList.map((i, idx) => (
            <article
              key={i.id}
              id={i.id}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              style={{ "--accent": i.theme.accentInk } as CSSProperties}
            >
              <div
                data-reveal="fade"
                className={`relative aspect-[4/3] overflow-hidden rounded-sm lg:col-span-6 ${idx % 2 ? "lg:order-2 lg:col-start-7" : ""}`}
              >
                <Image src={i.image.src} alt={i.image.alt} fill quality={70} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div data-reveal className={`lg:col-span-5 ${idx % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <Eyebrow accent={i.theme.accentInk}>
                  {i.index} · {i.kicker}
                </Eyebrow>
                <h2 className="text-headline mt-6 text-ink">{i.name}</h2>
                <p className="serif-accent mt-3 text-2xl text-[var(--accent)]">{i.tagline}</p>
                <p className="text-lede mt-6 text-ink-soft">{i.description}</p>
                <p className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  {i.role}
                </p>
                <div className="mt-8">
                  <ArrowLink href={i.href} className="text-ink">
                    Explore {i.name}
                  </ArrowLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="flow-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="flow-heading"
            eyebrow="How it fits together"
            title="From an idea to a working relationship."
            intro={<p>An illustration of how the initiatives complement one another.</p>}
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={flow} label="How the ecosystem fits together" />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Begin"
        image={{ src: "/images/banquet.webp", alt: "" }}
        title={
          <>
            Access Begins With <span className="serif-accent text-gold">Connection.</span>
          </>
        }
        body={<p>For most people, the ecosystem begins with Global Invitation.</p>}
        actions={
          <>
            <ButtonLink href="/invitation/apply" size="lg">
              Request an Invitation
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-dark" size="lg">
              Connect With GLOBAL
            </ButtonLink>
          </>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: "Ecosystem", path: "/ecosystem" }])} />
    </>
  );
}
