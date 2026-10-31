import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Lock, MapPin, Users } from "lucide-react";
import type { GlobalEvent } from "@/types";
import { statusLabel, visibilityLabel } from "@/content/events";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

export function eventHref(event: GlobalEvent) {
  return `/invitation/experiences/${event.slug}`;
}

export function EventBadges({ event, tone = "light" }: { event: GlobalEvent; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const pill = cn(
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold tracking-[0.12em] uppercase",
  );
  return (
    <div className="flex flex-wrap gap-2">
      {event.verification === "sample" ? (
        <span className={cn(pill, "border-[#9B2C2C]/40 bg-[#FBF1F1] text-[#7A1F1F]")}>
          Sample content — not a real event
        </span>
      ) : null}
      <span
        className={cn(
          pill,
          dark ? "border-gold/40 text-gold" : "border-gold-ink/30 text-gold-ink",
        )}
      >
        {event.visibility === "invitation-only" ? (
          <Lock aria-hidden="true" className="size-3" strokeWidth={2} />
        ) : (
          <Users aria-hidden="true" className="size-3" strokeWidth={2} />
        )}
        {visibilityLabel[event.visibility]}
      </span>
      <span className={cn(pill, dark ? "border-white/20 text-white/80" : "border-navy/15 text-ink-soft")}>
        {statusLabel[event.status]}
      </span>
    </div>
  );
}

function EventMeta({ event, tone = "light" }: { event: GlobalEvent; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const item = cn("flex items-start gap-2.5 text-[0.92rem]", dark ? "text-white/80" : "text-ink-soft");
  const icon = cn("mt-0.5 size-4 shrink-0", dark ? "text-gold" : "text-gold-ink");
  return (
    <dl className="grid gap-2.5">
      <div className={item}>
        <dt className="sr-only">Location</dt>
        <MapPin aria-hidden="true" className={icon} strokeWidth={1.5} />
        <dd>{event.location}</dd>
      </div>
      <div className={item}>
        <dt className="sr-only">Date</dt>
        <CalendarDays aria-hidden="true" className={icon} strokeWidth={1.5} />
        <dd>{event.dateLabel}</dd>
      </div>
    </dl>
  );
}

/** Large, horizontal presentation for the flagship gathering. */
export function EventFeature({ event }: { event: GlobalEvent }) {
  return (
    <article className="surface-dark grid overflow-hidden rounded-sm bg-navy text-white lg:grid-cols-12" data-reveal>
      <div className="relative min-h-[20rem] sm:min-h-[26rem] lg:col-span-7 lg:min-h-[34rem]">
        <Image
          src={event.image.src}
          alt={event.image.alt}
          fill
          quality={70}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-navy/50" />
      </div>
      <div className="flex flex-col p-8 sm:p-10 lg:col-span-5 lg:p-12">
        <EventBadges event={event} tone="dark" />
        <p className="eyebrow mt-8 text-gold">{event.format}</p>
        <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.025em] sm:text-4xl">
          <Link href={eventHref(event)} className="hover:text-gold-soft">
            {event.title}
          </Link>
        </h3>
        {event.tagline ? <p className="serif-accent mt-3 text-xl text-white/85">{event.tagline}</p> : null}
        <p className="mt-5 leading-relaxed text-mist">{event.summary}</p>
        <div className="mt-8">
          <EventMeta event={event} tone="dark" />
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-10 xs:flex-row xs:flex-wrap">
          <ButtonLink href={eventHref(event)}>View the gathering</ButtonLink>
          <ButtonLink href={event.cta.href} variant="outline-dark">
            {event.cta.label}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

/** Standard event card for the experiences program grid. */
export function EventCard({ event }: { event: GlobalEvent }) {
  const href = event.verification === "verified" ? eventHref(event) : event.cta.href;
  return (
    <article
      data-reveal
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border bg-white",
        event.verification === "sample" ? "border-dashed border-[#9B2C2C]/40" : "border-navy/10",
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image.src}
          alt={event.image.alt}
          fill
          quality={70}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]",
            event.verification === "sample" && "grayscale",
          )}
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <EventBadges event={event} />
        <p className="eyebrow mt-6 text-gold-ink">{event.format}</p>
        <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {event.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{event.summary}</p>
        <div className="mt-6">
          <EventMeta event={event} />
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
          {event.verification === "verified" ? "View details" : event.cta.label}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}
