import Link from "next/link";
import { initiativeList } from "@/config/initiatives";
import { invitationNav, legalNav, regulatoryNotice, siteConfig } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowLink } from "@/components/ui/Button";

const organizationLinks = [
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-gold">{title}</h2>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center text-[0.94rem] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark relative bg-abyss text-white">
      <div className="container-x pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="GLOBAL — home" className="inline-flex">
              <Wordmark sublabel="Global Access" />
            </Link>
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug font-medium tracking-[-0.02em] text-white">
              Bridging Worlds.
              <br />
              <span className="serif-accent text-gold">Expanding Access.</span>
            </p>
            <div className="mt-8">
              <ArrowLink href="/contact" className="text-white">
                Connect with GLOBAL
              </ArrowLink>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8"
          >
            <FooterColumn
              title="Ecosystem"
              links={initiativeList.map((i) => ({ label: i.name, href: i.href }))}
            />
            <FooterColumn title="Invitation" links={invitationNav.slice(1)} />
            <FooterColumn title="Organization" links={organizationLinks} />
            <FooterColumn
              title={siteConfig.social.length ? "Follow" : "Legal"}
              links={siteConfig.social.length ? siteConfig.social : legalNav}
            />
          </nav>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="max-w-5xl text-xs leading-relaxed text-white/55">
            <span className="font-semibold text-white/70">Important notice. </span>
            {regulatoryNotice}
          </p>
          <div className="mt-8 flex flex-col gap-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. {siteConfig.domain}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
