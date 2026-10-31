import type { ReactNode } from "react";
import { FileWarning } from "lucide-react";
import { CompactHero } from "./CompactHero";

/** Shared layout for legal documents, with a prominent draft notice. */
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
            <aside className="mb-14 flex gap-4 rounded-sm border border-gold/60 bg-[#FBF7EE] p-6 text-[0.92rem] leading-relaxed text-ink-soft">
              <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-ink" strokeWidth={1.5} />
              <p>
                <span className="font-semibold text-ink">Draft for legal review. </span>
                This document is a working draft prepared for review by qualified legal counsel. It is
                not final and should not be relied upon as a substitute for legal advice. Bracketed
                items must be completed before publication.
              </p>
            </aside>
            <div className="prose-global">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
