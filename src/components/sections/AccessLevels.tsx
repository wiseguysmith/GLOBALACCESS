import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accessLevels } from "@/content/invitation";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Discover / Connect / Private Access — three ways of engaging with GLOBAL.
 * Presented as concentric circles of increasing intimacy, explicitly not
 * as membership tiers.
 */
export function AccessLevels({
  headingId = "access-heading",
  eyebrow = "Ways to engage",
  surface = "navy",
}: {
  headingId?: string;
  eyebrow?: string;
  /** Use "midnight" when the preceding section is also navy. */
  surface?: "navy" | "midnight";
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={`surface-dark relative isolate overflow-hidden py-24 text-white sm:py-32 lg:py-40 ${surface === "midnight" ? "border-t border-white/10 bg-midnight" : "bg-navy"}`}
    >
      <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
      <div className="container-x">
        <SectionHeading
          id={headingId}
          tone="dark"
          eyebrow={eyebrow}
          title={
            <>
              Discover. Connect. <span className="serif-accent text-gold">Private Access.</span>
            </>
          }
          intro={
            <p>
              There are different ways to engage with GLOBAL, from open exploration to invitations
              to private gatherings. They are ways of engaging, not membership tiers.
            </p>
          }
        />

        <ol className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {accessLevels.map((level, i) => (
            <li
              key={level.name}
              data-reveal
              className="group relative flex flex-col overflow-hidden rounded-sm border border-white/15 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-gold/40 sm:p-10"
            >
              {/* Concentric rings: one ring per level of intimacy */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 120"
                className="h-20 w-20 text-gold transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-105"
              >
                {[54, 36, 18].map((r, ring) => (
                  <circle
                    key={r}
                    cx="60"
                    cy="60"
                    r={r}
                    fill={ring === i ? "currentColor" : "none"}
                    fillOpacity={ring === i ? 0.16 : 0}
                    stroke="currentColor"
                    strokeOpacity={ring === i ? 0.95 : 0.3}
                    strokeWidth="1.2"
                  />
                ))}
                <circle cx="60" cy="60" r="3" fill="currentColor" />
              </svg>
              <p className="eyebrow mt-8 text-gold">
                {String(i + 1).padStart(2, "0")} · {level.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.025em]">{level.name}</h3>
              <p className="mt-4 leading-relaxed text-mist">{level.body}</p>
              <ul className="mt-6 space-y-2 border-t border-white/15 pt-6">
                {level.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] text-white/80">
                    <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={level.cta.href}
                className="mt-auto inline-flex min-h-11 items-center gap-2 pt-8 text-sm font-medium text-white hover:text-gold-soft"
              >
                {level.cta.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/60">
          Private access is extended individually and is never automatic. Taking part in GLOBAL
          experiences does not imply access to investments or financial products.
        </p>
      </div>
    </section>
  );
}
