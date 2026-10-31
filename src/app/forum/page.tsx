import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { initiatives } from "@/config/initiatives";
import { formatDate, getArticles } from "@/content/forum";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { RelationToGlobal } from "@/components/sections/RelationToGlobal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const forum = initiatives.forum;

export const metadata = buildMetadata({
  title: "Global Forum — Ideas That Cross Borders",
  description:
    "Global Forum is GLOBAL’s editorial home for perspectives on global markets, financial innovation, technology, development, and international collaboration.",
  path: "/forum",
});

const themes = [
  { title: "Global markets", body: "How capital, trade, and opportunity move between regions — and what shapes those flows." },
  { title: "Financial innovation", body: "New financial infrastructure, examined with the discipline of established institutions." },
  { title: "Technology", body: "Digital infrastructure as it meets real-world assets, institutions, and regulation." },
  { title: "Development", body: "Economic development, infrastructure, and the priorities of emerging markets." },
  { title: "International collaboration", body: "What makes cross-border partnerships succeed — and why they sometimes fail." },
];

const formats = [
  { title: "Perspectives", body: "Considered essays from GLOBAL and invited contributors.", meta: "Publishing now" },
  { title: "Interviews", body: "Conversations with practitioners across markets and sectors.", meta: "In development" },
  { title: "Discussions", body: "Moderated exchanges on questions that deserve more than one view.", meta: "In development" },
  { title: "Event insights", body: "Reflections and takeaways from Global Invitation experiences.", meta: "In development" },
];

export default function ForumPage() {
  const [featured, ...rest] = getArticles();

  return (
    <>
      <PageHero
        eyebrow="Global Forum"
        accent={forum.theme.accent}
        image={forum.image}
        title={
          <>
            Ideas That{" "}
            <span className="serif-accent" style={{ color: forum.theme.accent }}>
              Cross Borders.
            </span>
          </>
        }
        lede={
          <p>
            An editorial home for considered perspectives on global markets, financial innovation,
            technology, development, and international collaboration.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#perspectives" size="lg" icon="none">
              Read the perspectives
            </ButtonLink>
            <ButtonLink href="/contact?topic=forum" variant="outline-dark" size="lg">
              Contribute
            </ButtonLink>
          </>
        }
      />

      <section id="perspectives" aria-labelledby="perspectives-heading" className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-4 border-b border-navy/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow accent={forum.theme.accentInk}>Perspectives</Eyebrow>
              <h2 id="perspectives-heading" className="text-headline mt-5 text-ink">
                Founding perspectives.
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              The ideas that shape how GLOBAL works — the first entries in an ongoing editorial
              program.
            </p>
          </div>

          {featured ? (
            <article className="group relative grid gap-10 border-b border-navy/15 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm lg:col-span-6">
                <Image
                  src="/images/newsprint.webp"
                  alt=""
                  fill
                  quality={70}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale-[30%] transition-transform duration-[1.4s] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="eyebrow" style={{ color: forum.theme.accentInk }}>
                  Featured · {featured.category}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.02em] text-ink italic sm:text-5xl">
                  <Link href={`/forum/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {featured.title}
                  </Link>
                </h3>
                <p className="text-lede mt-5 text-ink-soft">{featured.dek}</p>
                <p className="mt-6 text-sm text-slate">
                  {featured.author} · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> ·{" "}
                  {featured.readingMinutes} min read
                </p>
              </div>
            </article>
          ) : null}

          <ul className="grid gap-x-10 md:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug} data-reveal className="group relative border-b border-navy/15 py-10 md:border-b-0">
                <p className="eyebrow" style={{ color: forum.theme.accentInk }}>
                  {a.category}
                </p>
                <h3 className="mt-4 font-serif text-[1.75rem] leading-[1.15] text-ink italic">
                  <Link href={`/forum/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{a.dek}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read · {a.readingMinutes} min
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="themes-heading" className="bg-paper py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="themes-heading"
            accent={forum.theme.accentInk}
            eyebrow="Editorial themes"
            title="What the Forum covers."
            intro={
              <p>
                Global Forum is intellectually serious by design: careful with claims, generous with
                context, and open to more than one view.
              </p>
            }
          />
          <FocusGrid items={themes} accent={forum.theme.accentInk} className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="formats-heading" className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="formats-heading"
            accent={forum.theme.accentInk}
            eyebrow="Formats"
            title="An editorial foundation, built to grow."
          />
          <FocusGrid items={formats} accent={forum.theme.accentInk} columns={4} className="mt-16" />
        </div>
      </section>

      <RelationToGlobal current="forum">
        <p>
          Global Forum is where the ecosystem thinks out loud. It gives context to the conversations
          held at Global Invitation experiences, and draws on perspectives from Global South Access,
          Global Digital Access, and Global Capital Network.
        </p>
      </RelationToGlobal>

      <CtaBand
        eyebrow="Contribute"
        accent={forum.theme.accent}
        image={{ src: "/images/library.webp", alt: "" }}
        title="Have a perspective worth sharing?"
        body={
          <p>
            We welcome proposals from practitioners, researchers, and leaders with first-hand insight
            into global markets, technology, and development.
          </p>
        }
        actions={
          <ButtonLink href="/contact?topic=forum" size="lg">
            Propose a contribution
          </ButtonLink>
        }
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "GLOBAL", path: "/" }, { name: forum.name, path: "/forum" }])} />
    </>
  );
}
