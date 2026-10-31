import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { initiatives } from "@/config/initiatives";
import { formatDate, getArticle, getArticles } from "@/content/forum";
import { CompactHero } from "@/components/sections/CompactHero";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/forum/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} — Global Forum`,
    description: article.dek,
    path: `/forum/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: PageProps<"/forum/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const accent = initiatives.forum.theme.accentInk;
  const others = getArticles().filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <CompactHero
        eyebrow={`Global Forum · ${article.category}`}
        breadcrumbs={[
          { label: "Global Forum", href: "/forum" },
          { label: article.title },
        ]}
        title={<span className="serif-accent">{article.title}</span>}
        lede={<p>{article.dek}</p>}
      >
        <p className="mt-8 text-sm text-white/65">
          {article.author} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> ·{" "}
          {article.readingMinutes} min read
        </p>
      </CompactHero>

      <article className="bg-ivory py-16 sm:py-24">
        <div className="container-x">
          <div className="prose-global mx-auto max-w-[42rem]">
            {article.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="my-12 border-l-2 pl-6 font-serif text-[1.65rem] leading-snug text-ink italic"
                    style={{ borderColor: accent }}
                  >
                    {block.text}
                  </blockquote>
                );
              return (
                <p key={i} className={i === 0 ? "text-[1.2rem] leading-relaxed text-ink" : undefined}>
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mx-auto mt-16 flex max-w-[42rem] flex-col gap-6 border-t border-navy/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/forum" className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
              All perspectives
            </Link>
            <ButtonLink href="/contact?topic=forum" variant="outline-light">
              Respond or contribute
            </ButtonLink>
          </div>
        </div>
      </article>

      {others.length ? (
        <section aria-labelledby="more-heading" className="bg-paper py-20 sm:py-28">
          <div className="container-x">
            <h2 id="more-heading" className="eyebrow" style={{ color: accent }}>
              More from Global Forum
            </h2>
            <ul className="mt-8 grid gap-x-10 md:grid-cols-3">
              {others.map((a) => (
                <li key={a.slug} className="group relative border-t border-navy/15 py-8">
                  <h3 className="font-serif text-2xl leading-snug text-ink italic">
                    <Link href={`/forum/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{a.dek}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.dek,
            datePublished: article.publishedAt,
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
            mainEntityOfPage: new URL(`/forum/${article.slug}`, siteConfig.url).toString(),
          },
          breadcrumbJsonLd([
            { name: "GLOBAL", path: "/" },
            { name: "Global Forum", path: "/forum" },
            { name: article.title, path: `/forum/${article.slug}` },
          ]),
        ]}
      />
    </>
  );
}
