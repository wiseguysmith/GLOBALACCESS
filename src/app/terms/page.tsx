import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of globalaccess.live and participation in the GLOBAL ecosystem.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      intro={<p>The terms that govern your use of globalaccess.live.</p>}
      updated="Effective date: [to be set on legal approval]"
    >
      <p>
        These Terms of Use (“Terms”) govern your access to and use of globalaccess.live (the “Site”),
        operated by [Legal entity name] (“GLOBAL”, “we”, “us”). By using the Site, you agree to these
        Terms. If you do not agree, please do not use the Site.
      </p>

      <h2>1. About the Site</h2>
      <p>
        The Site provides information about the GLOBAL ecosystem and its initiatives — Global
        Invitation, Global South Access, Global Digital Access, Global Capital Network, and Global
        Forum — and allows visitors to request an invitation or contact us.
      </p>

      <h2>2. No offer, solicitation, or advice</h2>
      <p>
        Nothing on the Site is an offer to sell, or a solicitation of an offer to buy, any security,
        token, digital asset, or other financial product, in any jurisdiction. Nothing on the Site
        constitutes investment, financial, legal, tax, or accounting advice, or a recommendation of
        any kind. GLOBAL is not a registered broker-dealer, investment adviser, bank, or exchange.
        You should consult your own qualified advisors before making any decision.
      </p>

      <h2>3. Invitations and participation</h2>
      <p>
        GLOBAL does not operate a membership program. Requesting an invitation does not guarantee
        acceptance. Participation in any GLOBAL experience or initiative is at our discretion and
        may be subject to separate terms communicated to invited participants. Participation does
        not imply or guarantee access to any investment, transaction, financial product,
        introduction, or outcome.
      </p>

      <h2>4. Events</h2>
      <p>
        Event information on the Site, including dates, venues, programs, and participants, may
        change. Attendance at any event is subject to its own terms and policies, which will be
        provided to participants.
      </p>

      <h2>5. Your responsibilities</h2>
      <ul>
        <li>Provide accurate information in any form you submit.</li>
        <li>Do not submit confidential, sensitive, or third-party information you are not entitled to share.</li>
        <li>Do not misuse the Site, attempt to gain unauthorized access, or interfere with its operation.</li>
        <li>Do not use automated means to submit forms or collect information from the Site.</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        The Site and its content — including text, design, graphics, and the GLOBAL name and marks —
        are owned by or licensed to GLOBAL and protected by applicable laws. Photography is used
        under license. You may view and share pages for personal, non-commercial purposes; any other
        use requires our written permission.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        The Site may link to third-party websites. We are not responsible for their content,
        policies, or practices.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Site and its content are provided “as is” and “as available”, without warranties of any
        kind, to the fullest extent permitted by law. Content describing initiatives in development
        reflects current intentions and may change.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, GLOBAL will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for any loss arising from your
        use of, or reliance on, the Site. [Counsel to confirm wording and any liability cap.]
      </p>

      <h2>10. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information.
      </p>

      <h2>11. Governing law</h2>
      <p>These Terms are governed by the laws of [jurisdiction to be determined by counsel].</p>

      <h2>12. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after changes take
        effect means you accept the revised Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms can be sent through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
