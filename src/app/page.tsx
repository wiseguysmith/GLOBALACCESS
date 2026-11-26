import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import {
  BridgingWorldsSection,
  ConnectSection,
  EcosystemSection,
  SanAntonioInquirySection,
  InvitationFeatureSection,
  PhilosophySection,
} from "@/components/sections/home/HomeSections";

export const metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "GLOBAL connects capital, technology, markets, and people to unlock meaningful opportunities across borders — through Global Invitation, Global South Access, Global Digital Access, Global Capital Network, and Global Forum.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        size="full"
        eyebrow="Global Access Ecosystem"
        image={{
          src: "/images/hero-horizon.webp",
          alt: "Mountain peaks rising above a sea of clouds at dusk",
        }}
        imagePosition="center 60%"
        title={
          <>
            <Image
              src="/images/global-access-lockup.png"
              alt="GLOBAL Access"
              width={1600}
              height={533}
              sizes="(min-width: 640px) 360px, 75vw"
              loading="eager"
              className="-ml-[5%] mb-5 h-auto w-[min(75vw,22.5rem)] mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_68%,transparent_100%)]"
            />
            Bridging Worlds.
            <br />
            <span className="serif-accent text-gold">Expanding Access.</span>
          </>
        }
        lede={
          <p>
            Connecting capital, technology, markets, and people to unlock meaningful opportunities
            across borders.
          </p>
        }
        actions={
          <>
            <ButtonLink href="#san-antonio-2027" size="lg">
              Explore San Antonio 2027
            </ButtonLink>
            <ButtonLink href="/ecosystem" variant="outline-dark" size="lg">
              Explore Our Ecosystem
            </ButtonLink>
          </>
        }
      />
      <SanAntonioInquirySection />
      <EcosystemSection />
      <BridgingWorldsSection />
      <PhilosophySection />
      <InvitationFeatureSection />
      <ConnectSection />
    </>
  );
}
