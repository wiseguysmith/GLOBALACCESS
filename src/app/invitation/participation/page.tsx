import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { audiences, journeySteps, participationPrinciples } from "@/content/invitation";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { AccessLevels } from "@/components/sections/AccessLevels";
import { NoticePanel } from "@/components/sections/NoticePanel";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Participation — Global Invitation",
  description:
    "How to take part in Global Invitation: curated experiences, private gatherings, and thoughtful introductions, extended by invitation. Global Invitation is not a membership program.",
  path: "/invitation/participation",
});

const faqs = [
  {
    q: "Is Global Invitation a membership program?",
    a: "No. There is no membership, subscription, or account. Participation happens through curated introductions, event inquiries, and invitations to specific gatherings.",
  },
  {
    q: "Who can request an invitation?",
    a: "Anyone may submit a request or inquiry. Each one is read personally, and invitations to selected gatherings are extended individually where there is a clear fit.",
  },
  {
    q: "Is every request accepted?",
    a: "No. Gatherings are small by design, so not every request will result in an invitation.",
  },
  {
    q: "Does participation provide access to investments?",
    a: "No. Global Invitation is a relationship and experience platform. It does not offer, sell, or arrange securities or financial products, and taking part does not guarantee access to any investment, transaction, or financial product.",
  },
  {
    q: "Can organizations take part?",
    a: "Yes. Institutions and companies can engage as strategic or event partners. Please use the partnership pathway on our contact page to start that conversation.",
  },
];

export default function ParticipationPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Invitation · Participation"
        breadcrumbs={[
          { label: "GLOBAL", href: "/" },
          { label: "Global Invitation", href: "/invitation" },
          { label: "Participation" },
        ]}
        image={{
          src: "/images/restaurant.webp",
          alt: "A quiet, elegantly furnished dining room with dark wood and soft lighting",
        }}
        title={
          <>
            Participation, <span className="serif-accent text-gold">by invitation.</span>
          </>
        }
        lede={
          <p>
            Global Invitation brings people together through curated experiences, private
            gatherings, and thoughtful introductions. There is no membership: participation begins
            with a conversation.
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
      <SectionNav items={invitationNav} label="Global Invitation" />

      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SplitFeature
            image={{
              src: "/images/fine-dining.webp",
              alt: "Guests sharing a plated dinner around a table with wine glasses",
            }}
          >
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-headline mt-6 text-ink">Relationships, not subscriptions.</h2>
            <div className="text-lede mt-7 space-y-5 text-ink-soft">
              <p>
                Global Invitation is a relationship and experience platform. People take part by
                attending curated gatherings, joining conversations, and being introduced to others
                where there is genuine relevance.
              </p>
              <p>
                Some information is public, such as our planned experiences and published
                perspectives. Private gatherings are by invitation, extended individually after a
                personal conversation.
              </p>
            </div>
          </SplitFeature>
        </div>
      </section>

      <AccessLevels headingId="levels-heading" eyebrow="Ways to take part" />

      <section aria-labelledby="audience-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="audience-heading"
            eyebrow="Who it’s for"
            title="Designed for people who build across borders."
            intro={
              <p>
                Participants come from different sectors and regions. What they share is
                experience, judgment, and a genuine interest in collaboration.
              </p>
            }
          />
          <FocusGrid items={audiences} className="mt-16" />
        </div>
      </section>

      <section
        aria-labelledby="principles-heading"
        className="surface-dark relative isolate bg-midnight py-24 text-white sm:py-32"
      >
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x">
          <SectionHeading
            id="principles-heading"
            tone="dark"
            eyebrow="Principles"
            title={
              <>
                The standards that make every{" "}
                <span className="serif-accent text-gold">conversation worthwhile.</span>
              </>
            }
          />
          <FocusGrid items={participationPrinciples} tone="dark" columns={4} className="mt-16" />
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="journey-heading"
            eyebrow="From inquiry to invitation"
            title="A considered path to participation."
          />
          <div className="mt-16 lg:mt-24">
            <ProcessSteps steps={journeySteps} label="From inquiry to invitation" />
          </div>
          <NoticePanel className="mt-20 max-w-4xl" title="Please note">
            Not every request will result in an invitation. Participation in Global Invitation does
            not imply or guarantee access to investments, financial products, or transactions, and
            nothing on this site is an offer or solicitation of any kind.
          </NoticePanel>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-heading" className="text-headline mt-6 text-ink">
              Participation, answered.
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
          { name: "Participation", path: "/invitation/participation" },
        ])}
      />
    </>
  );
}
