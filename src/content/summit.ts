/** Public program preview, reconciled to the November 20 working plan.
 * Proposals are not final schedules, contracted venues, or confirmed speakers.
 * Internal budgets, future destination names and private offerings stay out.
 */
export const summitPillars = [
  { title: "Traditional finance & DeFi", description: "Banking evolution, financial fundamentals, and the relationship between established and decentralized systems." },
  { title: "Stablecoins & payments", description: "Backing, redemption, settlement, and depeg risk in practical payment infrastructure." },
  { title: "Cybersecurity, custody & protection", description: "Protecting capital and understanding operational and custody responsibilities." },
  { title: "Real-world asset tokenization", description: "Real estate, credit, legal rights, and the structures behind digital representations of assets." },
  { title: "Cross-border investment & transactions", description: "Payment rails, foreign exchange, and the movement of capital across markets." },
  { title: "Exchanges & market infrastructure", description: "Digital asset exchanges and the systems that support market participation." },
  { title: "DeFi lending, staking & liquidity", description: "Distinct sources of yield and the different risks of lending, staking, and liquidity provision." },
  { title: "Institutional finance, AI & automation", description: "AI, programmable transactions, and emerging institutional workflows." },
  { title: "Regulation, compliance & legal frameworks", description: "The legal and compliance infrastructure needed for responsible participation." },
  { title: "Private capital & real estate finance", description: "Investment structuring and the financing of businesses and real assets." },
] as const;

export const summitSchedule = [
  { time: "8:00–9:00 a.m.", title: "Arrival & connection", description: "Proposed registration, breakfast, and networking." },
  { time: "9:00 a.m.–6:00 p.m.", title: "Main Summit program", description: "Opening welcome, keynotes, panels, educational workshops, and time for lunch and networking. The working program targets four keynotes and four panels; final timing and contributors will be announced." },
  { time: "During lunch & networking", title: "Explore the marketplace", description: "Planned to operate during lunch, workshops, and networking, with pauses during main-stage keynotes and panels. Planned close: 6:30 p.m." },
  { time: "From 6:30 p.m.", title: "Continue the conversation", description: "A planned evening reception follows the Summit. Format and end time will be confirmed." },
] as const;

export const workshopCandidates = ["Practical stablecoin transactions", "Tokenization", "Compliance", "Custody", "Exchange infrastructure", "Cross-border execution"] as const;
