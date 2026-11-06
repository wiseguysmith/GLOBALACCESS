import Image from "next/image";
import { Clock, Flag } from "lucide-react";
import type { GolfTournament } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FocusGrid } from "./FocusGrid";
import { ProcessSteps } from "./ProcessSteps";

/**
 * Full description of an event's golf tournament: what it is, how the
 * format works, the flow of the day, and who can play.
 */
export function GolfTournamentSection({
  golf,
  requestHref,
  partnerHref,
}: {
  golf: GolfTournament;
  requestHref: string;
  partnerHref: string;
}) {
  return (
    <section id="golf" aria-labelledby="golf-heading" className="scroll-mt-32">
      {/* Introduction */}
      <div className="bg-ivory py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            <Eyebrow>{golf.eyebrow}</Eyebrow>
            <h2 id="golf-heading" className="text-headline mt-6 text-ink">
              {golf.name}
            </h2>
            <p className="serif-accent mt-3 text-2xl text-gold-ink sm:text-[1.75rem]">
              A two-person scramble at Briggs Ranch Golf Club.
            </p>
            <p className="text-lede mt-7 text-ink-soft">{golf.intro}</p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <ButtonLink href={requestHref} variant="solid-navy" size="lg">
                Request a place in the tournament
              </ButtonLink>
              <ButtonLink href={partnerHref} variant="outline-light" size="lg">
                Become a golf partner
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-6" data-reveal="fade">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm sm:ml-12">
              <Image
                src={golf.images.primary.src}
                alt={golf.images.primary.alt}
                fill
                quality={70}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-0 hidden aspect-square w-48 overflow-hidden rounded-sm border-4 border-ivory shadow-[0_24px_60px_-30px_rgba(16,30,48,0.5)] sm:block lg:w-56">
              <Image
                src={golf.images.secondary.src}
                alt={golf.images.secondary.alt}
                fill
                quality={70}
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key facts */}
        <div className="container-x mt-20 sm:mt-24">
          <dl className="grid grid-cols-2 border-t border-navy/15 lg:grid-cols-5">
            {golf.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`border-navy/15 border-b py-7 pr-4 lg:border-b-0 ${i % 2 === 1 ? "border-l pl-5" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i === golf.facts.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <dt className="eyebrow text-gold-ink">{fact.label}</dt>
                <dd className="mt-3">
                  <span className="block font-display text-xl font-medium tracking-[-0.02em] text-ink">
                    {fact.value}
                  </span>
                  {fact.note ? <span className="mt-1 block text-sm text-slate">{fact.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* The format */}
      <div className="surface-dark relative isolate bg-navy py-24 text-white sm:py-32">
        <div aria-hidden="true" className="column-rules absolute inset-0 -z-10" />
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">The format</Eyebrow>
            <h3 className="text-headline mt-6 text-white">{golf.format.name}</h3>
            <p className="text-lede mt-7 text-mist">{golf.format.scoring}</p>
            <blockquote className="mt-12 border-l border-gold/60 pl-6">
              <p className="serif-accent text-2xl leading-snug text-white sm:text-[1.75rem]">
                “{golf.rationale}”
              </p>
            </blockquote>
          </div>
          <ol className="relative lg:col-span-6 lg:col-start-7" aria-label={golf.format.name}>
            {golf.format.steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-10 last:pb-0"
              >
                {i < golf.format.steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-12 bottom-0 left-6 w-px bg-white/15" />
                ) : null}
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-gold/50 font-display text-sm tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2.5">
                  <p className="font-display text-xl font-medium">{step.title}</p>
                  <p className="mt-2 leading-relaxed text-mist">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Flow of the day */}
      <div className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            level={3}
            eyebrow="The day"
            title="How the tournament day unfolds."
            intro={<p>Exact timings, the start format, and tee times will be shared with confirmed players.</p>}
          />
          <div className="mt-16 lg:mt-20">
            <ProcessSteps steps={golf.dayFlow} label="Tournament day" />
          </div>
        </div>
      </div>

      {/* What sets it apart */}
      <div className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            level={3}
            eyebrow="On the course"
            title="More than a round of golf."
            intro={
              <p>
                Every element of the tournament is designed to turn several hours on the course into
                relationships that last beyond it.
              </p>
            }
          />
          <FocusGrid items={golf.features} className="mt-16" />
        </div>
      </div>

      {/* Who plays + still to come */}
      <div className="bg-ivory py-24 sm:py-32">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <div data-reveal className="rounded-sm border border-navy/12 bg-white p-8 sm:p-10">
            <Flag aria-hidden="true" className="size-6 text-gold-ink" strokeWidth={1.25} />
            <h3 className="mt-6 font-display text-2xl font-medium text-ink">Who plays</h3>
            <ul className="mt-6 space-y-4">
              {golf.eligibility.map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-sm border border-navy/12 bg-paper p-8 sm:p-10">
            <Clock aria-hidden="true" className="size-6 text-gold-ink" strokeWidth={1.25} />
            <h3 className="mt-6 font-display text-2xl font-medium text-ink">To be announced</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              These details will be shared as they are confirmed.
            </p>
            <ul className="mt-6 space-y-3">
              {golf.toBeAnnounced.map((item) => (
                <li key={item} className="flex gap-4 text-ink-soft">
                  <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-slate" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-x mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink href={requestHref} variant="solid-navy" size="lg">
            Request a place in the tournament
          </ButtonLink>
          <ButtonLink href={partnerHref} variant="outline-light" size="lg">
            Become a golf partner
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
