import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import {
  BridgingWorldsSection,
  ConnectSection,
  EcosystemSection,
  HeroIndex,
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
            <ButtonLink href="/ecosystem" size="lg">
              Explore Our Ecosystem
            </ButtonLink>
            <ButtonLink href="/invitation" variant="outline-dark" size="lg">
              Discover Global Invitation
            </ButtonLink>
          </>
        }
      >
        <HeroIndex />
      </PageHero>
      <EcosystemSection />
      <BridgingWorldsSection />
      <PhilosophySection />
      <InvitationFeatureSection />
      <ConnectSection />
    </>
  );
}
