import { db } from "@/lib/registration/backend";
import { categories, validateLead, type LeadCategory } from "@/lib/registration/leads";
import { readEventRequest, reply, requestError } from "@/lib/registration/request";
import { leadDeliveryReady } from "@/lib/registration/lead-readiness";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!leadDeliveryReady()) return reply({ error: "Online event inquiries are not open yet. Your information has not been submitted. Please email info@globalaccess.live." }, 503);
  try {
    const body = await readEventRequest(request);
    if (!categories.includes(body.category as LeadCategory)) return reply({ error: "Choose an inquiry type." }, 422);
    if (body.category === "golf" && process.env.EVENT_GOLF_APPLICATIONS_ENABLED !== "true") return reply({ error: "Online team applications are opening soon. Please email info@globalaccess.live to apply. No payment is requested." }, 503);
    const { errors, output } = validateLead(body.category as LeadCategory, body);
    if (Object.keys(errors).length) return reply({ error: "Please correct the highlighted fields.", fieldErrors: errors }, 422);
    const reference = await db<string>("rpc/save_event_lead", "POST", { p_category: body.category, p_payload: { ...output, consentAt: new Date().toISOString(), source: typeof body.source === "string" ? body.source.slice(0, 300) : "" }, p_notify: process.env.EVENT_NOTIFY_TO });
    return reply({ reference }, 201);
  } catch (error) { return requestError(error); }
}
