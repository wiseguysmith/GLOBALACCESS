import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Closing call-to-action band, optionally over photography. */
export function CtaBand({
  eyebrow,
  title,
  body,
  actions,
  image,
  accent,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  image?: ImageAsset;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-navy text-white">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover opacity-45"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-navy via-navy/85 to-navy/40" />
        </div>
      ) : (
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
      )}
      <div
        className={cn(
          "container-x py-24 sm:py-32 lg:py-40",
          align === "center" && "text-center",
        )}
      >
        <div className={cn("max-w-3xl", align === "center" && "mx-auto")} data-reveal>
          {eyebrow ? (
            <Eyebrow
              tone="dark"
              accent={accent}
              className={cn("mb-7", align === "center" && "justify-center")}
            >
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h2 className="text-headline text-white">{title}</h2>
          {body ? <div className="text-lede mt-7 max-w-2xl text-white/75 [text-align:inherit]">{body}</div> : null}
          <div
            className={cn(
              "mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap",
              align === "center" && "xs:justify-center",
            )}
          >
            {actions}
          </div>
        </div>
      </div>
    </section>
  );
}
