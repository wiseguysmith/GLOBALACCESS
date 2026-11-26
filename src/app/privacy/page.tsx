import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How GLOBAL collects, uses, and protects personal information submitted through globalaccess.live.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={<p>How we collect, use, and protect the information you share with us.</p>}
      updated="Effective date: November 25, 2026"
    >
      <p>
        This Privacy Policy explains how Mindful Tech Corporation, a Wyoming corporation (“GLOBAL”, “we”, “us”), operating the
        GLOBAL ecosystem and the website globalaccess.live (the “Site”), handles personal
        information. We aim to collect only what we need, use it only for clear purposes, and protect
        it carefully.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        When you email us, we receive your email address, your message, and any information you
        choose to include. When online forms are available, we also receive the contact, professional,
        event, and preference details you submit, along with any permissions you select.
      </p>
      <p>
        When event checkout is available, the payment provider processes your payment details.
        We receive information needed to manage the registration, such as the payment status,
        amount, and transaction reference.
      </p>
      <p>
        Hosting and security services may process technical information such as IP addresses and
        request logs to deliver and protect the site. Please keep financial account details,
        government identification numbers, and confidential documents out of general inquiries.
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To review invitation requests and assess alignment with the Global Invitation community.</li>
        <li>To respond to inquiries and continue conversations you have started with us.</li>
        <li>To arrange introductions — only with your agreement.</li>
        <li>To protect the Site against spam, abuse, and security threats.</li>
        <li>To manage event registrations, payments, and related support when available.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We do not sell personal information, and we do not publish applicant information.</p>

      <h2>3. Sharing and service providers</h2>
      <p>
        Hosting, email, and, when used, registration and payment providers may process
        information to help us operate the site and deliver the services you request.
        We may disclose information when required by law or to protect the rights or
        safety of GLOBAL or others.
      </p>

      <h2>4. International transfers</h2>
      <p>
        GLOBAL operates internationally, and service providers may process information in countries
        other than your own. Where required, we rely on appropriate safeguards for such transfers.
      </p>

      <h2>5. Retention</h2>
      <p>
        Retention depends on the type of record, the time needed to handle the request or registration,
        and any applicable legal or contractual obligations.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete, or restrict
        the use of your personal information, to withdraw consent, and to object to certain
        processing. To make a request, email us using the contact information below. You may also have the right to complain to a data protection authority.
      </p>

      <h2>7. Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect personal information,
        including encrypted connections, access restrictions, and secured storage. No method of
        transmission or storage is completely secure.
      </p>

      <h2>8. Children</h2>
      <p>The Site is intended for professionals and is not directed to anyone under 18.</p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy from time to time. The effective date above shows when it was last
        revised.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions or privacy requests, email{" "}
        <a href={`mailto:${siteConfig.contactEmail}?subject=GLOBAL%20Privacy%20Request`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>
        Mindful Tech Corporation<br />
        5830 E 2nd St, Ste 7000 #26566<br />
        Casper, WY 82609, USA
      </p>
    </LegalPage>
  );
}
