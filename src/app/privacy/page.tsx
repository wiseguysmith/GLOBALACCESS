import Link from "next/link";
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
      updated="Effective date: [to be set on legal approval]"
    >
      <p>
        This Privacy Policy explains how [Legal entity name] (“GLOBAL”, “we”, “us”), operating the
        GLOBAL ecosystem and the website globalaccess.live (the “Site”), handles personal
        information. We aim to collect only what we need, use it only for clear purposes, and protect
        it carefully.
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect information you choose to provide, including when you:</p>
      <ul>
        <li>
          <strong>Request an invitation</strong> — full name, email address, organization,
          professional title, country or region, primary area of interest, professional background,
          and your reasons for requesting an invitation.
        </li>
        <li>
          <strong>Contact us</strong> — name, email address, organization (optional), topic, and
          the content of your message.
        </li>
      </ul>
      <p>
        We also record the date and time of each submission and your consent to this policy. We do
        not ask for, and ask you not to submit, financial account details, government identification
        numbers, or other sensitive personal information through the Site.
      </p>
      <p>
        Our hosting provider may process technical information, such as IP addresses and request
        logs, for security, abuse prevention, and reliable operation of the Site. The Site does not
        use advertising or third-party tracking cookies. [Confirm before publication, and update if
        analytics are added.]
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To review invitation requests and assess alignment with the Global Invitation community.</li>
        <li>To respond to inquiries and continue conversations you have started with us.</li>
        <li>To arrange introductions — only with your agreement.</li>
        <li>To protect the Site against spam, abuse, and security threats.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We do not sell personal information, and we do not publish applicant information.</p>

      <h2>3. Legal bases</h2>
      <p>
        Where data protection laws require a legal basis, we rely on your consent (given when you
        submit a form), our legitimate interests in operating and protecting the ecosystem, and
        compliance with legal obligations. [Counsel to confirm the applicable frameworks — for
        example GDPR, U.S. state privacy laws, and Costa Rica’s Law No. 8968 — based on where GLOBAL
        operates and whom it serves.]
      </p>

      <h2>4. Sharing and service providers</h2>
      <p>
        We share personal information only with service providers that help us operate the Site and
        manage submissions, under appropriate confidentiality and data protection terms. Depending
        on configuration, these may include website hosting (Netlify), secure database storage
        (Supabase), workflow automation, and transactional email delivery (Resend). [Confirm the
        final list of providers before publication.]
      </p>
      <p>
        We may also disclose information where required by law, or to protect the rights, safety,
        and security of GLOBAL, our community, or others.
      </p>

      <h2>5. International transfers</h2>
      <p>
        GLOBAL operates internationally, and service providers may process information in countries
        other than your own. Where required, we rely on appropriate safeguards for such transfers.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep invitation requests and inquiries only as long as needed for the purposes described
        above, and then delete or anonymize them. [Specify retention periods — for example, a set
        period after a decision on an invitation request.]
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete, or restrict
        the use of your personal information, to withdraw consent, and to object to certain
        processing. To make a request, contact us through our{" "}
        <Link href="/contact">contact page</Link>. You may also have the right to complain to a data
        protection authority.
      </p>

      <h2>8. Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect personal information,
        including encrypted connections, access restrictions, and secured storage. No method of
        transmission or storage is completely secure.
      </p>

      <h2>9. Children</h2>
      <p>The Site is intended for professionals and is not directed to anyone under 18.</p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy from time to time. The effective date above shows when it was last
        revised.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy can be sent through our <Link href="/contact">contact page</Link>.
        [Add a dedicated privacy contact address and the registered address of the legal entity.]
      </p>
    </LegalPage>
  );
}
