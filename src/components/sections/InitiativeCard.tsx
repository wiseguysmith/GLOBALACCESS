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
  size?: "feature" | "standard";
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const feature = size === "feature";
  return (
    <article
      data-reveal
      className={cn(
        "surface-dark group relative isolate flex flex-col justify-end overflow-hidden rounded-sm bg-navy text-white",
        feature ? "min-h-[30rem] sm:min-h-[36rem]" : "min-h-[26rem] sm:min-h-[28rem]",
        className,
      )}
      style={{ "--card-accent": initiative.theme.accent } as CSSProperties}
    >
      <Image
        src={initiative.image.src}
        alt=""
        fill
        quality={70}
        sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/70 to-navy/10 transition-opacity duration-700 group-hover:opacity-95"
      />

      <div className="flex items-center justify-between px-7 pt-7 sm:px-9 sm:pt-9">
        <span className="font-display text-sm tabular-nums text-white/70">{initiative.index}</span>
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-[background-color,border-color,color] duration-500 group-hover:border-[var(--card-accent)] group-hover:bg-[var(--card-accent)] group-hover:text-navy"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-auto px-7 pb-8 sm:px-9 sm:pb-10">
        <span aria-hidden="true" className="mb-6 block h-px w-12 bg-[var(--card-accent)]" />
        <p className="eyebrow mb-3 text-[var(--card-accent)]">
          {initiative.kicker}
        </p>
        <Heading className={cn("font-display font-medium tracking-[-0.025em]", feature ? "text-3xl sm:text-[2.6rem] sm:leading-[1.05]" : "text-2xl sm:text-[1.75rem]")}>
          <Link
            href={initiative.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {initiative.name}
          </Link>
        </Heading>
        <p className={cn("serif-accent mt-3 text-white/90", feature ? "text-xl sm:text-2xl" : "text-lg")}>
          {initiative.tagline}
        </p>
        <p className={cn("mt-4 leading-relaxed text-white/72", feature ? "max-w-xl" : "max-w-md text-[0.95rem]")}>
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
