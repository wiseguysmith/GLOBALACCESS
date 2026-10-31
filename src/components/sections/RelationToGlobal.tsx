import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { InitiativeId } from "@/types";
import { initiativeList, initiatives } from "@/config/initiatives";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Shows how an initiative sits within the GLOBAL ecosystem,
 * with the current initiative highlighted among its siblings.
 */
export function RelationToGlobal({
  current,
  children,
}: {
  current: InitiativeId;
  children: ReactNode;
}) {
  const self = initiatives[current];
  return (
    <section
      aria-labelledby={`relation-${current}`}
      className="bg-paper py-24 sm:py-32"
      style={{ "--rel-accent": self.theme.accentInk } as CSSProperties}
    >
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <Eyebrow accent={self.theme.accentInk}>Within the ecosystem</Eyebrow>
          <h2 id={`relation-${current}`} className="text-headline mt-6 text-ink">
            How {self.abbreviation ?? self.name} relates to GLOBAL
          </h2>
          <div className="text-lede mt-7 space-y-5 text-ink-soft">{children}</div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-4 text-slate">GLOBAL — five connected initiatives</p>
          <ul className="border-t border-navy/15">
            {initiativeList.map((item) => {
              const isSelf = item.id === current;
              return (
                <li key={item.id} className="border-b border-navy/15">
                  <Link
                    href={item.href}
                    aria-current={isSelf ? "page" : undefined}
                    className={cn(
                      "group grid grid-cols-[2.5rem_1fr] gap-x-4 py-5 transition-colors sm:grid-cols-[3rem_1fr]",
                      isSelf ? "" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "pt-1 font-display text-sm tabular-nums",
                        isSelf ? "text-[var(--rel-accent)]" : "text-slate",
                      )}
                    >
                      {item.index}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-lg font-medium tracking-[-0.015em]",
                          isSelf ? "text-ink" : "text-ink-soft group-hover:text-ink",
                        )}
                      >
                        {item.name}
                        {isSelf ? (
                          <span className="eyebrow ml-3 align-middle text-[0.62rem] text-[var(--rel-accent)]">
                            You are here
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-[0.92rem] leading-relaxed text-slate">
                        {item.role}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
