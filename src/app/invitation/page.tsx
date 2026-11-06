import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Building2, Cpu, Handshake, Landmark, Rocket } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { getEvents, getFlagshipEvent } from "@/content/events";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { EventFeature } from "@/components/sections/Events";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { AccessLevels } from "@/components/sections/AccessLevels";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { audiences, journeySteps, opportunityTypes, pillars } from "@/content/invitation";

export const metadata = buildMetadata({
  title: "Global Invitation — Access Begins With Connection",
  description:
    "Global Invitation offers curated executive experiences, private gatherings, and thoughtful introductions across borders. Participation is by invitation; there is no membership.",
  path: "/invitation",
});

const audienceIcons = [Rocket, Landmark, Briefcase, Cpu, Building2, Handshake];

export default function InvitationPage() {
  const flagship = getFlagshipEvent();
  const otherEvents = getEvents().filter((e) => e.slug !== flagship?.slug);

  return (
    <>
      <PageHero
        size="full"
        framed
        align="center"
        eyebrow="Global Invitation"
        image={{
          src: "/images/banquet.webp",
          alt: "A long dinner table set with glassware and flowers beneath warm lights",
        }}
        title={
          <>
            Access Begins
            <br />
            With <span className="serif-accent text-gold">Connection.</span>
          </>
        }
        lede={
          <p>
            Curated executive experiences, private gatherings, and thoughtful introductions —
            connecting exceptional people across borders, by invitation.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/invitation/apply" size="lg">
              Request an Invitation
            </ButtonLink>
            <ButtonLink href="/invitation/experiences" variant="outline-dark" size="lg">
              Explore Experiences
            </ButtonLink>
          </>
        }
      />
      <SectionNav items={invitationNav} label="Global Invitation" />

      {/* Statement */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <p
            data-reveal
            className="mx-auto max-w-5xl text-center font-display text-[1.75rem] leading-[1.25] font-medium tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            Global Invitation is built for people who value the{" "}
            <span className="serif-accent text-gold-ink">quality of a connection</span> over the
            number of them — and who believe the right conversation, at the right moment, can
            change what is possible.
          </p>
        </div>
      </section>

      {/* Three pillars */}
      <section aria-labelledby="pillars-heading" className="bg-ivory pb-24 sm:pb-32">
        <div className="container-x">
          <h2 id="pillars-heading" className="sr-only">
            The three pillars of Global Invitation
          </h2>
          <ul className="grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <li key={pillar.title} data-reveal>
                <Link
                  href={pillar.href}
                  className="surface-dark group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-sm bg-navy p-8 text-white sm:min-h-[36rem] sm:p-10"
                >
                  <Image
                    src={pillar.image.src}
                    alt=""
                    fill
                    quality={70}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/65 to-navy/5" />
                  <span className="absolute top-8 left-8 font-display text-5xl font-light text-gold/90 sm:top-10 sm:left-10">
                    {["I", "II", "III"][i]}
                  </span>
                  <h3 className="font-display text-3xl font-medium tracking-[-0.025em]">{pillar.title}</h3>
                  <p className="serif-accent mt-2 text-lg text-gold-soft">{pillar.kicker}</p>
                  <p className="mt-4 leading-relaxed text-white/75">{pillar.body}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    Explore {pillar.title.toLowerCase()}
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiences */}
      <section aria-labelledby="experiences-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="experiences-heading"
            eyebrow="Experiences"
            title="Gatherings designed for real conversation."
            intro={
              <p>
                Private dinners, leadership forums, investor gatherings, and international summits —
                intimate by design, and curated so that every participant adds to the room.
              </p>
            }
          />
          <div className="mt-16 lg:mt-20">
            {flagship ? <EventFeature event={flagship} /> : null}
            {otherEvents.length === 0 ? (
              <p className="mt-8 text-sm text-slate">
                Further experiences will be announced as they are confirmed.
              </p>
            ) : null}
          </div>
          <div className="mt-10">
            <ArrowLink href="/invitation/experiences" className="text-ink">
              View all experiences
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        aria-labelledby="audience-heading"
        className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32 lg:py-40"
      >
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow tone="dark">Who It&apos;s For</Eyebrow>
            <h2 id="audience-heading" className="text-headline mt-6">
              A community of <span className="serif-accent text-gold">perspective.</span>
            </h2>
            <p className="text-lede mt-7 text-mist">
              Global Invitation brings together people whose experience, judgment, and intent
              strengthen the community as a whole.
            </p>
            <p className="mt-6 border-l border-gold/50 pl-5 text-[0.95rem] leading-relaxed text-white/70">
              Participation is by invitation and every request is reviewed individually. Submitting
              a request does not guarantee acceptance.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:col-span-8">
            {audiences.map((a, i) => {
              const Icon = audienceIcons[i];
              return (
                <li key={a.title} data-reveal className="bg-navy p-8 sm:p-10">
                  <Icon aria-hidden="true" className="size-6 text-gold" strokeWidth={1.25} />
                  <h3 className="mt-6 font-display text-xl font-medium">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{a.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <AccessLevels headingId="access-heading" eyebrow="Public information, private invitations" surface="midnight" />

      {/* Journey */}
      <section aria-labelledby="journey-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="journey-heading"
            eyebrow="From inquiry to invitation"
            title="A considered path to participation."
            intro={
              <p>
                Every relationship in Global Invitation begins with understanding. The process is
                personal, unhurried, and designed to ensure alignment on both sides.
              </p>
            }
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={journeySteps} label="From inquiry to invitation" />
          </div>
          <div className="mt-16 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/invitation/apply" variant="solid-navy" size="lg">
              Request an Invitation
            </ButtonLink>
            <ButtonLink href="/invitation/participation" variant="outline-light" size="lg">
              How participation works
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section aria-labelledby="opportunities-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Opportunities</Eyebrow>
            <h2 id="opportunities-heading" className="text-headline mt-6 text-ink">
              Where connection becomes collaboration.
            </h2>
            <p className="text-lede mt-7 text-ink-soft">
              Global Invitation can open the door to relevant conversations across the GLOBAL
              ecosystem — always through considered introductions and mutual interest.
            </p>
            <NoticePanel className="mt-10" title="What opportunities are — and are not">
              Global Invitation is not an investment marketplace. It does not offer, sell, or arrange
              securities or financial products, and participation does not guarantee access to any
              investment or transaction.
            </NoticePanel>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {opportunityTypes.map((o) => (
              <li key={o.title} data-reveal className="border-t border-navy/15 py-7">
                <h3 className="font-display text-xl font-medium text-ink">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        align="center"
        eyebrow="Global Invitation"
        image={{ src: "/images/event-dining.webp", alt: "" }}
        title={
          <>
            Your Next Connection Could{" "}
            <span className="serif-accent text-gold">Change Your Perspective.</span>
          </>
        }
        body={
          <p>
            Join a carefully curated community built around meaningful connections and global
            collaboration.
          </p>
        }
        actions={
          <ButtonLink href="/invitation/apply" size="lg">
            Request an Invitation
          </ButtonLink>
        }
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "GLOBAL", path: "/" },
          { name: "Global Invitation", path: "/invitation" },
        ])}
      />
    </>
  );
}
