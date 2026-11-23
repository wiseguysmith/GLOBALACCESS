import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Flag, Plus } from "lucide-react";
import { publicEventApprovals, TEAM_APPLICATION_PATH, eventFaqs, tournamentDetails, tournamentDetailsPending } from "@/config/invitational";
import { SignatureGallery } from "./SignatureGallery";
import { SummitProgram } from "./SummitProgram";

export function InvitationalEvent() {
  return (
    <div className="signature-page sg-event">
      <section className="sg-hero" aria-label="GLOBAL Invitational San Antonio 2027">
        <Image className="sg-hero-image" src="/images/briggs-aerial.webp" alt="Golden light over the fairways and casitas at Briggs Ranch Golf Club in San Antonio" fill preload quality={80} sizes="100vw"/>
        <div className="sg-hero-shade"/>
        <div className="sg-hero-inner">
          <div className="sg-edition-line"><Link href="/invitation">GLOBAL <em>Invitational</em></Link><span>San Antonio, Texas <i/> 2027 Edition</span></div>
          <div className="sg-hero-copy">
            <p className="sg-kicker"><span/> Selective entry. Meaningful competition.</p>
            <h1>A curated field.<br/><em>A competitive spirit.</em></h1>
            <div className="sg-hero-bottom">
              <div><p className="sg-hero-description">Forty two-person teams. Eighteen holes at Briggs Ranch.<br className="sg-desktop-break"/> Competitive golf followed by the Future in Finance Summit.</p><p className="sg-hero-entry">$10,000 per team · Participation subject to approval</p><div className="sg-hero-actions"><Link href={TEAM_APPLICATION_PATH} className="sg-button">Apply for a Team Place <ArrowUpRight size={18}/></Link><Link href="/invitation/inquire/sponsor" className="sg-text-link">Explore Sponsorship <ArrowUpRight size={18}/></Link></div></div>
              <a className="sg-round-link" href="#overview" aria-label="Discover the San Antonio edition"><span>Discover the<br/>San Antonio edition</span><span className="sg-circle"><ArrowDown size={25} strokeWidth={1.3} aria-hidden="true"/></span></a>
            </div>
          </div>
          <div className="sg-hero-footer"><span>Briggs Ranch Golf Club · Future in Finance Summit</span><span>February 3–4, 2027</span></div>
        </div>
      </section>

      <div className="sg-facts" aria-label="Event at a glance">
        <div><span>When</span><strong>February 3–4<span>, 2027</span></strong></div>
        <div><span>Where</span><strong>San Antonio<span>, Texas</span></strong></div>
        <div><span>The golf field</span><strong>40 teams<span> / 80 golfers</span></strong></div>
        <a href="#register"><span>Your team experience</span><strong>$10,000<span> / two golfers</span></strong><ArrowUpRight size={22} strokeWidth={1.3}/></a>
      </div>

      <nav className="sg-subnav" aria-label="Event sections"><div className="sg-container"><a href="#golf">01 <span>The Invitational</span></a><a href="#competition">Competition details</a><a href="#summit">02 <span>The Summit</span></a><a href="#summit-program">Program preview</a><a href="#partners">Sponsorship</a><a href="#register" className="sg-subnav-cta">Team selection <ArrowUpRight size={16}/></a></div></nav>

      <section id="overview" className="sg-intro sg-container">
        <div className="sg-margin-note"><span className="sg-kicker">The San Antonio edition</span><p>Good company.<br/>Shared perspective.<br/>A world of possibility.</p><span className="sg-tiny-mark" aria-hidden="true">G / I</span></div>
        <div><h2>Some conversations<br/>deserve a <em>different setting.</em></h2><div className="sg-intro-body"><p>A round at a remarkable private course. A room of people thinking about what comes next. The GLOBAL Invitational brings both together.</p><p>Join a curated gathering of investors, family offices, founders, advisors, and financial-market leaders for two connected days in San Antonio. Relationships begin on the fairway. The conversation continues at the Future in Finance Summit.</p></div></div>
      </section>

      <section id="golf" className="sg-golf">
        <div className="sg-golf-photo"><Image src="/images/briggs-green.webp" alt="A flag on the second green at Briggs Ranch framed by oak trees and the evening sky" fill quality={80} sizes="(min-width: 900px) 55vw, 100vw"/><span className="sg-image-caption">Briggs Ranch Golf Club · San Antonio</span></div>
        <div className="sg-golf-story">
          <div className="sg-day-marker"><span>01</span><p>Wednesday<br/><strong>February 3, 2027</strong></p><Flag size={21} strokeWidth={1.1}/></div>
          <p className="sg-kicker">The Golf Invitational</p>
          <h2>An extraordinary round.<br/><em>An extraordinary room.</em></h2>
          <p>Briggs Ranch. A private Tom Fazio design in the Texas Hill Country. A field of 40 two-person teams, and the space to make a conversation count.</p>
          <p>Expect meaningful competition alongside considered connections. Teams are reviewed before acceptance, bringing a selective field together for 18 holes of competitive golf and the following day’s Summit.</p>
          <div className="sg-course-specs"><div><strong>18</strong><span>Holes of golf</span></div><div><strong>40</strong><span>Two-person teams</span></div><div><strong>01</strong><span>Exceptional course</span></div></div>
          <Link href={TEAM_APPLICATION_PATH} className="sg-text-link">Apply for a Team Place <ArrowUpRight size={18}/></Link>
        </div>
      </section>

      <section id="competition" className="sg-format sg-container" aria-labelledby="competition-heading"><div><p className="sg-kicker">The competition</p><h2 id="competition-heading">The field is curated.<br/><em>The golf is competitive.</em></h2><p>Forty two-person teams. Eighteen holes. Tournament format, handicap requirements, and official competition rules will be announced once finalized.</p><span className="sg-format-status">{tournamentDetailsPending ? "Final competition details to follow" : "Competition details"}</span></div><dl className="sg-format-details">{tournamentDetails.map(detail=><div key={detail.label}><dt>{detail.label}</dt><dd className={detail.value ? "" : "sg-format-pending"}>{detail.value ?? "To be confirmed"}</dd></div>)}</dl></section>

      <section id="summit" className="sg-summit">
        <div className="sg-container">
          <div className="sg-summit-top"><div className="sg-day-marker"><span>02</span><p>Thursday<br/><strong>February 4, 2027</strong></p></div><p>San Antonio, Texas<br/><span>Venue to be announced</span></p></div>
          <div className="sg-summit-title"><p className="sg-kicker">Future in Finance Summit</p><h2>The next conversation<br/>is about <em>what’s next.</em></h2><p>From financial fundamentals to new market infrastructure. A planned day of keynotes, panels, educational workshops, a marketplace, and an evening reception.</p></div>
          <div className="sg-summit-grid"><div className="sg-summit-image"><Image src="/images/conference.webp" alt="Editorial photograph of a conference audience, illustrating the Summit conversation" fill quality={80} sizes="(min-width: 900px) 45vw, 100vw"/><span>Editorial image · Summit venue to be announced</span></div><div className="sg-summit-program"><p className="sg-kicker">Perspectives that cross boundaries</p>{[["01","Main-stage keynotes & panels"],["02","Practical educational workshops"],["03","Marketplace & professional connections"],["04","An evening reception"]].map(([number,title])=><div key={number}><span>{number}</span><h3>{title}</h3><ArrowUpRight size={20} strokeWidth={1}/></div>)}<p>Golf participants receive two Summit admissions with their fully paid team. Summit-only guests follow a separate invitation process.</p><Link href="/invitation/inquire/summit" className="sg-text-link">Request a Summit Invitation <ArrowUpRight size={18}/></Link><p className="sg-program-footnote">Planned Summit-only admission: $1,200, including marketplace access. Subject to final registration terms; payment is not open.</p></div></div>
        </div>
      </section>

      <SummitProgram/>

      <section id="venue" className="sg-venue">
        <div className="sg-container sg-section-head"><div><p className="sg-kicker">A sense of place</p><h2>A setting that<br/><em>changes the conversation.</em></h2></div><p>The landscape. The architecture. The moments between. Discover the private-club character of Briggs Ranch.</p></div>
        <SignatureGallery/>
        <div className="sg-container sg-venue-foot"><span>Briggs Ranch Golf Club / Dormie Network</span><span>Tom Fazio design · Texas Hill Country</span></div>
      </section>

      <section id="included" className="sg-package">
        <div className="sg-container sg-package-layout">
          <div className="sg-package-intro"><p className="sg-kicker">Your team experience</p><h2>One team.<br/>Two days.<br/><em>More possibilities.</em></h2><p>The fairways are the beginning. Your golf-team package brings the complete two-day experience together for both players.</p><div className="sg-package-stamp"><span>GLOBAL</span><em>Invitational</em><small>San Antonio / 2027</small></div></div>
          <div className="sg-package-details"><div className="sg-package-price"><p>$10,000</p><span>USD / two-person team<br/>Subject to acceptance</span></div><p className="sg-package-status">{publicEventApprovals.bundledHospitality ? "Included for both golfers" : "Planned inclusions · final arrangements being secured"}</p><ul>{["Two entries in the Golf Invitational","Food & beverages on both days","Two Future in Finance Summit admissions","Summit marketplace access (planned)","VIP fireside-chat access","Private side-room / salon access","Company-hosted dinner seating"].map(item=><li key={item}><Check size={16} strokeWidth={1.4}/><span>{item}</span></li>)}</ul><p className="sg-package-note">VIP experiences are part of the planned golf package. Food and beverages remain subject to contracts. Overnight accommodation is not promised with admission. Application review comes before payment.</p><Link className="sg-button sg-button-dark" href={TEAM_APPLICATION_PATH}>Apply for a Team Place <ArrowUpRight size={19}/></Link><p className="sg-small">Summit only? <Link href="/invitation/inquire/summit">Request an invitation separately.</Link></p></div>
        </div>
      </section>

      <section id="charity" className="sg-impact sg-container"><span className="sg-impact-number" aria-hidden="true">Beyond<br/>the score.</span><div><p className="sg-kicker">Competition with purpose</p><h2>Play for<br/><em>something larger.</em></h2><p>{publicEventApprovals.charityGuarantee ? "Teams will compete for a guaranteed $100,000 charitable purse, supporting eligible causes through the event’s official charitable award process." : "Charitable impact is central to the Invitational. The charitable program, eligible causes, and official award rules will be announced after funding and rules are approved."}</p><small>The charitable program benefits eligible causes; it is not a personal cash prize for golfers.</small></div></section>

      <section className="sg-stay"><div className="sg-stay-image"><Image src="/images/briggs-casita.webp" alt="A Briggs Ranch casita with a shaded terrace beside the course" fill quality={80} sizes="(min-width: 900px) 60vw, 100vw"/></div><div className="sg-stay-copy"><p className="sg-kicker">Stay & hospitality</p><h2>Make room<br/>for <em>the experience.</em></h2><p>Southwestern architecture. Quiet terraces. A private-club setting that extends beyond the course.</p><p>On-site stays are limited to up to 60 golfer beds across 15 casitas, against a field of 80. Eligibility, dates, allocations, and any inclusion or additional cost will be confirmed separately. An on-site room is not guaranteed for every golfer.</p><Link className="sg-text-link" href="/invitation/inquire/general">Ask about your stay <ArrowUpRight size={18}/></Link></div></section>

      <section id="register" className="sg-registration sg-container"><div><p className="sg-kicker">A considered path to the field</p><h2>Your team.<br/><em>By invitation.</em></h2><p>Submit your two-person team for organizer review. Participation is subject to approval. Accepted teams will be invited to complete secure payment when registration opens; team confirmation follows full payment.</p><ol className="sg-entry-steps">{["Application","Organizer review","Acceptance","Secure payment","Team confirmation"].map((step,index)=><li key={step}><span>0{index+1}</span>{step}</li>)}</ol><div className="sg-pay-options"><div><span>After acceptance · one payer</span><strong>$10,000</strong><small>One complete team</small></div><div><span>After acceptance · linked payers</span><strong>$5,000 <i>each</i></strong><small>Both payments required</small></div></div><p className="sg-small">40 teams total. Applications do not reserve a place. No payment is requested with an application.</p></div><div className="sg-registration-panel"><p className="sg-kicker">Selective entry. Competitive golf.</p><h3>Apply for your place<br/>in the field.</h3><p>$10,000 per two-person team, subject to acceptance. Share both golfers’ details and your interest in the Invitational for organizer review.</p><Link href={TEAM_APPLICATION_PATH} className="sg-button sg-button-dark">Apply for a Team Place <ArrowUpRight size={18}/></Link><Link href="/invitation/inquire/sponsor" className="sg-text-link">Explore Sponsorship <ArrowUpRight size={18}/></Link><p className="sg-small">Questions? <a href="mailto:info@globalaccess.live">info@globalaccess.live</a></p></div></section>

      <section id="faq" className="sg-faq sg-container"><div><p className="sg-kicker">Before you join us</p><h2>A few<br/><em>good details.</em></h2><p>Questions about the experience?<br/><a href="mailto:info@globalaccess.live">info@globalaccess.live</a></p></div><div>{eventFaqs.map(([question,answer])=><details key={question}><summary>{question}<Plus size={18} strokeWidth={1.2}/></summary><p>{answer}</p></details>)}</div></section>

      <section id="partners" className="sg-partners"><div className="sg-container"><p className="sg-kicker">A shared ambition</p><h2>Be part of<br/><em>what comes together.</em></h2><div className="sg-partner-rows">{[["01","Partner with the San Antonio edition","Explore title, presenting, golf, hospitality, educational-track, workshop, and marketplace opportunities. Current sponsorship discussions cover San Antonio 2027 only; entitlements are confirmed separately.","sponsor","Become a Sponsor"],["02","Bring something exceptional","Apply to provide a service or product for golf, the Summit, or both. Placement and admission are reviewed separately.","vendor","Apply as a Vendor"],["03","Start a conversation","Tickets, travel, accessibility, or an idea worth exploring. Connect with the event team.","general","Ask a Question"]].map(([number,title,body,kind,cta])=><Link key={kind} href={`/invitation/inquire/${kind}`}><span className="sg-partner-number">{number}</span><span><h3>{title}</h3><p>{body}</p></span><span className="sg-partner-action">{cta}<ArrowUpRight size={24} strokeWidth={1.2}/></span></Link>)}</div></div></section>

      <section className="sg-closing"><Image src="/images/briggs-veranda.webp" alt="Evening light on the Briggs Ranch clubhouse veranda" fill quality={80} sizes="100vw"/><div className="sg-closing-shade"/><div className="sg-container"><p className="sg-kicker">The GLOBAL Invitational series</p><h2>San Antonio is<br/><em>only the beginning.</em></h2><p>One network. New perspectives. Further editions planned across U.S. and international destinations.</p><div><Link href="/invitation/inquire/future" className="sg-button">Get Future Event Updates <ArrowUpRight size={18}/></Link><Link href="/invitation" className="sg-text-link">Discover the series <ArrowRight size={18}/></Link></div><small>Future locations and dates will be announced when confirmed.</small></div></section>

      <aside className="sg-booking-bar" aria-label="Participation shortcuts"><Link href="/invitation" className="sg-booking-mark">GLOBAL <em>Invitational</em></Link><p>$10,000 per team <span> / Subject to approval</span></p><div><Link href="/invitation/inquire/sponsor" className="sg-booking-secondary">Explore Sponsorship <ArrowUpRight size={15}/></Link><Link href={TEAM_APPLICATION_PATH} className="sg-button">Apply for a Team Place<ArrowUpRight size={16}/></Link></div></aside>
    </div>
  );
}
