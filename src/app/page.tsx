import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import {
  BridgingWorldsSection,
  ConnectSection,
  EcosystemSection,
  FeaturedExperienceSection,
  HeroIndex,
  HumanElementSection,
  PerspectivesSection,
  PhilosophySection,
} from "@/components/sections/home/HomeSections";
import { AccessLevels } from "@/components/sections/AccessLevels";

export const metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "GLOBAL is an international ecosystem connecting people, capital, markets, and technology through curated relationships, strategic partnerships, and distinctive experiences.",
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
            An international ecosystem connecting people, capital, markets, and technology through
            curated relationships and strategic collaboration.
          </p>
        }
        actions={
          <>
            <ButtonLink href="/ecosystem" size="lg">
              Explore GLOBAL
            </ButtonLink>
            <ButtonLink href="/invitation/experiences" variant="outline-dark" size="lg">
              Discover Our Experiences
            </ButtonLink>
          </>
        }
      >
        <HeroIndex />
      </PageHero>
      <HumanElementSection />
      <EcosystemSection />
      <BridgingWorldsSection />
      <FeaturedExperienceSection />
      <PerspectivesSection />
      <PhilosophySection />
      <AccessLevels />
      <ConnectSection />
    </>
  );
}
