import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { audiences, journeySteps, membershipPrinciples } from "@/content/invitation";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Membership — Global Invitation",
  description:
    "Global Invitation membership is a curated international network of entrepreneurs, investors, institutional representatives, and strategic partners. Learn who it is for and how to request an invitation.",
  path: "/invitation/membership",
});

const faqs = [
  {
    q: "Who can request an invitation?",
    a: "Anyone may submit a request. Participation is by invitation, following an individual review of each request for alignment with the community and its principles.",
  },
  {
    q: "How are requests reviewed?",
    a: "Each request is read personally. We consider professional background, the perspective an applicant would bring, and how their goals align with the community. Where there may be a fit, we arrange an introductory conversation.",
  },
  {
    q: "Does membership provide access to investments?",
    a: "No. Global Invitation is a membership and relationship platform. It does not offer, sell, or arrange securities or financial products, and membership does not guarantee access to any investment, transaction, or financial product.",
  },
  {
    q: "What are the terms of membership?",
    a: "Membership terms are shared directly with prospective members during the introduction and alignment stage.",
  },
  {
    q: "Can organizations participate?",
    a: "Yes. Institutions and companies can engage as strategic partners. Please use the partnership pathway on our contact page to start that conversation.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Invitation · Membership"
        breadcrumbs={[
          { label: "GLOBAL", href: "/" },
          { label: "Global Invitation", href: "/invitation" },
          { label: "Membership" },
        ]}
        image={{
          src: "/images/restaurant.webp",
          alt: "A quiet, elegantly furnished dining room with dark wood and soft lighting",
        }}
        title={
          <>
            A curated network of{" "}
            <span className="serif-accent text-gold">globally minded</span> people.
          </>
        }
        lede={
          <p>
            Membership brings together individuals and institutions who share an international
            outlook, a long-term perspective, and a commitment to meaningful collaboration.
          </p>
        }
        actions={
          <ButtonLink href="/invitation/apply" size="lg">
            Request an Invitation
          </ButtonLink>
        }
      />
      <SectionNav items={invitationNav} label="Global Invitation" />

      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SplitFeature
            image={{
              src: "/images/fine-dining.webp",
              alt: "Guests sharing a plated dinner around a table with wine glasses",
            }}
          >
            <Eyebrow>What membership is</Eyebrow>
            <h2 className="text-headline mt-6 text-ink">More than a network.</h2>
            <div className="text-lede mt-7 space-y-5 text-ink-soft">
              <p>
                Global Invitation membership is a relationship with a carefully curated community —
                and with the wider GLOBAL ecosystem behind it.
              </p>
              <p>
                Members take part in private gatherings and curated experiences, join conversations
                that cross markets and sectors, and — where there is mutual interest — are introduced
                to people and initiatives relevant to their work.
              </p>
            </div>
          </SplitFeature>
        </div>
      </section>

      <section aria-labelledby="members-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="members-heading"
            eyebrow="Who it’s for"
            title="Designed for people who build across borders."
            intro={
              <p>
                Members come from different sectors and regions. What they share is experience,
                judgment, and a genuine interest in collaboration.
              </p>
            }
          />
          <FocusGrid items={audiences} className="mt-16" />
        </div>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32 lg:py-40"
      >
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x">
          <SectionHeading
            id="principles-heading"
            tone="dark"
            eyebrow="Membership principles"
            title={
              <>
                The standards that make the{" "}
                <span className="serif-accent text-gold">community worth joining.</span>
              </>
            }
          />
          <FocusGrid items={membershipPrinciples} tone="dark" columns={4} className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="journey-heading"
            eyebrow="Membership journey"
            title="From first conversation to participation."
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={journeySteps} label="Membership journey" />
          </div>
          <NoticePanel className="mt-20 max-w-4xl" title="Please note">
            Not every request will result in an invitation. Membership in Global Invitation does not
            imply or guarantee access to investments, financial products, or transactions, and
            nothing on this site is an offer or solicitation of any kind.
          </NoticePanel>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-heading" className="text-headline mt-6 text-ink">
              Membership, answered.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Request an invitation"
        image={{ src: "/images/banquet.webp", alt: "" }}
        title="Begin with a conversation."
        body={
          <p>
            Tell us about your work and what you hope to contribute. Every request is reviewed
            personally.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/invitation/apply" size="lg">
              Request an Invitation
            </ButtonLink>
            <ButtonLink href="/invitation/experiences" variant="outline-dark" size="lg">
              Explore Experiences
            </ButtonLink>
          </>
        }
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "GLOBAL", path: "/" },
          { name: "Global Invitation", path: "/invitation" },
          { name: "Membership", path: "/invitation/membership" },
        ])}
      />
    </>
  );
}
