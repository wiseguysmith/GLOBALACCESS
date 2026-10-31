import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-[0.04em] text-white/60">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/85">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imagePosition = "center",
  accent,
  actions,
  size = "page",
  breadcrumbs,
  children,
  framed = false,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image: ImageAsset;
  imagePosition?: string;
  /** Initiative accent for the eyebrow; defaults to gold. */
  accent?: string;
  actions?: ReactNode;
  size?: "full" | "page";
  breadcrumbs?: Crumb[];
  /** Additional content anchored to the bottom of the hero. */
  children?: ReactNode;
  /** Adds an inset invitation-card frame. */
  framed?: boolean;
  align?: "left" | "center";
}) {
  return (
    <section
      className={cn(
        "surface-dark relative isolate flex flex-col overflow-hidden bg-navy text-white",
        size === "full" ? "min-h-[max(40rem,100svh)]" : "min-h-[max(34rem,78svh)]",
      )}
      style={{ "--hero-accent": accent ?? "#C7A66D" } as CSSProperties}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          quality={80}
          sizes="100vw"
          className="hero-image object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            align === "center"
              ? "bg-[radial-gradient(ellipse_at_center,rgba(16,30,48,0.55)_0%,rgba(16,30,48,0.82)_70%)]"
              : "bg-linear-to-r from-navy/95 via-navy/75 to-navy/25",
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-navy via-navy/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-navy/70 to-transparent"
        />
      </div>

      {framed ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 top-[calc(var(--header-h)+0.75rem)] border border-gold/25 sm:inset-5 sm:top-[calc(var(--header-h)+1.25rem)]"
        >
          <div className="absolute inset-1.5 border border-gold/10" />
        </div>
      ) : null}

      <div
        className={cn(
          "container-x relative flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+4rem)] pb-14 sm:pb-20 lg:pb-24",
          align === "center" && "items-center text-center",
          framed && "px-8 sm:px-12",
        )}
      >
        <div className={cn("hero-enter max-w-4xl", align === "center" && "mx-auto")}>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-8" /> : null}
          <Eyebrow
            tone="dark"
            accent="var(--hero-accent)"
            className={cn("mb-7", align === "center" && "justify-center")}
          >
            {eyebrow}
          </Eyebrow>
          <h1 className="text-display text-white">{title}</h1>
          {lede ? (
            <div
              className={cn(
                "text-lede mt-8 max-w-2xl text-white/80",
                align === "center" && "mx-auto",
              )}
            >
              {lede}
            </div>
          ) : null}
          {actions ? (
            <div
              className={cn(
                "mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap",
                align === "center" && "xs:justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {children ? <div className="mt-14 w-full sm:mt-20">{children}</div> : null}
      </div>
    </section>
  );
}
