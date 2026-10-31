import type { GlobalEvent } from "@/types";

/**
 * Event registry for Global Invitation experiences.
 *
 * Publishing rule: only events with `verification: "verified"` render in
 * production. "sample" entries exist to exercise the layout in development
 * and are always visibly labelled. Never add dates, venues, speakers, or
 * attendance figures that have not been confirmed.
 */
const events: GlobalEvent[] = [
  {
    slug: "the-global-invitation-san-antonio-2027",
    title: "The Global Invitation",
    format: "Flagship Gathering",
    tagline: "Private markets. Modern financial rails. Real relationships.",
    location: "San Antonio, Texas",
    venue: "Golf day at Briggs Ranch Golf Club",
    dateLabel: "February 2027 · Exact dates to be announced",
    summary:
      "A two-day, invitation-only gathering bringing together private markets, modern financial infrastructure, and the relationships that connect them — spanning traditional finance, FinTech, and decentralized finance.",
    description: [
      "The Global Invitation is the flagship gathering of the Global Invitation community: two days in San Antonio designed around considered conversation rather than crowded exhibition halls.",
      "The first day takes place on the course, with curated pairings and an evening reception. The second day convenes a capital summit focused on private markets and the financial infrastructure now taking shape around them, followed by small, private investor salons.",
      "Participation is curated and by invitation. The program, speakers, and summit-day venue will be announced as they are confirmed.",
    ],
    image: {
      src: "/images/event-golf.webp",
      alt: "Morning light over the fairways and bunkers of a tree-lined golf course",
    },
    visibility: "invitation-only",
    status: "announced",
    verification: "verified",
    cta: {
      label: "Request an Invitation",
      href: "/invitation/apply?event=The%20Global%20Invitation%20%E2%80%94%20San%20Antonio%202027",
    },
    highlights: [
      { label: "Format", value: "Two days", note: "Golf, then summit" },
      { label: "Participants", value: "~150", note: "Planned, curated capacity" },
      { label: "Golf field", value: "40 teams", note: "80 players, curated pairings" },
      { label: "Access", value: "Invitation only", note: "Requests reviewed individually" },
    ],
    agenda: [
      {
        label: "Day One",
        title: "The Invitational",
        items: [
          "VIP welcome",
          "Investor golf experience at Briggs Ranch Golf Club",
          "Curated pairings, with investor and executive networking on the course",
          "Premium hospitality and on-course partner experiences",
          "Athlete participation and a charitable component",
          "Evening awards and private reception",
        ],
      },
      {
        label: "Day Two",
        title: "The Capital Summit",
        items: [
          "Capital summit sessions",
          "Investment and innovation showcase",
          "Private investor dinners and salons (limited access)",
        ],
      },
    ],
    themes: [
      "Private markets",
      "Tokenization",
      "Stablecoins",
      "Digital wealth",
      "Real-world assets",
      "Custody and compliance",
      "Financial infrastructure",
    ],
    salonThemes: [
      "Private credit",
      "Tokenized assets",
      "Family office strategy",
      "Stablecoin infrastructure",
      "Digital wealth",
      "Real estate capital",
      "Latin American investment landscape",
    ],
    audience: [
      "Family offices",
      "Accredited and high-net-worth investors",
      "Asset managers",
      "Wealth advisors",
      "Financial institutions",
      "FinTech leaders",
      "Digital asset infrastructure firms",
      "Founders",
      "Athletes",
    ],
    partnerTiers: [
      "Title Partner",
      "Presenting Partner",
      "Capital Markets Partner",
      "Digital Infrastructure Partner",
      "Custody Partner",
      "Golf Partner",
      "Hospitality Partner",
      "Experience Partner",
    ],
    notes: [
      "Speakers and participants will be announced as they are confirmed.",
      "Salon access is limited and is not included automatically with summit attendance.",
      "Dates, the summit-day venue, and program details are subject to confirmation.",
      "Participation does not constitute an offer of, or solicitation for, any security or investment.",
    ],
  },

  /* ---------------------------------------------------- Development samples */
  {
    slug: "sample-leadership-dinner",
    title: "Sample — Private Leadership Dinner",
    format: "Private Dinner",
    location: "Location to be confirmed",
    dateLabel: "Date to be confirmed",
    summary:
      "Sample content for layout review only. Illustrates how an intimate, invitation-only dinner would appear in the experiences program.",
    description: ["Sample content for layout review only. This is not a real event."],
    image: { src: "/images/event-dining.webp", alt: "A set dinner table in a softly lit dining room" },
    visibility: "invitation-only",
    status: "announced",
    verification: "sample",
    cta: { label: "Inquire", href: "/contact?topic=membership" },
  },
  {
    slug: "sample-public-forum",
    title: "Sample — Open Forum Session",
    format: "Leadership Forum",
    location: "Location to be confirmed",
    dateLabel: "Date to be confirmed",
    summary:
      "Sample content for layout review only. Illustrates how a public, registration-based forum session would appear alongside invitation-only experiences.",
    description: ["Sample content for layout review only. This is not a real event."],
    image: { src: "/images/conference.webp", alt: "An audience seated in a darkened conference hall" },
    visibility: "public",
    status: "requests-open",
    verification: "sample",
    cta: { label: "Register interest", href: "/contact?topic=general" },
  },
];

const showSamples = process.env.NODE_ENV !== "production";

/** Events approved for display in the current environment. */
export function getEvents(): GlobalEvent[] {
  return events.filter((e) => e.verification === "verified" || showSamples);
}

export function getEvent(slug: string): GlobalEvent | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getFlagshipEvent(): GlobalEvent | undefined {
  return getEvent("the-global-invitation-san-antonio-2027");
}

export const visibilityLabel: Record<GlobalEvent["visibility"], string> = {
  public: "Public",
  "invitation-only": "Invitation only",
};

export const statusLabel: Record<GlobalEvent["status"], string> = {
  announced: "Announced",
  "requests-open": "Requests open",
  waitlist: "Waitlist",
  closed: "Closed",
  concluded: "Concluded",
};
