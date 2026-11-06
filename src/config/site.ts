import type { NavItem } from "@/types";

function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    // Netlify sets URL to the primary production URL during builds.
    (process.env.CONTEXT === "production" ? process.env.URL : undefined) ||
    "https://globalaccess.live";
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "GLOBAL",
  legalName: "Global Access",
  domain: "globalaccess.live",
  url: resolveSiteUrl(),
  tagline: "Bridging Worlds. Expanding Access.",
  description:
    "GLOBAL is an international ecosystem connecting influential people, capital, markets, and technology through curated relationships, strategic partnerships, and distinctive experiences.",
  locale: "en_US",
  /**
   * Social profiles render in the footer only when supplied.
   * Add verified profile URLs here, e.g. { label: "LinkedIn", href: "https://..." }.
   */
  social: [] as NavItem[],
  /**
   * Public contact email. Leave empty until an inbox is confirmed;
   * the contact page routes visitors to the inquiry form instead.
   */
  contactEmail: "",
} as const;

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Invitation", href: "/invitation" },
  { label: "South Access", href: "/south" },
  { label: "Digital Access", href: "/digital" },
  { label: "Capital Network", href: "/capital" },
  { label: "Forum", href: "/forum" },
];

export const primaryCta: NavItem = { label: "Connect With GLOBAL", href: "/contact" };

export const invitationNav: NavItem[] = [
  { label: "Overview", href: "/invitation" },
  { label: "Experiences", href: "/invitation/experiences" },
  { label: "Participation", href: "/invitation/participation" },
  { label: "Opportunities", href: "/invitation/opportunities" },
  { label: "Apply", href: "/invitation/apply" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Shown in the footer and on initiative pages. Draft wording — subject to legal review. */
export const regulatoryNotice =
  "GLOBAL and its initiatives facilitate relationships, dialogue, and collaboration. Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or financial product, and nothing here constitutes investment, legal, or tax advice. GLOBAL is not a registered broker-dealer, investment adviser, or bank. Participation in GLOBAL experiences or initiatives does not guarantee access to any investment, transaction, or financial product.";
