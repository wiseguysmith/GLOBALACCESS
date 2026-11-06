import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, CalendarDays, Flag, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, invitationNav } from "@/config/site";
import { getEvent, getEvents } from "@/content/events";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { EventBadges } from "@/components/sections/Events";
import { GolfTournamentSection } from "@/components/sections/GolfTournament";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/invitation/experiences/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return buildMetadata({
    title: `${event.title} — ${event.location}`,
    description: event.summary,
    path: `/invitation/experiences/${event.slug}`,
    noIndex: event.verification !== "verified",
  });
}

export default async function EventPage({ params }: PageProps<"/invitation/experiences/[slug]">) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const path = `/invitation/experiences/${event.slug}`;
  const partnershipHref = "/contact?topic=partnership";

  return (
    <>
      <PageHero
        size="full"
        eyebrow={`Global Invitation · ${event.format}`}
        breadcrumbs={[
          { label: "Global Invitation", href: "/invitation" },
          { label: "Experiences", href: "/invitation/experiences" },
          { label: event.title },
        ]}
        image={event.image}
        imagePosition="center 70%"
        title={
          <>
            {event.title}
            {event.tagline ? (
              <span className="serif-accent mt-4 block text-[0.42em] leading-tight text-gold">
                {event.tagline}
              </span>
            ) : null}
          </>
        }
        lede={<p>{event.summary}</p>}
        actions={
          <>
            <ButtonLink href={event.cta.href} size="lg">
              {event.cta.label}
            </ButtonLink>
            {event.partnerTiers?.length ? (
              <ButtonLink href={partnershipHref} variant="outline-dark" size="lg">
                Become a partner
              </ButtonLink>
            ) : null}
          </>
        }
      >
        <div className="flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <dl className="flex flex-col gap-3 text-white/85 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Location</dt>
              <MapPin aria-hidden="true" className="size-4 text-gold" strokeWidth={1.5} />
              <dd>{event.location}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">Date</dt>
              <CalendarDays aria-hidden="true" className="size-4 text-gold" strokeWidth={1.5} />
              <dd>{event.dateLabel}</dd>
            </div>
            {event.golf ? (
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Golf tournament</dt>
                <Flag aria-hidden="true" className="size-4 text-gold" strokeWidth={1.5} />
                <dd>
                  <Link href="#golf" className="underline decoration-gold/60 underline-offset-4 hover:text-white">
                    {event.golf.name} golf tournament
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
          <EventBadges event={event} tone="dark" />
        </div>
      </PageHero>
      <SectionNav items={invitationNav} label="Global Invitation" />

      {event.highlights?.length ? (
        <section aria-label="At a glance" className="border-b border-navy/10 bg-ivory">
          <div className="container-x">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {event.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className={`py-10 pr-6 sm:py-14 ${i > 0 ? "lg:border-l lg:border-navy/10 lg:pl-10" : ""} ${i % 2 === 1 ? "border-l border-navy/10 pl-6 lg:pl-10" : ""} ${i > 1 ? "border-t border-navy/10 lg:border-t-0" : ""}`}
                >
                  <dt className="eyebrow text-gold-ink">{h.label}</dt>
                  <dd className="mt-4">
                    <span className="block font-display text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
                      {h.value}
                    </span>
                    {h.note ? <span className="mt-2 block text-sm text-slate">{h.note}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="overview-heading" className="bg-ivory py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-heading" className="text-headline mt-6 text-ink">
              Two days. <span className="serif-accent text-gold-ink">One room.</span>
            </h2>
          </div>
          <div className="text-lede space-y-6 text-ink-soft lg:col-span-7 lg:col-start-6">
            {event.description.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {event.agenda?.length ? (
        <section
          aria-labelledby="agenda-heading"
          className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32 lg:py-40"
        >
          <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
          <div className="container-x">
            <SectionHeading
              id="agenda-heading"
              tone="dark"
              eyebrow="Program"
              title="The shape of the gathering."
              intro={<p>Detailed timings and sessions will be shared with confirmed participants.</p>}
            />
            <ol className="mt-16 grid gap-5 lg:grid-cols-2">
              {event.agenda.map((block) => (
                <li key={block.label} data-reveal className="rounded-sm border border-white/15 bg-white/[0.02] p-8 sm:p-10">
                  <p className="eyebrow text-gold">{block.label}</p>
                  <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.025em]">{block.title}</h3>
                  {block.summary ? <p className="mt-3 leading-relaxed text-mist">{block.summary}</p> : null}
                  <ul className="mt-8 space-y-4 border-t border-white/15 pt-8">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-4 leading-relaxed text-white/85">
                        <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {block.link ? (
                    <Link
                      href={block.link.href}
                      className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-gold hover:text-gold-soft"
                    >
                      {block.link.label}
                      <ArrowDown aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {event.golf ? (
        <GolfTournamentSection
          golf={event.golf}
          requestHref={`/invitation/apply?interest=Events%20and%20Experiences&event=${encodeURIComponent(`${event.golf.name} — golf tournament`)}`}
          partnerHref="/contact?topic=partnership"
        />
      ) : null}

      {event.themes?.length || event.salonThemes?.length ? (
        <section aria-labelledby="themes-heading" className="bg-ivory py-24 sm:py-32">
          <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-20">
            {event.themes?.length ? (
              <div data-reveal>
                <Eyebrow>Summit themes</Eyebrow>
                <h2 id="themes-heading" className="text-title mt-6 text-ink">
                  Traditional finance, FinTech, and decentralized finance — in one conversation.
                </h2>
                <ul className="mt-10 flex flex-wrap gap-2.5">
                  {event.themes.map((t) => (
                    <li key={t} className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {event.salonThemes?.length ? (
              <div data-reveal>
                <Eyebrow>Private investor salons</Eyebrow>
                <h2 className="text-title mt-6 text-ink">Smaller rooms for deeper conversations.</h2>
                <ul className="mt-10 flex flex-wrap gap-2.5">
                  {event.salonThemes.map((t) => (
                    <li key={t} className="rounded-full border border-gold-ink/30 bg-[#FBF7EE] px-4 py-2 text-sm text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm leading-relaxed text-slate">
                  Salon access is limited and is not included automatically with summit attendance.
                  Salons are conversations, not offerings.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {event.audience?.length ? (
        <section aria-labelledby="audience-heading" className="bg-paper py-24 sm:py-32">
          <div className="container-x">
            <SplitFeature
              image={{
                src: "/images/event-san-antonio.webp",
                alt: "The San Antonio River Walk lined with trees and historic buildings at dusk",
              }}
              aspect="aspect-[4/5]"
            >
              <Eyebrow>Who attends</Eyebrow>
              <h2 id="audience-heading" className="text-headline mt-6 text-ink">
                A curated room in <span className="serif-accent text-gold-ink">San Antonio.</span>
              </h2>
              <p className="text-lede mt-6 text-ink-soft">
                Participation is curated to bring together perspectives from across capital,
                finance, technology, and enterprise.
              </p>
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {event.audience.map((a) => (
                  <li key={a} className="border-t border-navy/12 py-3 text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </SplitFeature>
          </div>
        </section>
      ) : null}

      {event.partnerTiers?.length ? (
        <section aria-labelledby="partners-heading" className="bg-ivory py-24 sm:py-32">
          <div className="container-x">
            <SectionHeading
              id="partners-heading"
              eyebrow="Partnership"
              title="Partner with The Global Invitation."
              intro={
                <p>
                  A limited number of partnership roles are available. Partnership details are shared
                  in conversation.
                </p>
              }
            />
            <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-navy/10 bg-navy/10 lg:grid-cols-4">
              {event.partnerTiers.map((tier, i) => (
                <li key={tier} className="bg-white p-7">
                  <span className="font-display text-xs tabular-nums text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-6 font-display text-lg font-medium text-ink">{tier}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={partnershipHref} variant="solid-navy" size="lg">
                Start a partnership conversation
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      {event.notes?.length ? (
        <section className="bg-ivory pb-24 sm:pb-32">
          <div className="container-x">
            <NoticePanel title="Good to know" className="max-w-4xl">
              <ul className="mt-2 space-y-2">
                {event.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </NoticePanel>
          </div>
        </section>
      ) : null}

      <CtaBand
        align="center"
        eyebrow={event.title}
        image={{ src: "/images/event-dining.webp", alt: "" }}
        title={
          <>
            Your Next Connection Could{" "}
            <span className="serif-accent text-gold">Change Your Perspective.</span>
          </>
        }
        body={<p>Requests to attend are reviewed individually. Capacity is deliberately limited.</p>}
        actions={
          <ButtonLink href={event.cta.href} size="lg">
            {event.cta.label}
          </ButtonLink>
        }
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Global Invitation", path: "/invitation" },
          { name: "Experiences", path: "/invitation/experiences" },
          { name: event.title, path },
        ])}
      />
      {event.startDate && event.verification === "verified" ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.summary,
            startDate: event.startDate,
            ...(event.endDate ? { endDate: event.endDate } : {}),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: event.venue ?? event.location, address: event.location },
            image: [new URL(event.image.src, siteConfig.url).toString()],
            organizer: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }}
        />
      ) : null}
    </>
  );
}
