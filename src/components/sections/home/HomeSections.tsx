import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Handshake, MapPin, Plus, Sparkles } from "lucide-react";
import { initiativeList } from "@/config/initiatives";
import { getFlagshipEvent } from "@/content/events";
import { getArticles } from "@/content/forum";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { InitiativeCard } from "@/components/sections/InitiativeCard";
import { EcosystemMap } from "@/components/sections/EcosystemMap";
import { PerspectivesGrid } from "@/components/sections/Perspectives";

/* ------------------------------------------------------------- Hero index */

export function HeroIndex() {
  return (
    <nav aria-label="Initiatives" className="hidden border-t border-white/15 sm:block">
      <ul className="grid grid-cols-2 lg:grid-cols-5">
        {initiativeList.map((item) => (
          <li key={item.id} className="border-b border-white/10 lg:border-b-0">
            <Link
              href={item.href}
              className="group flex h-full flex-col gap-2 py-5 pr-6 transition-colors"
            >
              <span className="flex items-center gap-3 font-display text-xs tabular-nums text-gold">
                {item.index}
                <span aria-hidden="true" className="h-px w-6 bg-gold/50 transition-all duration-500 group-hover:w-10" />
              </span>
              <span className="font-display text-[1.05rem] font-medium text-white">{item.name}</span>
              <span className="text-[0.82rem] leading-snug text-white/60">{item.tagline}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------- The Human Element */

const connections = [
  {
    title: "Founders and capital partners",
    body: "People building ambitious companies, and the investors and family offices who back long-term work.",
  },
  {
    title: "Institutions and innovators",
    body: "Established organizations and the people shaping new technology and financial infrastructure.",
  },
  {
    title: "Regional leaders and international counterparts",
    body: "Local knowledge and global relationships, meeting on equal terms.",
  },
];

export function HumanElementSection() {
  return (
    <section aria-labelledby="human-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        <figure className="relative lg:col-span-6" data-reveal="fade">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/people-reception.webp"
              alt="Guests in conversation at an evening reception in a warmly lit room"
              fill
              quality={70}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 -bottom-12 hidden aspect-[4/3] w-[46%] overflow-hidden rounded-sm border-4 border-ivory shadow-[0_24px_60px_-30px_rgba(16,30,48,0.5)] sm:block lg:-right-10">
            <Image
              src="/images/people-table.webp"
              alt="Hands and notebooks around a wooden table during a working conversation"
              fill
              quality={70}
              sizes="(min-width: 1024px) 22vw, 46vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 text-xs tracking-[0.04em] text-slate sm:mt-16">
            Illustrative photography
          </figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <Eyebrow>The Human Element</Eyebrow>
          <h2 id="human-heading" className="text-headline mt-6 text-ink">
            The Right Connections Change{" "}
            <span className="serif-accent text-gold-ink">What&apos;s Possible.</span>
          </h2>
          <div className="text-lede mt-7 space-y-5 text-ink-soft">
            <p>
              GLOBAL begins with people. We bring together individuals whose experience, expertise,
              and ambitions can create meaningful collaboration — and we take care over who meets
              whom, and why.
            </p>
            <p>
              Markets, capital, and technology matter. But the opportunities that last tend to start
              with a conversation between the right people at the right moment.
            </p>
          </div>
          <ul className="mt-10 border-t border-navy/15">
            {connections.map((c) => (
              <li key={c.title} className="border-b border-navy/15 py-5">
                <p className="font-display text-lg font-medium text-ink">{c.title}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ArrowLink href="/invitation/participation" className="text-ink">
              How participation works
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Our Ecosystem */

export function EcosystemSection() {
  return (
    <section aria-labelledby="ecosystem-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="ecosystem-heading"
          eyebrow="Our Ecosystem"
          title={
            <>
              Five initiatives.{" "}
              <span className="serif-accent text-gold-ink">One coherent philosophy.</span>
            </>
          }
          intro={
            <p>
              Each initiative has its own focus — experiences, markets, infrastructure, capital
              relationships, and ideas. Together they form one ecosystem, so a relationship formed in
              one place can find its purpose in another.
            </p>
          }
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 xl:grid-cols-5">
          {initiativeList.map((initiative, i) => (
            <li key={initiative.id} className={i === initiativeList.length - 1 ? "sm:col-span-2 xl:col-span-1" : undefined}>
              <InitiativeCard initiative={initiative} size="compact" className="h-full" />
            </li>
          ))}
        </ul>

        <div className="mt-20 lg:mt-28">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h3 className="text-title text-ink lg:col-span-7">How the initiatives complement one another.</h3>
            <p className="leading-relaxed text-ink-soft lg:col-span-5">
              There is no fixed path through GLOBAL. A relationship can begin in any initiative and
              grow wherever it is most useful.
            </p>
          </div>
          <EcosystemMap />
        </div>

        <div className="mt-10 flex justify-end">
          <ArrowLink href="/ecosystem" className="text-ink">
            Explore the ecosystem in depth
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Bridging Worlds */

const intersections = [
  {
    from: "Global North",
    to: "Global South",
    body: "Two-way relationships between established and emerging markets — built on local knowledge, shared priorities, and respect for context.",
    plain:
      "“Global South” refers broadly to emerging and developing economies across Latin America, Africa, and much of Asia. The relationships we value run both ways: capital and expertise in one direction; local knowledge, growth, and innovation in the other.",
  },
  {
    from: "Traditional Finance",
    to: "Digital Finance",
    body: "Engaging new financial infrastructure with the governance, discipline, and compliance expectations of established institutions.",
    plain:
      "Traditional finance means banks, funds, custodians, and regulated markets. Digital finance includes newer infrastructure such as blockchain-based records, stablecoins, and digital settlement. Our interest is in how the two can work together under appropriate oversight — not in replacing one with the other.",
  },
  {
    from: "Physical Assets",
    to: "Digital Infrastructure",
    body: "Exploring how real-world value can be represented, managed, and accessed through responsible digital frameworks.",
    plain:
      "Tokenization means representing ownership of, or rights in, a real-world asset — such as a building or a loan — as a digital record on a shared ledger. It can improve transparency and transferability, but only when the legal structure, data, and regulation behind it are sound.",
  },
  {
    from: "Capital",
    to: "Opportunity",
    body: "Helping the right people find one another through considered introductions — not open marketplaces.",
    plain:
      "Good opportunities are often unseen by the capital that could support them, and the reverse. Considered introductions, made with context and consent, help the right parties find each other. GLOBAL does not offer, sell, or arrange investments.",
  },
];

function Connector() {
  return (
    <span aria-hidden="true" className="relative mx-0 my-3 block h-px w-16 shrink-0 md:mx-6 md:my-0 md:w-20 xl:w-28">
      <span data-reveal="line" className="absolute inset-0 origin-left bg-gold/70" />
      <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full border border-gold bg-navy" />
      <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-gold" />
    </span>
  );
}

export function BridgingWorldsSection() {
  return (
    <section
      aria-labelledby="bridging-heading"
      className="surface-dark relative isolate overflow-hidden bg-navy py-24 text-white sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
      <div className="container-x">
        <SectionHeading
          id="bridging-heading"
          tone="dark"
          eyebrow="Bridging Worlds"
          title="We work where worlds meet."
          intro={
            <p>
              The most meaningful opportunities rarely sit neatly inside one market, sector, or
              system. GLOBAL operates at the intersections, where relationships and understanding
              matter most.
            </p>
          }
        />

        <ul className="mt-16 border-t border-white/15 lg:mt-24">
          {intersections.map((row) => (
            <li
              key={row.from}
              data-reveal
              className="grid gap-6 border-b border-white/15 py-10 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-12"
            >
              <p className="flex flex-col items-start font-display text-[1.75rem] leading-tight font-medium tracking-[-0.03em] text-white sm:text-4xl md:flex-row md:items-center lg:col-span-8 xl:text-[2.75rem]">
                <span>{row.from}</span>
                <Connector />
                <span className="serif-accent text-gold">{row.to}</span>
              </p>
              <div className="lg:col-span-4">
                <p className="leading-relaxed text-mist">{row.body}</p>
                <details className="group mt-4">
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-gold hover:text-gold-soft [&::-webkit-details-marker]:hidden">
                    <Plus
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-open:rotate-45"
                      strokeWidth={1.75}
                    />
                    <span className="group-open:hidden">What this means</span>
                    <span className="hidden group-open:inline">Close</span>
                  </summary>
                  <p className="mt-2 border-l border-gold/40 pl-4 text-[0.95rem] leading-relaxed text-white/80">
                    {row.plain}
                  </p>
                </details>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/60">
          And across technology and real-world infrastructure; institutions, entrepreneurs, and
          communities — wherever thoughtful connection can create durable value.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- Featured Experience */

export function FeaturedExperienceSection() {
  const event = getFlagshipEvent();
  if (!event) return null;
  const eventHref = `/invitation/experiences/${event.slug}`;
  const audience = (event.audience ?? []).slice(0, 6);

  return (
    <section aria-labelledby="featured-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-b border-navy/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Global Invitation · Featured Experience</Eyebrow>
            <h2 id="featured-heading" className="text-headline mt-6 text-ink">
              {event.title},{" "}
              <span className="serif-accent text-gold-ink">San Antonio.</span>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-ink-soft">
            Global Invitation convenes curated executive experiences. Our first flagship gathering is
            planned for San Antonio, Texas.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" data-reveal="fade">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]">
              <Image
                src={event.image.src}
                alt={event.image.alt}
                fill
                quality={70}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-5 left-5 rounded-full bg-navy/85 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.14em] text-gold uppercase backdrop-blur-sm">
                Planned · Invitation only
              </span>
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <dl className="grid gap-3 text-ink">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Dates</dt>
                <CalendarDays aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
                <dd>{event.dateLabel}</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">Location</dt>
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
                <dd>{event.location}</dd>
              </div>
            </dl>

            {event.tagline ? (
              <p className="serif-accent mt-8 text-2xl leading-snug text-ink">{event.tagline}</p>
            ) : null}

            <p className="eyebrow mt-10 text-gold-ink">The experience</p>
            <ol className="mt-4 border-t border-navy/15">
              {(event.agenda ?? []).map((block) => (
                <li key={block.label} className="border-b border-navy/15 py-5">
                  <p className="eyebrow text-[0.65rem] text-slate">{block.label}</p>
                  <p className="mt-1.5 font-display text-xl font-medium text-ink">{block.title}</p>
                  {block.summary ? (
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{block.summary}</p>
                  ) : null}
                </li>
              ))}
            </ol>

            {audience.length ? (
              <>
                <p className="eyebrow mt-10 text-gold-ink">Intended for</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {audience.map((a) => (
                    <li key={a} className="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm text-ink">
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href={event.cta.href} variant="solid-navy" size="lg">
                Event inquiry
              </ButtonLink>
              <ButtonLink href="/contact?topic=partnership" variant="outline-light" size="lg">
                Partnership interest
              </ButtonLink>
            </div>
            <div className="mt-6">
              <ArrowLink href={eventHref} className="text-ink">
                View the full experience
              </ArrowLink>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-slate">
              A planned experience. Dates, venues, and program details are subject to confirmation.
              Participation does not constitute an offer of, or solicitation for, any security or
              investment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- GLOBAL Perspectives */

export function PerspectivesSection() {
  const articles = getArticles();
  return (
    <section aria-labelledby="perspectives-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="perspectives-heading"
          eyebrow="GLOBAL Perspectives"
          title={
            <>
              Ideas that <span className="serif-accent text-gold-ink">cross borders.</span>
            </>
          }
          intro={
            <p>
              Research, interviews, and commentary on global markets, capital, technology, and
              development — published through Global Forum.
            </p>
          }
        />
        <div className="mt-14">
          <PerspectivesGrid articles={articles} />
        </div>
        <div className="mt-12 flex justify-end">
          <ArrowLink href="/forum" className="text-ink">
            Visit Global Forum
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Philosophy */

export const principles = [
  {
    title: "Institutional discipline",
    body: "Structured processes, clear responsibilities, and decisions made on evidence rather than enthusiasm.",
  },
  {
    title: "Thoughtful innovation",
    body: "Engaging seriously with new technologies and financial models — and being candid about what is not yet proven.",
  },
  {
    title: "Strategic partnership",
    body: "Working alongside qualified specialists and licensed providers, with appropriate professional oversight wherever it is required.",
  },
  {
    title: "Secure infrastructure",
    body: "Treating cybersecurity, privacy, and data protection as foundations rather than features.",
  },
  {
    title: "Transparency",
    body: "Plain language about what GLOBAL does, what it does not do, and what remains in development.",
  },
  {
    title: "Long-term value creation",
    body: "Favoring durable relationships and lasting outcomes over short-term activity.",
  },
];

export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2 id="philosophy-heading" className="text-headline mt-6 text-ink">
              Access Is Built on Trust.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-14">
            <blockquote data-reveal className="border-l border-gold-ink/60 pl-6 sm:pl-8">
              <p className="serif-accent text-[1.75rem] leading-[1.2] text-ink sm:text-4xl">
                “We seek to understand risk before pursuing opportunity.”
              </p>
            </blockquote>
            <div className="text-lede mt-10 space-y-5 text-ink-soft">
              <p>
                Our approach is deliberately risk-first. Before we extend a relationship, make an
                introduction, or explore a new market or technology, we ask what could go wrong —
                and who is best placed to address it.
              </p>
              <p>
                That discipline is what allows ambition to last. It is how we intend to earn the
                confidence of the families, institutions, founders, and partners we work with.
              </p>
            </div>
          </div>
        </div>
        <FocusGrid items={principles} className="mt-20 lg:mt-28" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Connect */

export function ConnectSection() {
  const routes = [
    {
      icon: Sparkles,
      title: "Explore Experiences",
      body: "Learn about curated gatherings, including our planned flagship in San Antonio, and how to inquire about taking part.",
      href: "/invitation/experiences",
      cta: "Explore Experiences",
    },
    {
      icon: Handshake,
      title: "Build a Partnership",
      body: "Explore strategic collaboration with GLOBAL or one of its initiatives, including event partnerships.",
      href: "/contact?topic=partnership",
      cta: "Start a conversation",
    },
    {
      icon: Compass,
      title: "Connect With GLOBAL",
      body: "Start a conversation about your interests or an opportunity, and we will point you in the right direction.",
      href: "/contact",
      cta: "Connect With GLOBAL",
    },
  ];
  return (
    <section aria-labelledby="connect-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="connect-heading"
          eyebrow="Connect"
          title="Find Your Place in GLOBAL."
          intro={
            <p>
              Whether you are a founder, an investor, an institution, or a potential partner, there
              is a considered way in.
            </p>
          }
        />
        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {routes.map(({ icon: Icon, ...route }) => (
            <li key={route.title} data-reveal>
              <Link
                href={route.href}
                className="group flex h-full flex-col rounded-sm border border-navy/12 bg-ivory p-8 transition-[background-color,border-color,box-shadow] duration-500 hover:border-navy/25 hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(16,30,48,0.35)] sm:p-10"
              >
                <Icon aria-hidden="true" className="size-7 text-gold-ink" strokeWidth={1.25} />
                <h3 className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                  {route.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{route.body}</p>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  {route.cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
