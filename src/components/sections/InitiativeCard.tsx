import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        "group relative isolate flex flex-col bg-ivory text-ink",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", feature ? "h-60 sm:h-80" : "h-48 sm:h-56")}>
        <Image
          src={initiative.image.src}
          alt=""
          fill
          quality={75}
          sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover saturate-[.85]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ivory via-ivory/0 via-45% to-transparent" />
      </div>

      <div className="z-10 -mt-5 flex-1 border-b border-navy/15 px-1 pb-7 sm:px-3">
        <p className="eyebrow mb-3 text-gold-ink">
          {initiative.kicker}
        </p>
        <Heading className={cn("flex items-start justify-between gap-3 font-display font-medium tracking-[-0.025em]", feature ? "text-3xl sm:text-[2.6rem] sm:leading-[1.05]" : "text-2xl sm:text-[1.75rem]")}>
          <Link
            href={initiative.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {initiative.name}
          </Link>
          <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
        </Heading>
        <p className={cn("serif-accent mt-3 text-ink", feature ? "text-xl sm:text-2xl" : "text-lg")}>
          {initiative.tagline}
        </p>
        <p className={cn("mt-4 leading-relaxed text-slate", feature ? "max-w-xl" : "max-w-md text-[0.95rem]")}>
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
