import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Initiative } from "@/types";
import { cn } from "@/lib/cn";

/**
 * Photographic initiative card. The title carries a stretched link so the
 * whole card is clickable while the accessible name stays concise.
 */
export function InitiativeCard({
  initiative,
  size = "standard",
  className,
  headingLevel = 3,
}: {
  initiative: Initiative;
  /** "compact" keeps five cards at identical proportions in a single row. */
  size?: "feature" | "standard" | "compact";
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const feature = size === "feature";
  const compact = size === "compact";
  return (
    <article
      data-reveal
      className={cn(
        "surface-dark group relative isolate flex flex-col justify-end overflow-hidden rounded-sm bg-navy text-white",
        feature
          ? "min-h-[30rem] sm:min-h-[36rem]"
          : compact
            ? "min-h-[28rem] xl:min-h-[34rem]"
            : "min-h-[26rem] sm:min-h-[28rem]",
        className,
      )}
      style={{ "--card-accent": initiative.theme.accent } as CSSProperties}
    >
      <Image
        src={initiative.image.src}
        alt=""
        fill
        quality={70}
        sizes={
          feature
            ? "(min-width: 1024px) 58vw, 100vw"
            : compact
              ? "(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
        }
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/70 to-navy/10 transition-opacity duration-700 group-hover:opacity-95"
      />

      <div className={cn("flex items-center justify-between px-7 pt-7", compact ? "xl:px-6 xl:pt-6" : "sm:px-9 sm:pt-9")}>
        <span className="font-display text-sm tabular-nums text-white/70">{initiative.index}</span>
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-[background-color,border-color,color] duration-500 group-hover:border-[var(--card-accent)] group-hover:bg-[var(--card-accent)] group-hover:text-navy"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className={cn("mt-auto px-7 pb-8", compact ? "xl:px-6 xl:pb-7" : "sm:px-9 sm:pb-10")}>
        <span
          aria-hidden="true"
          className="mb-6 block h-px w-12 bg-[var(--card-accent)] transition-[width] duration-700 ease-[var(--ease-soft)] group-hover:w-24"
        />
        <p className="eyebrow mb-3 text-[var(--card-accent)]">
          {initiative.kicker}
        </p>
        <Heading
          className={cn(
            "font-display font-medium tracking-[-0.025em]",
            feature
              ? "text-3xl sm:text-[2.6rem] sm:leading-[1.05]"
              : compact
                ? "text-2xl leading-[1.12] xl:min-h-[2.24em] xl:text-[1.45rem]"
                : "text-2xl sm:text-[1.75rem]",
          )}
        >
          <Link
            href={initiative.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {initiative.name}
          </Link>
        </Heading>
        <p className={cn("serif-accent mt-3 text-white/90", feature ? "text-xl sm:text-2xl" : compact ? "text-lg xl:min-h-[2.75em] xl:text-[1.05rem] xl:leading-snug" : "text-lg")}>
          {initiative.tagline}
        </p>
        <p
          className={cn(
            "mt-4 leading-relaxed text-white/75 transition-colors duration-500 group-hover:text-white/90",
            feature ? "max-w-xl" : compact ? "max-w-md text-[0.95rem] xl:line-clamp-6 xl:min-h-[9.75em] xl:text-[0.88rem]" : "max-w-md text-[0.95rem]",
          )}
        >
          {initiative.summary}
        </p>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-sm ring-gold ring-offset-0 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
