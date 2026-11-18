import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Users } from "lucide-react";
import { initiativeList, initiatives } from "@/config/initiatives";
import { getFlagshipEvent } from "@/content/events";
import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { InitiativeCard } from "@/components/sections/InitiativeCard";

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

/* --------------------------------------------------------- Our Ecosystem */

export function EcosystemSection() {
  const [invitation, south, digital, capital, forum] = initiativeList;
  return (
    <section aria-labelledby="ecosystem-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
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
              Each GLOBAL initiative has its own focus — experiences, markets, infrastructure,
              capital relationships, and ideas. Together they form a single ecosystem, designed so
              that a relationship formed in one place can find its purpose in another.
            </p>
          }
        />
        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12">
          <InitiativeCard initiative={invitation} size="feature" className="lg:col-span-7" />
          <InitiativeCard initiative={south} size="feature" className="lg:col-span-5" />
          <InitiativeCard initiative={digital} className="lg:col-span-4" />
          <InitiativeCard initiative={capital} className="lg:col-span-4" />
          <InitiativeCard initiative={forum} className="lg:col-span-4" />
        </div>
        <div className="mt-12 flex justify-end">
          <ArrowLink href="/ecosystem" className="text-ink">
            How the ecosystem fits together
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
  },
  {
    from: "Traditional Finance",
    to: "Digital Finance",
    body: "Engaging new financial infrastructure with the governance, discipline, and compliance expectations of established institutions.",
  },
  {
    from: "Physical Assets",
    to: "Digital Infrastructure",
    body: "Exploring how real-world value can be represented, managed, and accessed through responsible digital frameworks.",
  },
  {
    from: "Capital",
    to: "Opportunity",
    body: "Helping the right people find one another through considered introductions — not open marketplaces.",
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
              className="grid gap-6 border-b border-white/15 py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12"
            >
              <p className="flex flex-col items-start font-display text-[1.75rem] leading-tight font-medium tracking-[-0.03em] text-white sm:text-4xl md:flex-row md:items-center lg:col-span-8 xl:text-[2.75rem]">
                <span>{row.from}</span>
                <Connector />
                <span className="serif-accent text-gold">{row.to}</span>
              </p>
              <p className="leading-relaxed text-mist lg:col-span-4">{row.body}</p>
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
    body: "Working alongside qualified specialists, advisors, and licensed providers wherever their expertise and authority are required.",
  },
  {
    title: "Secure infrastructure",
    body: "Treating privacy, data protection, and operational security as foundations rather than features.",
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

/* ------------------------------------------------- Global Invitation feature */

export function InvitationFeatureSection() {
  const invitation = initiatives.invitation;
  const flagship = getFlagshipEvent();
  const pillars = [
    {
      title: "San Antonio 2027",
      body: "February 3–4: Briggs Ranch golf and the Future in Finance Summit.",
      href: "/invitation/experiences/the-global-invitation-san-antonio-2027",
    },
    {
      title: "Experiences",
      body: "Private gatherings, curated events, summits, and meaningful conversations.",
      href: "/invitation/experiences",
    },
    {
      title: "Opportunities",
      body: "Introductions, collaborations, partnerships, and ecosystem access.",
      href: "/invitation/opportunities",
    },
  ];

  return (
    <section
      aria-labelledby="invitation-feature-heading"
      className="surface-dark relative isolate overflow-hidden bg-midnight py-24 text-white sm:py-32 lg:py-40"
    >
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-6" data-reveal="fade">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-[44rem]">
            <Image
              src={invitation.image.src}
              alt={invitation.image.alt}
              fill
              quality={70}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-midnight/70 via-transparent to-transparent" />
            <div aria-hidden="true" className="absolute inset-4 border border-gold/30 sm:inset-6">
              <div className="absolute inset-1.5 border border-gold/15" />
            </div>
          </div>
          {flagship ? (
            <Link
              href={`/invitation/experiences/${flagship.slug}`}
              className="group absolute right-4 -bottom-10 left-4 block rounded-sm border border-white/10 bg-navy/95 p-6 backdrop-blur-sm transition-colors hover:border-gold/50 sm:right-auto sm:left-10 sm:w-[24rem] lg:-right-10 lg:left-auto"
            >
              <p className="eyebrow text-gold">{flagship.format}</p>
              <p className="mt-3 font-display text-xl font-medium text-white">{flagship.title}</p>
              <p className="mt-1 text-sm text-white/70">
                {flagship.location} · February 3–4, 2027
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white">
                View the gathering
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
              </span>
            </Link>
          ) : null}
        </div>

        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-center">
          <Eyebrow tone="dark">Global Invitation</Eyebrow>
          <h2 id="invitation-feature-heading" className="text-headline mt-6 text-white">
            Access Begins With{" "}
            <span className="serif-accent text-gold">Connection.</span>
          </h2>
          <p className="text-lede mt-7 text-mist">
            GLOBAL Invitational is our platform for curated gatherings, experiences, and relationships
            platform — the place where people enter the GLOBAL ecosystem and where the most
            valuable relationships begin.
          </p>

          <ul className="mt-12 border-t border-white/15">
            {pillars.map((pillar, i) => (
              <li key={pillar.title} className="border-b border-white/15">
                <Link
                  href={pillar.href}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6"
                >
                  <span className="pt-1 font-display text-sm text-gold">
                    {["I", "II", "III"][i]}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-medium text-white">
                      {pillar.title}
                    </span>
                    <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-mist">
                      {pillar.body}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1.5 size-5 text-white/40 transition-[color,transform] group-hover:translate-x-1 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href="/invitation/experiences/the-global-invitation-san-antonio-2027" size="lg">
              Explore San Antonio 2027
            </ButtonLink>
            <ButtonLink href="/invitation" variant="outline-dark" size="lg">
              Discover Global Invitation
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Connect */

export function ConnectSection() {
  const routes = [
    {
      icon: Users,
      title: "Explore the Invitational",
      body: "Discover the San Antonio edition and a recurring international series of curated experiences.",
      href: "/invitation",
      cta: "Explore the series",
    },
    {
      icon: Handshake,
      title: "Build a partnership",
      body: "For organizations interested in collaboration, event partnership, or working with a GLOBAL initiative.",
      href: "/contact?topic=partnership",
      cta: "Start a conversation",
    },
    {
      icon: Compass,
      title: "Connect with the ecosystem",
      body: "Not sure where you fit? Tell us what you are working on, and we will point you in the right direction.",
      href: "/contact",
      cta: "Connect with GLOBAL",
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
