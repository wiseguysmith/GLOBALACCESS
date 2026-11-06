export type InitiativeId = "invitation" | "south" | "digital" | "capital" | "forum";

export interface InitiativeTheme {
  /** Accent used on dark (navy) surfaces. */
  accent: string;
  /** Accessible accent for text on light (ivory) surfaces. */
  accentInk: string;
  /** Short descriptor of the page identity, used internally. */
  mood: string;
}

export interface Initiative {
  id: InitiativeId;
  /** Full public name, e.g. "Global Invitation". */
  name: string;
  /** Short name used in navigation. */
  navLabel: string;
  /** Abbreviation where one is used publicly (GSA, GDA, GCN). */
  abbreviation?: string;
  /** Short label shown above the name on cards. */
  kicker: string;
  /** Positioning line. */
  tagline: string;
  /** One-sentence summary for cards and metadata. */
  summary: string;
  /** Slightly longer description for ecosystem overviews. */
  description: string;
  /** Role the initiative plays inside the GLOBAL ecosystem. */
  role: string;
  href: string;
  image: ImageAsset;
  theme: InitiativeTheme;
  /** Index number displayed in editorial layouts. */
  index: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** Optional photographer credit for licensed imagery. */
  credit?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export type EventVisibility = "public" | "invitation-only";
export type EventStatus =
  | "announced"
  | "requests-open"
  | "waitlist"
  | "closed"
  | "concluded";

/**
 * "verified" content is approved for publication.
 * "sample" content renders only in development and is always labelled.
 */
export type ContentVerification = "verified" | "sample";

export interface EventAgendaBlock {
  label: string;
  title: string;
  /** One-line description used in event cards. */
  summary?: string;
  items: string[];
  /** Optional in-page or external link for more detail. */
  link?: { label: string; href: string };
}

/** A golf tournament held as part of an event. */
export interface GolfTournament {
  name: string;
  /** Short label, e.g. "Day One · Golf Tournament". */
  eyebrow: string;
  intro: string;
  facts: { label: string; value: string; note?: string }[];
  /** How the format works, step by step. */
  format: { name: string; steps: { title: string; body: string }[]; scoring: string };
  /** Why golf — the purpose of the day. */
  rationale: string;
  dayFlow: { title: string; body: string }[];
  features: { title: string; body: string }[];
  eligibility: string[];
  /** Details intentionally not yet published. */
  toBeAnnounced: string[];
  images: { primary: ImageAsset; secondary: ImageAsset };
}

export interface GlobalEvent {
  slug: string;
  title: string;
  /** Short series or format label, e.g. "Flagship Gathering". */
  format: string;
  location: string;
  venue?: string;
  /** Human-readable date. Use only confirmed information. */
  dateLabel: string;
  /** ISO date (YYYY-MM-DD) once the exact date is confirmed. Enables Event structured data. */
  startDate?: string;
  endDate?: string;
  summary: string;
  description: string[];
  image: ImageAsset;
  visibility: EventVisibility;
  status: EventStatus;
  verification: ContentVerification;
  cta: { label: string; href: string };
  tagline?: string;
  highlights?: { label: string; value: string; note?: string }[];
  agenda?: EventAgendaBlock[];
  golf?: GolfTournament;
  themes?: string[];
  /** Themes for limited-access private salons. */
  salonThemes?: string[];
  audience?: string[];
  partnerTiers?: string[];
  notes?: string[];
}

export interface ForumArticle {
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  /** ISO date of publication. */
  publishedAt: string;
  readingMinutes: number;
  verification: ContentVerification;
  body: { type: "p" | "h2" | "quote"; text: string }[];
}
