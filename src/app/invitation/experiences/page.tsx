import { Lock, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { invitationNav } from "@/config/site";
import { getEvents, getFlagshipEvent } from "@/content/events";
import { experienceFormats } from "@/content/invitation";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { EventCard, EventFeature } from "@/components/sections/Events";
import { FocusGrid } from "@/components/sections/FocusGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Experiences — Global Invitation",
  description:
    "Private gatherings, leadership forums, investor salons, and international summits from Global Invitation — including The Global Invitation in San Antonio, February 2027.",
  path: "/invitation/experiences",
});

export default function ExperiencesPage() {
  const flagship = getFlagshipEvent();
  const program = getEvents().filter((e) => e.slug !== flagship?.slug);

  return (
    <>
      <PageHero
        eyebrow="Global Invitation · Experiences"
        breadcrumbs={[
          { label: "GLOBAL", href: "/" },
          { label: "Global Invitation", href: "/invitation" },
          { label: "Experiences" },
        ]}
        image={{
          src: "/images/terrace.webp",
          alt: "A drink served on a silver tray on a terrace overlooking misty mountains",
        }}
        title={
          <>
            Gatherings worth <span className="serif-accent text-gold">the journey.</span>
          </>
        }
        lede={
          <p>
            Private dinners, leadership forums, investor gatherings, and international summits —
            designed around meaningful conversation and curated so every participant adds to the
            room.
          </p>
        }
        actions={
          <ButtonLink href="/invitation/apply?interest=Events%20and%20Experiences" size="lg">
            Request an Invitation
          </ButtonLink>
        }
      />
      <SectionNav items={invitationNav} label="Global Invitation" />

      <section aria-labelledby="flagship-heading" className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="flagship-heading"
            eyebrow="Flagship gathering"
            title="The Global Invitation — San Antonio, 2027."
            intro={
              <p>
                Our first flagship gathering: two days on the course and in the room, bringing
                together private markets, modern financial infrastructure, and the relationships that
                connect them.
              </p>
            }
          />
          <div className="mt-14">{flagship ? <EventFeature event={flagship} /> : null}</div>
        </div>
      </section>

      <section aria-labelledby="program-heading" className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            id="program-heading"
            eyebrow="Program"
            title="Upcoming experiences."
            intro={
              <p>
                Experiences are announced here once they are confirmed. Many are shared directly with
                members first.
              </p>
            }
          />
          {program.length > 0 ? (
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {program.map((event) => (
                <li key={event.slug}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-14 rounded-sm border border-dashed border-navy/20 p-10 text-center">
              <p className="font-display text-xl text-ink">Further experiences will be announced.</p>
              <p className="mt-2 text-ink-soft">
                Members and those who have requested an invitation are informed first.
              </p>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="formats-heading" className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-x">
          <SectionHeading
            id="formats-heading"
            eyebrow="Formats"
            title="Intimate by design."
            intro={
              <p>
                Every format is built to make real conversation possible — small enough to matter,
                curated enough to be worthwhile.
              </p>
            }
          />
          <FocusGrid items={experienceFormats} className="mt-16" />
        </div>
      </section>

      <section
        aria-labelledby="access-heading"
        className="surface-dark bg-navy py-24 text-white sm:py-32"
      >
        <div className="container-x">
          <SectionHeading
            id="access-heading"
            tone="dark"
            eyebrow="Access"
            title="Public and invitation-only experiences."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div data-reveal className="rounded-sm border border-white/15 p-8 sm:p-10">
              <Lock aria-hidden="true" className="size-6 text-gold" strokeWidth={1.25} />
              <h3 className="mt-6 font-display text-2xl font-medium">Invitation only</h3>
              <p className="mt-3 leading-relaxed text-mist">
                Most Global Invitation experiences are reserved for members and invited guests.
                Requests are reviewed individually, and capacity is deliberately limited. Some
                elements — such as private salons — have further limited access.
              </p>
            </div>
            <div data-reveal className="rounded-sm border border-white/15 p-8 sm:p-10">
              <Users aria-hidden="true" className="size-6 text-gold" strokeWidth={1.25} />
              <h3 className="mt-6 font-display text-2xl font-medium">Public</h3>
              <p className="mt-3 leading-relaxed text-mist">
                From time to time, selected sessions and forums may be open to registration. Where
                this is the case, it will be stated clearly on the experience listing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Partner with an experience"
        image={{ src: "/images/event-san-antonio.webp", alt: "" }}
        title="Help shape what we convene."
        body={
          <p>
            Organizations interested in partnering on The Global Invitation or future experiences can
            start a conversation with our team.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=partnership" size="lg">
              Start a partnership conversation
            </ButtonLink>
            <ButtonLink href="/invitation/apply" variant="outline-dark" size="lg">
              Request an Invitation
            </ButtonLink>
          </>
        }
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "GLOBAL", path: "/" },
          { name: "Global Invitation", path: "/invitation" },
          { name: "Experiences", path: "/invitation/experiences" },
        ])}
      />
    </>
  );
}
