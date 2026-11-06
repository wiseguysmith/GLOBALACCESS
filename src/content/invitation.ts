import type { ImageAsset } from "@/types";

/**
 * Global Invitation content.
 * Global Invitation is not a membership program: participation happens through
 * curated introductions, event inquiries, and individual invitations.
 */

export const pillars: {
  title: string;
  kicker: string;
  body: string;
  href: string;
  image: ImageAsset;
}[] = [
  {
    title: "Experiences",
    kicker: "Gatherings worth the journey",
    body: "Private dinners, leadership forums, investor gatherings, and international events, designed around meaningful conversation.",
    href: "/invitation/experiences",
    image: {
      src: "/images/event-golf.webp",
      alt: "Morning light over the fairways of a tree-lined golf course",
    },
  },
  {
    title: "Relationships",
    kicker: "Introductions with intent",
    body: "Thoughtful, mutually agreed introductions between people whose experience and ambitions align.",
    href: "/invitation/participation",
    image: {
      src: "/images/restaurant.webp",
      alt: "A quiet, elegantly furnished dining room with dark wood and soft lighting",
    },
  },
  {
    title: "Opportunities",
    kicker: "Where collaboration begins",
    body: "Strategic partnerships, collaborations, and pathways to relevant initiatives across the GLOBAL ecosystem.",
    href: "/invitation/opportunities",
    image: {
      src: "/images/boardroom.webp",
      alt: "A bright, modern meeting room with a long table and floor-to-ceiling windows",
    },
  },
];

export const audiences = [
  {
    title: "Entrepreneurs and founders",
    body: "Building companies with international ambition and a long-term outlook.",
  },
  {
    title: "Institutional representatives",
    body: "From financial institutions, development organizations, and public–private initiatives.",
  },
  {
    title: "Investors and family offices",
    body: "Seeking considered relationships and perspective across markets and generations.",
  },
  {
    title: "Technology innovators",
    body: "Shaping financial technology, digital infrastructure, and the systems behind them.",
  },
  {
    title: "Industry leaders",
    body: "Executives and operators with deep experience in their sectors and regions.",
  },
  {
    title: "Strategic partners",
    body: "Organizations aligned with the ecosystem’s mission, values, and standards.",
  },
];

/** How participation works — invitation-based, not a membership process. */
export const journeySteps = [
  {
    title: "Discover",
    body: "Learn about GLOBAL, its initiatives, and the experiences Global Invitation convenes.",
  },
  {
    title: "Inquire",
    body: "Request an invitation or share an inquiry about an experience, partnership, or introduction.",
  },
  {
    title: "Conversation",
    body: "Each inquiry is reviewed personally. Where there may be a fit, we arrange a conversation.",
  },
  {
    title: "Alignment",
    body: "We explore which experiences, introductions, or initiatives are genuinely relevant.",
  },
  {
    title: "Invitation",
    body: "Invitations to selected gatherings and conversations are extended individually.",
  },
];

/** Three ways of engaging with GLOBAL. These are not membership tiers. */
export const accessLevels = [
  {
    name: "Discover",
    kicker: "Open to everyone",
    body: "Explore GLOBAL, its initiatives, upcoming experiences, and perspectives published through Global Forum.",
    includes: ["The ecosystem and its initiatives", "Public event information", "GLOBAL Perspectives"],
    cta: { label: "Explore GLOBAL", href: "/ecosystem" },
  },
  {
    name: "Connect",
    kicker: "Start a conversation",
    body: "Reach out about an experience, a partnership, an introduction, or an opportunity relevant to your work.",
    includes: ["Event and experience inquiries", "Partnership conversations", "Introductions, where relevant"],
    cta: { label: "Connect With GLOBAL", href: "/contact" },
  },
  {
    name: "Private Access",
    kicker: "By invitation",
    body: "Invitation-based participation in selected gatherings and conversations, extended individually after a personal conversation.",
    includes: ["Private dinners and salons", "Invitation-only gatherings", "Curated introductions"],
    cta: { label: "Request an Invitation", href: "/invitation/apply" },
  },
];

export const opportunityTypes = [
  {
    title: "Strategic partnerships",
    body: "Long-term relationships between organizations with complementary strengths.",
  },
  {
    title: "Business development",
    body: "Conversations that help participants understand new markets, sectors, and counterparts.",
  },
  {
    title: "Collaboration",
    body: "Joint initiatives, shared projects, and knowledge exchange.",
  },
  {
    title: "Introductions",
    body: "Considered, mutually agreed introductions — made only where there is clear relevance.",
  },
  {
    title: "Industry engagement",
    body: "Participation in forums, roundtables, and dialogues shaping specific sectors.",
  },
  {
    title: "Ecosystem access",
    body: "Pathways to relevant GLOBAL initiatives — South Access, Digital Access, Capital Network, and Forum.",
  },
];

export const participationPrinciples = [
  {
    title: "Discretion",
    body: "What is shared in private conversations stays private. Participants respect one another’s plans and relationships.",
  },
  {
    title: "Reciprocity",
    body: "People take part to contribute as well as to gain — through perspective, experience, and generosity with their networks.",
  },
  {
    title: "Integrity",
    body: "Honest representation of who participants are, what they do, and what they are seeking.",
  },
  {
    title: "Curiosity",
    body: "An openness to other markets, cultures, and ways of thinking — the foundation of every cross-border relationship.",
  },
];

export const experienceFormats = [
  {
    title: "Flagship gatherings",
    body: "Multi-day convenings built around a shared program of conversation and hospitality.",
  },
  {
    title: "Private dinners",
    body: "Small, hosted dinners where a handful of guests can speak candidly and at length.",
  },
  {
    title: "Leadership forums",
    body: "Structured discussions on markets, technology, and development, led by experienced practitioners.",
  },
  {
    title: "Investor salons",
    body: "Intimate, limited-access conversations on specific themes, held alongside larger gatherings.",
  },
  {
    title: "Summits and conferences",
    body: "Larger programs combining sessions, showcases, and curated networking.",
  },
  {
    title: "Curated experiences",
    body: "Cultural, sporting, and hospitality experiences that create space for relationships to form naturally.",
  },
];
