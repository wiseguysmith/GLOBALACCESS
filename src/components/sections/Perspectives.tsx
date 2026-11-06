import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ForumArticle } from "@/types";
import { formatDate } from "@/content/forum";
import { initiatives } from "@/config/initiatives";

export const perspectiveTopics = [
  "Global markets",
  "International capital",
  "Technology and financial infrastructure",
  "Emerging economies",
  "Strategic partnerships",
  "Global South development",
];

/**
 * Reusable editorial grid for GLOBAL Perspectives.
 * Renders only the articles it is given (approved content), and an
 * understated "forthcoming" state when there are none.
 */
export function PerspectivesGrid({
  articles,
  showTopics = true,
}: {
  articles: ForumArticle[];
  showTopics?: boolean;
}) {
  const accent = initiatives.forum.theme.accentInk;
  const [featured, ...rest] = articles;

  return (
    <div>
      {showTopics ? (
        <ul aria-label="Editorial topics" className="flex flex-wrap gap-2.5">
          {perspectiveTopics.map((t) => (
            <li key={t} className="rounded-full border border-navy/15 bg-white/60 px-4 py-2 text-sm text-ink">
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      {featured ? (
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="group relative lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src="/images/newsprint.webp"
                alt=""
                fill
                quality={70}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover grayscale-[30%] transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
              />
            </div>
            <p className="eyebrow mt-8" style={{ color: accent }}>
              Featured · {featured.category}
            </p>
            <h3 className="mt-3 font-serif text-[2rem] leading-[1.1] tracking-[-0.02em] text-ink italic sm:text-[2.6rem]">
              <Link href={`/forum/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {featured.title}
              </Link>
            </h3>
            <p className="text-lede mt-4 text-ink-soft">{featured.dek}</p>
            <p className="mt-5 text-sm text-slate">
              {featured.author} · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>{" "}
              · {featured.readingMinutes} min read
            </p>
          </article>

          <ul className="border-t border-navy/15 lg:col-span-5">
            {rest.slice(0, 3).map((a) => (
              <li key={a.slug} className="group relative border-b border-navy/15 py-7">
                <p className="eyebrow" style={{ color: accent }}>
                  {a.category}
                </p>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.15] text-ink italic">
                  <Link href={`/forum/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{a.dek}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read · {a.readingMinutes} min
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12 rounded-sm border border-dashed border-navy/20 p-10 text-center">
          <p className="font-serif text-2xl text-ink italic">First editions forthcoming.</p>
          <p className="mt-2 text-ink-soft">
            Research, interviews, and commentary will be published here as they are approved.
          </p>
        </div>
      )}
    </div>
  );
}
