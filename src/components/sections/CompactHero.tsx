import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "./PageHero";

/** Typographic navy header for utility pages (apply, contact, legal). */
export function CompactHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[36rem] rounded-full border border-gold/15"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-24 -z-10 hidden size-[36rem] rounded-full border border-white/10 lg:block"
      />
      <div className="container-x pt-[calc(var(--header-h)+4.5rem)] pb-16 sm:pb-20">
        <div className="hero-enter max-w-3xl">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-8" /> : null}
          <Eyebrow tone="dark" className="mb-6">
            {eyebrow}
          </Eyebrow>
          <h1 className="text-headline text-white">{title}</h1>
          {lede ? <div className="text-lede mt-6 max-w-2xl text-white/75">{lede}</div> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
