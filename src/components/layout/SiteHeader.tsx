import Link from "next/link";
import { invitationNav, primaryCta, primaryNav } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileNav } from "@/components/navigation/MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header surface-dark fixed inset-x-0 top-0 z-50 text-white">
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="GLOBAL — home"
          className="inline-flex min-h-11 items-center text-white"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks items={primaryNav} />
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
          </div>
          <MobileNav items={primaryNav} secondary={invitationNav} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
