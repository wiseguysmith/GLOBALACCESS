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
    name: "GLOBAL Invitational",
    navLabel: "Invitation",
    tagline: "Access Begins With Connection.",
    summary:
      "A recurring international series connecting people, capital, and markets through curated experiences and considered introductions.",
    description:
      "GLOBAL Invitational brings together entrepreneurs, investors, institutional representatives, and strategic partners through private gatherings and considered introductions.",
    role: "The engagement layer — where people enter the ecosystem and relationships begin.",
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
    role: "The markets layer — regional understanding, partnerships, and cross-border pathways.",
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
    role: "The infrastructure layer — readiness, technology partnerships, and interoperability.",
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
    role: "The relationship layer — institutional dialogue across traditional and digital finance.",
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
    role: "The ideas layer — editorial perspective, dialogue, and shared understanding.",
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
