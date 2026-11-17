import { notFound } from "next/navigation";
import { categories, leadLabels, type LeadCategory } from "@/lib/registration/leads";
import { EventLeadForm } from "@/components/forms/EventLeadForm";
import { SAN_ANTONIO_PATH } from "@/config/invitational";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { leadDeliveryReady } from "@/lib/registration/lead-readiness";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return buildMetadata({ title: leadLabels[category as LeadCategory] ?? "Event inquiry", description: "Connect with the GLOBAL Invitational event team.", path: `/invitation/inquire/${category}` });
}
export default async function InquiryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; if (!categories.includes(category as LeadCategory)) notFound();
  const kind = category as LeadCategory;
  const enabled = leadDeliveryReady();
  return <div className="invitational-page"><section className="event-section event-utility-page"><div className="container-x max-w-4xl"><Link href={SAN_ANTONIO_PATH} className="text-sm underline">← Back to San Antonio 2027</Link><p className="eyebrow text-gold-ink mt-12">GLOBAL Invitational</p><h1 className="event-heading mt-6 mb-10">{leadLabels[kind]}</h1><EventLeadForm category={kind} enabled={enabled}/></div></section></div>;
}
