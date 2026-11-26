import type { ReactNode } from "react";
import { CompactHero } from "./CompactHero";

/** Shared layout for legal documents. */
export function LegalPage({
  title,
  eyebrow,
  intro,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  intro: ReactNode;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <CompactHero
        eyebrow={eyebrow}
        breadcrumbs={[{ label: "GLOBAL", href: "/" }, { label: title }]}
        title={title}
        lede={intro}
      >
        <p className="mt-6 text-sm text-white/60">{updated}</p>
      </CompactHero>
      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="prose-global">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
