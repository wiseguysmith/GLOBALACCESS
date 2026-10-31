import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path beginning with "/". */
  path: string;
  /** Optional root-relative OG image override; defaults to the initiative image for the path. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Social sharing images live in /public/og (1200×630), one per initiative.
 * Regenerate them with `npm run og` after changing positioning or imagery.
 */
const ogImages: [prefix: string, image: string][] = [
  ["/invitation/experiences/the-global-invitation", "/og/event.jpg"],
  ["/invitation", "/og/invitation.jpg"],
  ["/south", "/og/south.jpg"],
  ["/digital", "/og/digital.jpg"],
  ["/capital", "/og/capital.jpg"],
  ["/forum", "/og/forum.jpg"],
];

export function ogImageFor(path: string): string {
  return ogImages.find(([prefix]) => path.startsWith(prefix))?.[1] ?? "/og/global.jpg";
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

/**
 * Builds consistent metadata for a page: unique title, description,
 * canonical URL, Open Graph, and Twitter card. OG images are generated
 * per route segment via opengraph-image.tsx unless overridden.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const ogImage = image ?? ogImageFor(path);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${siteConfig.name}` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
