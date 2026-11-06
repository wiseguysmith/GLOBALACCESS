import type { Initiative, InitiativeId } from "@/types";

/**
 * Single source of truth for every GLOBAL initiative.
 * Names, positioning, routes, imagery, and accent themes are read from here
 * by navigation, cards, metadata, and page heroes.
 */
export const initiatives: Record<InitiativeId, Initiative> = {
  invitation: {
    id: "invitation",
    kicker: "Flagship platform",
    index: "01",
    name: "Global Invitation",
    navLabel: "Invitation",
    tagline: "Access Begins With Connection.",
    summary:
      "Curated executive experiences, private gatherings, and thoughtful introductions — where relationships across the ecosystem begin.",
    description:
      "Global Invitation brings together entrepreneurs, investors, institutional representatives, and strategic partners through curated experiences, private gatherings, and considered introductions. Participation is by invitation.",
    role: "Creates relationships — curated experiences and introductions where trust begins.",
    href: "/invitation",
    image: {
      src: "/images/banquet.webp",
      alt: "A long dinner table set with glassware and flowers beneath warm lights",
    },
    theme: { accent: "#C7A66D", accentInk: "#7D5F2A", mood: "Exclusive, experiential" },
  },
  south: {
    id: "south",
    kicker: "GSA",
    index: "02",
    name: "Global South Access",
    navLabel: "South Access",
    abbreviation: "GSA",
    tagline: "Connecting Markets. Unlocking Potential.",
    summary:
      "Building pathways between international relationships, strategic partners, and opportunities across Global South markets — beginning with Latin America.",
    description:
      "Global South Access focuses on market access, regional partnerships, and cross-border collaboration, with an initial emphasis on Latin America and a longer-term outlook toward Africa and Southeast Asia.",
    role: "Connects regional markets and opportunities — partnerships and cross-border pathways.",
    href: "/south",
    image: {
      src: "/images/andes-city.webp",
      alt: "A Latin American city spreading across a valley beneath green mountains",
    },
    theme: { accent: "#7FA894", accentInk: "#3E6E5E", mood: "Connected, development-oriented" },
  },
  digital: {
    id: "digital",
    kicker: "GDA",
    index: "03",
    name: "Global Digital Access",
    navLabel: "Digital Access",
    abbreviation: "GDA",
    tagline: "Connecting Physical Value to Digital Infrastructure.",
    summary:
      "Exploring and coordinating the responsible digital transformation of real-world assets, from tokenization readiness to supporting infrastructure.",
    description:
      "Global Digital Access examines how real-world assets can move onto digital infrastructure responsibly — with legal clarity, data integrity, and compliance-aware technology at the foundation.",
    role: "Supports technology and financial infrastructure — readiness, partnerships, and interoperability.",
    href: "/digital",
    image: {
      src: "/images/grid.webp",
      alt: "Power transmission towers silhouetted against an amber evening sky",
    },
    theme: { accent: "#86A9CB", accentInk: "#3F6A93", mood: "Technical, infrastructure-focused" },
  },
  capital: {
    id: "capital",
    kicker: "GCN",
    index: "04",
    name: "Global Capital Network",
    navLabel: "Capital Network",
    abbreviation: "GCN",
    tagline: "Where Capital Relationships Begin.",
    summary:
      "A relationship network of family offices, institutional investors, financial professionals, and strategic capital partners.",
    description:
      "Global Capital Network develops long-term relationships across traditional and digital finance, centered on discretion, alignment, and qualified introductions.",
    role: "Develops strategic capital relationships across traditional and digital finance.",
    href: "/capital",
    image: {
      src: "/images/towers.webp",
      alt: "Glass office towers rising into an overcast sky, viewed from street level",
    },
    theme: { accent: "#B9C0CC", accentInk: "#4A5365", mood: "Institutional, discreet" },
  },
  forum: {
    id: "forum",
    kicker: "Editorial",
    index: "05",
    name: "Global Forum",
    navLabel: "Forum",
    tagline: "Ideas That Cross Borders.",
    summary:
      "An editorial home for perspectives on global markets, financial innovation, technology, development, and international collaboration.",
    description:
      "Global Forum publishes considered perspectives, conversations, and event insights — an intellectual commons for the people and ideas shaping cross-border opportunity.",
    role: "Creates dialogue and understanding — perspectives, research, and conversation.",
    href: "/forum",
    image: {
      src: "/images/library.webp",
      alt: "Floor-to-ceiling wooden shelves filled with books in a quiet library",
    },
    theme: { accent: "#D9A595", accentInk: "#8C3B3B", mood: "Editorial, intellectually serious" },
  },
};

export const initiativeList: Initiative[] = [
  initiatives.invitation,
  initiatives.south,
  initiatives.digital,
  initiatives.capital,
  initiatives.forum,
];

/**
 * How the initiatives complement one another. Used by the interactive
 * ecosystem map. These are relationships, not a fixed sequence or funnel:
 * a relationship can begin in any initiative.
 */
export const ecosystemLinks: Record<InitiativeId, { verb: string; links: { to: InitiativeId; text: string }[] }> = {
  invitation: {
    verb: "Creates relationships",
    links: [
      { to: "forum", text: "Conversations at gatherings inform the perspectives Global Forum publishes." },
      { to: "capital", text: "Experiences bring capital partners and builders into the same room." },
      { to: "south", text: "Regional leaders meet international counterparts in person." },
      { to: "digital", text: "Technology partners meet the institutions that may adopt their work." },
    ],
  },
  forum: {
    verb: "Creates dialogue and understanding",
    links: [
      { to: "invitation", text: "Shared ideas give gatherings their themes and substance." },
      { to: "capital", text: "Perspectives on markets ground capital conversations in evidence." },
      { to: "south", text: "Regional insight helps international partners understand context." },
      { to: "digital", text: "Clear explanations make new infrastructure understandable." },
    ],
  },
  capital: {
    verb: "Develops strategic capital relationships",
    links: [
      { to: "invitation", text: "Relationships deepen through in-person experiences." },
      { to: "south", text: "Capital partners gain perspective on regional markets." },
      { to: "digital", text: "Institutions explore modern financial infrastructure with care." },
      { to: "forum", text: "Market perspectives inform long-term thinking." },
    ],
  },
  south: {
    verb: "Connects regional markets and opportunities",
    links: [
      { to: "capital", text: "Regional opportunities meet relevant capital relationships." },
      { to: "invitation", text: "Regional leaders join curated experiences and introductions." },
      { to: "digital", text: "Infrastructure readiness supports cross-border projects." },
      { to: "forum", text: "Local knowledge shapes the ecosystem’s perspective." },
    ],
  },
  digital: {
    verb: "Supports technology and financial infrastructure",
    links: [
      { to: "capital", text: "Institutions evaluate digital infrastructure with appropriate oversight." },
      { to: "south", text: "Real-world assets in regional markets are assessed for readiness." },
      { to: "forum", text: "Readiness frameworks are explained in plain language." },
      { to: "invitation", text: "Technology leaders join gatherings and conversations." },
    ],
  },
};
