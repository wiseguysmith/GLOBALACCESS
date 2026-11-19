# Final competition details — awaiting organizer update

Public positioning: **A curated field. A competitive spirit.** Selective team entry and meaningful golf competition. $10,000 per two-person team, subject to acceptance.

The public competition section deliberately leaves these four items marked **To be confirmed**:

1. Tournament format.
2. Handicap requirements.
3. Scoring and tie-breaks.
4. Official competition rules.

When the organizer supplies the approved details, replace the corresponding null values in `tournamentDetails` in `src/config/invitational.ts`. The section renders those values and its pending badge updates automatically. Its supporting introduction and FAQ should be reviewed for alignment with the final rules. No scramble, best-ball format, handicap policy, scoring method or award allocation has been invented.

Team journey: application → organizer review → acceptance → secure payment → team confirmation. Applications do not hold inventory or take payment. Online team submissions are gated by `EVENT_GOLF_APPLICATIONS_ENABLED` and the existing verified-delivery prerequisites. The public email fallback is info@globalaccess.live.

Staff routing: golf applications are saved as category `golf` and use the existing durable staff notification/acknowledgment outbox. Existing databases need `supabase/event-team-applications.sql`. Golf applications capture both golfers and teammate consent. Do not enable direct public golf checkout; an approval-bound payment invitation still requires implementation/testing before sales.
