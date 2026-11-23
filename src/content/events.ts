import type { GlobalEvent } from "@/types";
import { summitPillars } from "./summit";

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
    title: "GLOBAL Invitational — San Antonio 2027",
    format: "Flagship Gathering",
    tagline: "Where Capital Meets Opportunity",
    location: "San Antonio, Texas",
    venue: "Golf day at Briggs Ranch Golf Club",
    dateLabel: "February 3–4, 2027",
    startDate: "2027-02-03",
    endDate: "2027-02-04",
    summary:
      "Golf at Briggs Ranch on February 3. The Future in Finance Summit in San Antonio on February 4. A $10,000 two-person golf team includes two Summit admissions upon full payment. Team participation is subject to review and acceptance.",
    description: [
      "The Global Invitation is the flagship gathering of the Global Invitation community: two days in San Antonio designed around considered conversation rather than crowded exhibition halls.",
      "Day one brings a selective field of 40 two-person teams to Briggs Ranch for competitive golf. Day two is planned around finance keynotes, panels, educational workshops, a marketplace, and an evening reception. Session timings, speakers, and the Summit venue remain subject to confirmation.",
      "Participation is curated and by invitation. The program, speakers, and summit-day venue will be announced as they are confirmed.",
    ],
    image: {
      src: "/images/briggs-aerial.webp",
      alt: "Golden-hour aerial view of the course and casitas at Briggs Ranch Golf Club",
    },
    visibility: "invitation-only",
    status: "announced",
    verification: "verified",
    cta: {
      label: "Explore San Antonio 2027",
      href: "/invitation/experiences/the-global-invitation-san-antonio-2027",
    },
    highlights: [
      { label: "Format", value: "Two days", note: "Golf, then summit" },
      { label: "Team price", value: "$10,000", note: "Two golfers · both days" },
      { label: "Golf field", value: "40 teams", note: "80 players, curated pairings" },
      { label: "Registration", value: "Subject to approval", note: "Apply for a team place" },
    ],
    agenda: [
      {
        label: "Day One",
        title: "The Invitational",
        items: [
          "18-hole golf at Briggs Ranch Golf Club for up to 40 two-person teams",
          "Team application review before acceptance and payment",
          "Food, beverages, and on-course hospitality subject to final contracts",
          "Competition format and official rules to be announced",
          "Charitable program subject to approved funding and rules",
        ],
      },
      {
        label: "Day Two",
        title: "Future in Finance Summit — proposed program",
        items: [
          "Keynotes and panels across ten foundational finance topics",
          "Educational workshops, including a proposed DeFi lending session",
          "Marketplace access during planned lunch and networking periods",
          "Separate screened investment presentations, with applicable disclosures",
          "Evening reception planned from 6:30 p.m.; final schedule to follow",
        ],
      },
    ],
    themes: summitPillars.map(pillar => pillar.title),
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
      "The Summit venue, speakers, session timings, and program details remain subject to confirmation.",
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
