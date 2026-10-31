import type { ImageAsset } from "@/types";

export const pillars: {
  title: string;
  kicker: string;
  body: string;
  href: string;
  image: ImageAsset;
}[] = [
  {
    title: "Membership",
    kicker: "A curated international network",
    body: "A carefully selected community of entrepreneurs, innovators, investors, institutional representatives, founders, and strategic partners.",
    href: "/invitation/membership",
    image: {
      src: "/images/restaurant.webp",
      alt: "A quiet, elegantly furnished dining room with dark wood and soft lighting",
    },
  },
  {
    title: "Experiences",
    kicker: "Gatherings worth the journey",
    body: "Private dinners, leadership forums, investor gatherings, summits, and curated experiences designed around meaningful conversation.",
    href: "/invitation/experiences",
    image: {
      src: "/images/event-golf.webp",
      alt: "Morning light over the fairways of a tree-lined golf course",
    },
  },
  {
    title: "Opportunities",
    kicker: "Introductions with intent",
    body: "Strategic introductions, collaborations, partnerships, and access to relevant initiatives across the GLOBAL ecosystem.",
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

export const journeySteps = [
  {
    title: "Discover",
    body: "Learn about Global Invitation, its principles, and the experiences it convenes.",
  },
  {
    title: "Request an Invitation",
    body: "Share your background and what you hope to contribute to — and gain from — the community.",
  },
  {
    title: "Application Review",
    body: "Each request is reviewed individually for alignment with the community and its standards.",
  },
  {
    title: "Introduction and Alignment",
    body: "Where there is a potential fit, we arrange a conversation to understand your goals.",
  },
  {
    title: "Approved Participation",
    body: "Approved members are welcomed into the community, its experiences, and its conversations.",
  },
];

export const opportunityTypes = [
  {
    title: "Strategic partnerships",
    body: "Long-term relationships between organizations with complementary strengths.",
  },
  {
    title: "Business development",
    body: "Conversations that help members understand new markets, sectors, and counterparts.",
  },
  {
    title: "Collaboration",
    body: "Joint initiatives, shared projects, and knowledge exchange among members.",
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

export const membershipPrinciples = [
  {
    title: "Discretion",
    body: "What is shared within the community stays within the community. Members respect one another’s privacy, plans, and relationships.",
  },
  {
    title: "Reciprocity",
    body: "Members participate to contribute as well as to gain — through perspective, experience, and generosity with their networks.",
  },
  {
    title: "Integrity",
    body: "Honest representation of who members are, what they do, and what they are seeking.",
  },
  {
    title: "Curiosity",
    body: "An openness to other markets, cultures, and ways of thinking — the foundation of every cross-border relationship.",
  },
];

export const experienceFormats = [
  {
    title: "Flagship gatherings",
    body: "Multi-day convenings that bring the wider community together around a shared program of conversation and hospitality.",
  },
  {
    title: "Private dinners",
    body: "Small, hosted dinners where a handful of members can speak candidly and at length.",
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
