"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { InitiativeId } from "@/types";
import { ecosystemLinks, initiativeList, initiatives } from "@/config/initiatives";
import { cn } from "@/lib/cn";

/** Node positions on a pentagon around the GLOBAL center (percent of the square). */
const positions: Record<InitiativeId, { x: number; y: number }> = (() => {
  const order: InitiativeId[] = ["invitation", "south", "digital", "capital", "forum"];
  const out = {} as Record<InitiativeId, { x: number; y: number }>;
  order.forEach((id, i) => {
    const angle = (-90 + i * 72) * (Math.PI / 180);
    out[id] = { x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
  });
  return out;
})();

/**
 * Interactive view of how the five initiatives complement one another.
 * Selecting an initiative highlights its relationships with the others.
 * Deliberately shows a network, not a sequence: relationships can begin
 * anywhere in the ecosystem.
 */
export function EcosystemMap() {
  const [active, setActive] = useState<InitiativeId>("invitation");
  const current = initiatives[active];
  const detail = ecosystemLinks[active];
  const ids = initiativeList.map((i) => i.id);

  return (
    <div className="surface-dark grid overflow-hidden rounded-sm bg-navy text-white lg:grid-cols-12">
      {/* Diagram */}
      <div className="relative p-6 sm:p-10 lg:col-span-7 lg:flex lg:flex-col">
        <p className="eyebrow text-gold">Select an initiative</p>
        <div className="relative mx-auto mt-6 aspect-square w-full max-w-[34rem] lg:my-auto">
          <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full">
            {/* Orbit */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" />
            {/* All relationships, faint */}
            {ids.flatMap((a, i) =>
              ids.slice(i + 1).map((b) => {
                const highlighted = a === active || b === active;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={positions[a].x}
                    y1={positions[a].y}
                    x2={positions[b].x}
                    y2={positions[b].y}
                    stroke={highlighted ? current.theme.accent : "rgba(255,255,255,0.1)"}
                    strokeOpacity={highlighted ? 0.75 : 1}
                    strokeWidth={highlighted ? 0.45 : 0.2}
                    style={{ transition: "stroke 400ms, stroke-width 400ms, stroke-opacity 400ms" }}
                  />
                );
              }),
            )}
            {/* Spokes to the center */}
            {ids.map((id) => (
              <line
                key={`spoke-${id}`}
                x1="50"
                y1="50"
                x2={positions[id].x}
                y2={positions[id].y}
                stroke="rgba(199,166,109,0.25)"
                strokeWidth="0.2"
                strokeDasharray="0.8 0.8"
              />
            ))}
            {/* Center mark */}
            <circle cx="47.6" cy="50" r="4.6" fill="none" stroke="#F7F7F4" strokeWidth="0.35" />
            <circle cx="52.4" cy="50" r="4.6" fill="none" stroke="#F7F7F4" strokeWidth="0.35" />
            <path d="M50 46a4.6 4.6 0 0 1 0 8 4.6 4.6 0 0 1 0-8Z" fill="#C7A66D" />
          </svg>
          <span className="pointer-events-none absolute top-[57.5%] left-1/2 -translate-x-1/2 font-display text-[0.65rem] font-semibold tracking-[0.3em] text-white/80">
            GLOBAL
          </span>

          {initiativeList.map((item) => {
            const pos = positions[item.id];
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                aria-controls="ecosystem-detail"
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-[0.72rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 sm:px-4 sm:text-sm",
                  selected
                    ? "border-transparent text-navy shadow-[0_0_0_6px_rgba(255,255,255,0.06)]"
                    : "border-white/25 bg-navy text-white/85 hover:border-white/60",
                )}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  backgroundColor: selected ? item.theme.accent : undefined,
                }}
              >
                {item.navLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div
        id="ecosystem-detail"
        aria-live="polite"
        className="border-t border-white/10 p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l"
      >
        <p className="eyebrow" style={{ color: current.theme.accent }}>
          {current.index} · {current.kicker}
        </p>
        <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.025em]">{current.name}</h3>
        <p className="serif-accent mt-2 text-xl" style={{ color: current.theme.accent }}>
          {detail.verb}.
        </p>
        <p className="mt-4 leading-relaxed text-mist">{current.description}</p>

        <p className="eyebrow mt-8 text-white/60">How it complements the others</p>
        <ul className="mt-4 space-y-4">
          {detail.links.map((link) => (
            <li key={link.to} className="border-t border-white/10 pt-4">
              <p className="text-sm font-medium" style={{ color: initiatives[link.to].theme.accent }}>
                {initiatives[link.to].name}
              </p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-white/80">{link.text}</p>
            </li>
          ))}
        </ul>

        <Link
          href={current.href}
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white hover:text-gold-soft"
        >
          Explore {current.name}
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
