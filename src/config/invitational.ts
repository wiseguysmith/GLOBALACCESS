export const SAN_ANTONIO_PATH = "/invitation/experiences/the-global-invitation-san-antonio-2027";
export const TEAM_APPLICATION_PATH = "/invitation/inquire/golf";
// Replace null values with organizer-approved copy when the format is finalized.
export const tournamentDetails: { label: string; value: string | null }[] = [
  { label: "Tournament format", value: null },
  { label: "Handicap requirements", value: null },
  { label: "Scoring & tie-breaks", value: null },
  { label: "Official competition rules", value: null },
];
export const tournamentDetailsPending = tournamentDetails.some(detail => !detail.value);
// Owner/counsel review must change these deliberately, with supporting evidence.
// Venue-photo commercial permission confirmed by owner in chat, November 17, 2026.
export const publicEventApprovals = { charityGuarantee: false, bundledHospitality: false, lodgingTerms: false, venueImages: true, summitPrice: false };
export const eventFaqs = [
  ["How are golf teams selected?", "Submit a team application for organizer review. Participation is subject to approval. An application does not reserve a place or request payment. Accepted teams will be invited to complete secure payment when registration opens; confirmation follows full payment."],
  ["Will the golf be competitive?", "Yes. The Invitational combines selective entry with meaningful golf competition across a field of 40 two-person teams playing 18 holes. " + (tournamentDetailsPending ? "Tournament format, handicap requirements, scoring, and official competition rules will be announced once finalized." : tournamentDetails.map(detail => `${detail.label}: ${detail.value}`).join(". "))],
  ["What does a golf team cost?", "$10,000 for two golfers, subject to team acceptance. After approval and when payment opens, teams may pay in full or use two linked $5,000 payments. A first $5,000 share does not independently confirm a team."],
  ["Do golfers need a separate Summit invitation?", "No. A fully paid team receives two Summit admissions automatically. No second purchase or Summit application is required."],
  ["What is planned in the golf package?", "Two golf entries, food and beverages on both days subject to contracts, two Summit passes with planned marketplace access, and golfer VIP access to a fireside chat, a private salon, and a company-hosted dinner. Final hospitality and admission arrangements must be secured before registration opens. Overnight accommodation is not promised with admission."],
  ["Is lodging included for everyone?", "No universal lodging inclusion is offered. Up to 60 golfers can be accommodated on site, across 15 casitas. The field has 80 golfers. Eligibility, dates, pricing or inclusion, and assignments remain to be confirmed; an on-site room is not guaranteed for every golfer."],
  ["Where is the Summit?", "The February 4 Summit is planned in San Antonio. The venue has not yet been announced."],
  ["Can I attend only the Summit?", "Yes, you can request an invitation. The planning price is $1,200 per person, including planned marketplace access, subject to final registration terms. Requests are reviewed before payment is invited. Summit-only attendance excludes golf, lodging, and the golfers’ bundled VIP experiences. Payments remain closed."],
  ["What is planned for the Summit day?", "The proposed February 4 program includes keynotes, panels, educational workshops, a marketplace, and a reception. Registration and breakfast are proposed for 8:00–9:00 a.m., the main program for 9:00 a.m.–6:00 p.m., and the reception from 6:30 p.m. All times are local and subject to confirmation. Speakers, venue, session order, and the detailed schedule will be announced when confirmed."],
  ["Is the marketplace included?", "Marketplace access is planned as part of Summit admission, including the two Summit passes attached to each fully paid golf team. Exhibitor booths and sponsorship placements are separate reviewed arrangements and do not automatically confer additional admissions."],
  ["What is the cancellation or transfer policy?", "Organizer-approved cancellation, incomplete split-payment, refund, and transfer terms will be published before the first sale. Checkout remains closed until those terms are ready."],
  ["Are speakers or partners confirmed?", "Only confirmed participants and authorized partners will be announced. No speaker, celebrity appearance, or sponsorship placement is promised on this page."],
];
