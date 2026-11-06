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
    venue: "Briggs Ranch Golf Club (golf tournament)",
    dateLabel: "February 3–4, 2027 · Subject to confirmation",
    summary:
      "A two-day, invitation-only gathering in San Antonio: The Global Invitational, a two-person scramble golf tournament at Briggs Ranch Golf Club, followed by a capital summit on private markets and modern financial infrastructure.",
    description: [
      "The Global Invitation is the flagship gathering of the Global Invitation community: two days in San Antonio designed around considered conversation rather than crowded exhibition halls.",
      "Day One is The Global Invitational, a two-person scramble golf tournament at Briggs Ranch Golf Club. Forty teams play with curated pairings, and the day closes with an awards ceremony and private reception. Day Two convenes a capital summit on private markets and the financial infrastructure taking shape around them, followed by small, private investor salons.",
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
      { label: "Format", value: "Two days", note: "Golf tournament, then summit" },
      { label: "Participants", value: "~150", note: "Planned, curated capacity" },
      { label: "Golf tournament", value: "40 teams", note: "Two-person scramble · 80 players" },
      { label: "Access", value: "Invitation only", note: "Requests reviewed individually" },
    ],
    agenda: [
      {
        label: "Day One",
        title: "The Global Invitational",
        summary: "Two-person scramble golf tournament at Briggs Ranch Golf Club · 40 teams, 80 players",
        items: [
          "VIP welcome and player check-in",
          "Two-person scramble tournament at Briggs Ranch Golf Club",
          "Curated pairings, with investor and executive networking on the course",
          "Premium hospitality and on-course partner experiences",
          "Athlete participation and a charitable component",
          "Evening awards ceremony and private reception",
        ],
        link: { label: "How the tournament works", href: "#golf" },
      },
      {
        label: "Day Two",
        title: "The Capital Summit",
        summary: "Summit sessions, an investment and innovation showcase, and private investor salons",
        items: [
          "Capital summit sessions",
          "Investment and innovation showcase",
          "Private investor dinners and salons (limited access)",
        ],
      },
    ],
    golf: {
      name: "The Global Invitational",
      eyebrow: "Day One · Golf Tournament",
      intro:
        "The Global Invitational is a two-person scramble golf tournament at Briggs Ranch Golf Club in San Antonio. Forty teams of two play side by side, with pairings arranged so every group brings together people worth meeting — investors, executives, strategic partners, private-market leaders, and athletes.",
      facts: [
        { label: "Format", value: "Two-person scramble", note: "One team score per hole" },
        { label: "Field", value: "40 teams", note: "80 players" },
        { label: "Venue", value: "Briggs Ranch Golf Club", note: "San Antonio, Texas" },
        { label: "Who plays", value: "Golfers, by invitation", note: "Requests reviewed individually" },
        { label: "Date", value: "February 3, 2027", note: "Subject to confirmation · tee time to be announced" },
      ],
      format: {
        name: "How a two-person scramble works",
        steps: [
          { title: "Both players tee off", body: "On every hole, each player on the team hits a tee shot." },
          { title: "The team picks the best shot", body: "Partners agree on the better of the two shots." },
          { title: "Both play from that spot", body: "Each player hits the next shot from the chosen position." },
          { title: "Repeat until holed", body: "The process continues until the ball is in the hole, giving one team score for the hole." },
        ],
        scoring:
          "The team with the lowest total score wins. Because partners always play from the better shot, the format keeps the pace steady and both players in the game on every hole.",
      },
      rationale:
        "Golf provides something traditional conferences rarely offer: several uninterrupted hours with the people you came to meet.",
      dayFlow: [
        { title: "Arrival and VIP welcome", body: "Players are welcomed at Briggs Ranch Golf Club ahead of the round." },
        { title: "The tournament", body: "Teams play the two-person scramble, with partner experiences and hospitality along the course." },
        { title: "Scoring and results", body: "Team scores are collected and the leaderboard is finalized." },
        { title: "Awards and private reception", body: "The day closes with the tournament and charity awards, followed by an evening reception." },
      ],
      features: [
        { title: "Curated pairings", body: "Teams and groups are arranged deliberately, so every round becomes a meaningful introduction." },
        { title: "Athlete participation", body: "Athletes join the field, adding a competitive spirit and a memorable shared experience." },
        { title: "On-course partner experiences", body: "Partners host experiences at points around the course during the round." },
        { title: "Premium hospitality", body: "Premium hospitality is part of the day, on and off the course." },
        { title: "Sponsored competition and charity awards", body: "Prizes and recognition are presented at the evening awards ceremony." },
        { title: "Charitable component", body: "The tournament supports a charitable cause, to be announced." },
      ],
      eligibility: [
        "The tournament is for golfers. Places are limited to 80 players and offered by invitation.",
        "Guests who do not play are welcome at the evening reception and on Day Two, the Capital Summit.",
        "Organizations can take part as the Golf Partner or through on-course partner experiences.",
      ],
      toBeAnnounced: [
        "Confirmed date and tee time",
        "Start format and schedule for the day",
        "Charitable beneficiary",
        "Award categories",
      ],
      images: {
        primary: {
          src: "/images/golf-aerial.webp",
          alt: "Aerial view of a fairway lined with trees and sand bunkers",
        },
        secondary: {
          src: "/images/golf-green.webp",
          alt: "A golf ball resting on a green near the flag",
        },
      },
    },
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
      "The planned dates (February 3–4, 2027), the summit-day venue, and program details are subject to confirmation.",
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
    cta: { label: "Inquire", href: "/contact?topic=experiences" },
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
