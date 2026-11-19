export const categories = ["golf", "summit", "sponsor", "vendor", "general", "future"] as const;
export type LeadCategory = typeof categories[number];
export const leadLabels: Record<LeadCategory, string> = { golf: "Apply for a Team Place", summit: "Request a Summit Invitation", sponsor: "Become a Sponsor", vendor: "Apply as a Vendor", general: "Ask a Question", future: "Join Future Editions" };
export const leadFields: Record<LeadCategory, { name: string; label: string; required?: boolean; options?: string[]; type?: string }[]> = {
  golf: [ { name: "teammateName", label: "Second golfer full name", required: true }, { name: "teammateEmail", label: "Second golfer email", type: "email", required: true }, { name: "background", label: "Professional background / role", required: true }, { name: "golfExperience", label: "Golf experience (optional)" } ],
  summit: [ { name: "role", label: "Professional role", required: true }, { name: "title", label: "Title", required: true }, { name: "linkedin", label: "LinkedIn profile", type: "url" }, { name: "aum", label: "Firm assets under management (optional)", options: ["Prefer not to say", "Under $100 million", "$100 million–$1 billion", "Over $1 billion"] }, { name: "interest", label: "Topics of interest", required: true }, { name: "referral", label: "Referral / how you heard about us" } ],
  sponsor: [ { name: "role", label: "Your role", required: true }, { name: "interest", label: "Partnership focus", required: true, options: ["Title / presenting", "Hole partner", "Long drive", "Closest to pin", "Hospitality", "Summit", "Global series", "Custom activation"] }, { name: "budget", label: "Approximate budget (optional)" }, { name: "edition", label: "Edition", required: true, options: ["San Antonio 2027", "Future editions", "Both"] } ],
  vendor: [ { name: "service", label: "Service or product", required: true }, { name: "edition", label: "Event day", required: true, options: ["Golf", "Summit", "Both"] }, { name: "requirements", label: "Space, electrical, or catering needs (optional)" } ],
  general: [ { name: "interest", label: "Question category", required: true, options: ["Tickets", "Lodging", "Sponsorship", "Vendor", "Accessibility", "Other"] } ],
  future: [ { name: "region", label: "City / region of interest", required: true }, { name: "interest", label: "I am interested as", required: true, options: ["Attendee", "Sponsor", "Both"] } ],
};
export function validateLead(category: LeadCategory, body: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const output: Record<string, string | boolean> = {};
  const fields = [{ name: "name", required: true }, { name: "email", required: true }, { name: "phone", required: category === "summit" }, { name: "organization", required: ["summit", "sponsor", "vendor"].includes(category) }, { name: "message", required: ["general", "sponsor", "vendor"].includes(category) }, ...leadFields[category]];
  for (const field of fields) {
    const value = typeof body[field.name] === "string" ? (body[field.name] as string).trim() : "";
    const max = field.name === "message" ? 3000 : 300;
    if ((field.required && !value) || value.length > max) errors[field.name] = `Please enter ${field.name} (${max} characters maximum).`;
    if ("options" in field && field.options && value && !field.options.includes(value)) errors[field.name] = "Choose one of the listed options.";
    output[field.name] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(output.email))) errors.email = "Enter a valid email address.";
  if (category === "golf") {
    output.teammateEmail = String(output.teammateEmail).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(output.teammateEmail))) errors.teammateEmail = "Enter a valid second golfer email address.";
    else if (output.teammateEmail === String(output.email).toLowerCase()) errors.teammateEmail = "Use a different email address for each golfer.";
    if (body.teammateConsent !== true) errors.teammateConsent = "Please confirm permission to provide your teammate’s details.";
    output.teammateConsent = body.teammateConsent === true;
  }
  if (output.linkedin) { try { const url = new URL(String(output.linkedin)); if (url.protocol !== "https:") throw new Error(); } catch { errors.linkedin = "Enter a valid HTTPS profile URL."; } }
  if (body.consent !== true) errors.consent = "Please acknowledge the privacy policy.";
  output.consent = body.consent === true;
  output.sponsorSharing = category === "summit" && body.sponsorSharing === true;
  output.email = String(output.email).toLowerCase();
  return { errors, output };
}
