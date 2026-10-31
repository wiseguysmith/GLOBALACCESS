import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { CompactHero } from "@/components/sections/CompactHero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <CompactHero
      eyebrow="404"
      title={
        <>
          This page could not be <span className="serif-accent text-gold">found.</span>
        </>
      }
      lede={<p>The page may have moved, or the link may be incorrect.</p>}
    >
      <div className="mt-10 flex flex-col gap-3 pb-16 xs:flex-row">
        <ButtonLink href="/" size="lg">
          Return to GLOBAL
        </ButtonLink>
        <ButtonLink href="/ecosystem" variant="outline-dark" size="lg">
          Explore the ecosystem
        </ButtonLink>
      </div>
    </CompactHero>
  );
}
