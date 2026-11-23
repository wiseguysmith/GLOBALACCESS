import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SAN_ANTONIO_PATH } from "@/config/invitational";

export const metadata = buildMetadata({
  title: "GLOBAL Invitational — International Series",
  description: "Exceptional settings. Considered connections. Discover the GLOBAL Invitational international series and San Antonio, February 3–4, 2027.",
  path: "/invitation",
});

export default function InvitationPage() {
  return (
    <div className="signature-page sg-series">
      <section className="sg-hero">
        <Image src="/images/briggs-clubhouse.webp" alt="An aerial view of the Spanish-style clubhouse and fairways at Briggs Ranch in warm evening light" fill preload quality={80} sizes="100vw" className="sg-hero-image"/>
        <div className="sg-hero-shade"/>
        <div className="sg-hero-inner">
          <div className="sg-edition-line"><Link href="/invitation">GLOBAL <em>Invitational</em></Link><span>The international series</span></div>
          <div className="sg-hero-copy"><p className="sg-kicker"><span/> Exceptional settings. Considered connections.</p><h1>The right people.<br/>Extraordinary places.<br/><em>Lasting connections.</em></h1><div className="sg-hero-bottom"><p>An invitation-led series connecting capital, markets,<br className="sg-desktop-break"/> and people through experiences worth sharing.</p><a href="#next-edition" className="sg-round-link" aria-label="Discover the next edition"><span>Discover the<br/>next edition</span><span className="sg-circle"><ArrowDown size={25} strokeWidth={1.3} aria-hidden="true"/></span></a></div></div>
          <div className="sg-hero-footer"><span>One network. A world of perspective.</span><span>Next / San Antonio 2027</span></div>
        </div>
      </section>

      <section className="sg-intro sg-container"><div className="sg-margin-note"><span className="sg-kicker">The GLOBAL Invitational</span><p>Experience opens<br/>the conversation.</p><span className="sg-tiny-mark" aria-hidden="true">G / I</span></div><div><h2>Access begins<br/>with <em>connection.</em></h2><div className="sg-intro-body"><p>We bring people together in settings that give good conversations room to become meaningful relationships.</p><p>The invitation-led series is being developed around a quarterly international rhythm: Day 1 golf, Day 2 Finance Summit. San Antonio is the inaugural edition. Further destinations and dates will be announced only when ready for public release.</p></div></div></section>

      <section id="next-edition" className="sg-series-feature"><Link href={SAN_ANTONIO_PATH} aria-label="Explore the San Antonio 2027 edition"><Image src="/images/briggs-fairway.webp" alt="Briggs Ranch fairways and water framed by the Texas Hill Country landscape" fill quality={80} sizes="(min-width: 900px) 55vw, 100vw"/></Link><div className="sg-series-feature-story"><p className="sg-kicker">The next edition / February 3–4, 2027</p><h2>San Antonio.<br/><em>A different kind<br/>of access.</em></h2><p>The inaugural edition: competitive golf at Briggs Ranch, followed by a planned day of finance keynotes, panels, educational workshops, a marketplace, and an evening reception.</p><div className="sg-series-feature-meta"><span>40 two-person golf teams</span><span>$10,000 / team</span><span>Golf + Summit</span></div><Link href={SAN_ANTONIO_PATH} className="sg-button sg-button-dark">Discover San Antonio 2027 <ArrowUpRight size={18}/></Link><p className="sg-small">Team participation is subject to review and acceptance. Summit-only attendance follows a separate invitation process.</p></div></section>

      <section className="sg-series-principles sg-container" aria-label="The Invitational philosophy">{[["01","The people","A considered community of founders, investors, family offices, advisors, and leaders. Curated for the quality of the conversation."],["02","The experience","Distinctive settings, thoughtful hospitality, and the time to connect. Each edition has a character of its own."],["03","The perspective","Ideas that cross markets and disciplines. The gathering is a starting point for learning, introductions, and collaboration."]].map(([number,title,body])=><article key={number}><span>{number} / GLOBAL Invitational</span><h2>{title}</h2><p>{body}</p></article>)}</section>

      <section className="sg-partners"><div className="sg-container"><p className="sg-kicker">The series continues</p><h2>One network.<br/><em>More horizons.</em></h2><div className="sg-partner-rows"><Link href="/invitation/inquire/future"><span className="sg-partner-number">01</span><span><h3>Be part of the next chapter.</h3><p>Future editions are planned across U.S. and international destinations. Receive updates as new locations and dates are confirmed.</p></span><span className="sg-partner-action">Get Future Event Updates<ArrowUpRight size={24} strokeWidth={1.2}/></span></Link><Link href="/invitation/inquire/sponsor"><span className="sg-partner-number">02</span><span><h3>Build something together.</h3><p>Explore sponsorship for San Antonio 2027. Future editions remain in planning; multi-city sponsorship packages are not currently offered.</p></span><span className="sg-partner-action">Explore a Partnership<ArrowUpRight size={24} strokeWidth={1.2}/></span></Link></div></div></section>
    </div>
  );
}
