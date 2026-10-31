import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Only the production deploy is indexable; Netlify previews are not.
  const isProductionDeploy = !process.env.CONTEXT || process.env.CONTEXT === "production";
  return {
    rules: isProductionDeploy
      ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
