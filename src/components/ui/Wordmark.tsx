import Image from "next/image";
import { cn } from "@/lib/cn";

export function HeaderWordmark() {
  return (
    <Image
      src="/images/global-access-lockup.png"
      alt=""
      width={1600}
      height={533}
      sizes="(min-width: 640px) 208px, 160px"
      loading="eager"
      className="h-auto w-40 sm:w-52"
    />
  );
}

/**
 * GLOBAL mark: two intersecting rings — two worlds — with the shared
 * space between them picked out in gold.
 */
export function GlobalMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 28"
      aria-hidden="true"
      focusable="false"
      className={cn("h-7 w-10 shrink-0", className)}
    >
      <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="26" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M20 3.6a12 12 0 0 1 0 20.8 12 12 0 0 1 0-20.8Z" fill="#C7A66D" />
    </svg>
  );
}

export function Wordmark({
  className,
  label = "GLOBAL",
  sublabel,
}: {
  className?: string;
  label?: string;
  sublabel?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <GlobalMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.32em]">
          {label}
        </span>
        {sublabel ? (
          <span className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.28em] opacity-70">
            {sublabel}
          </span>
        ) : null}
      </span>
    </span>
  );
}
