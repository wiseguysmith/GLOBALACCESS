import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getEvents } from "@/content/events";
import { getArticles } from "@/content/forum";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/invitation", priority: 0.9 },
  { path: "/invitation/experiences", priority: 0.8 },
  { path: "/invitation/opportunities", priority: 0.7 },
  { path: "/invitation/inquire/summit", priority: 0.8 },
  { path: "/invitation/inquire/golf", priority: 0.8 },
  { path: "/invitation/inquire/sponsor", priority: 0.6 },
  { path: "/invitation/inquire/vendor", priority: 0.6 },
  { path: "/invitation/inquire/general", priority: 0.6 },
  { path: "/invitation/inquire/future", priority: 0.6 },
  { path: "/about", priority: 0.7 },
  { path: "/ecosystem", priority: 0.7 },
  { path: "/south", priority: 0.7 },
  { path: "/digital", priority: 0.7 },
  { path: "/capital", priority: 0.7 },
  { path: "/forum", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, `${siteConfig.url}/`).toString();
  return [
    ...staticRoutes.map((r) => ({ url: url(r.path), priority: r.priority, changeFrequency: "monthly" as const })),
    ...getEvents()
      .filter((e) => e.verification === "verified")
      .map((e) => ({ url: url(`/invitation/experiences/${e.slug}`), priority: 0.8, changeFrequency: "weekly" as const })),
    ...getArticles()
      .filter((a) => a.verification === "verified")
      .map((a) => ({ url: url(`/forum/${a.slug}`), lastModified: a.publishedAt, priority: 0.6, changeFrequency: "yearly" as const })),
  ];
}
