/**
 * Shared validation for public submission forms.
 * Imported by client components (instant feedback) and route handlers
 * (authoritative server-side validation). Dependency-free by design.
 */

export const interestOptions = [
  "Global Networking",
  "Investment and Capital Markets",
  "Entrepreneurship",
  "Technology and Innovation",
  "Global South Development",
  "Strategic Partnerships",
  "Events and Experiences",
] as const;

export const inquiryTopics = [
  { value: "general", label: "General inquiry" },
  { value: "experiences", label: "Global Invitation experiences and events" },
  { value: "partnership", label: "Partnership or sponsorship" },
  { value: "south", label: "Global South Access" },
  { value: "digital", label: "Global Digital Access" },
  { value: "capital", label: "Global Capital Network" },
  { value: "forum", label: "Global Forum — contribute or interview" },
  { value: "media", label: "Media" },
] as const;

export type InterestOption = (typeof interestOptions)[number];
export type InquiryTopic = (typeof inquiryTopics)[number]["value"];

export interface ApplicationInput {
  fullName: string;
  email: string;
  organization: string;
  title: string;
  country: string;
  interest: string;
  background: string;
  reason: string;
  consent: boolean;
  event?: string;
}

export interface InquiryInput {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
  consent: boolean;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const limits = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  organization: { min: 2, max: 160 },
  title: { min: 2, max: 120 },
  country: { min: 2, max: 80 },
  longText: { min: 40, max: 1500 },
  message: { min: 20, max: 2000 },
} as const;

// Pragmatic email check: one @, a dot in the domain, no whitespace.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeText(value: unknown, max = 4000): string {
  if (typeof value !== "string") return "";
  // Remove control characters (keeping newlines and tabs), collapse runs of spaces.
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

function checkLength(
  value: string,
  label: string,
  { min, max }: { min?: number; max?: number },
): string | undefined {
  if (!value) return `${label} is required.`;
  if (min && value.length < min) return `${label} should be at least ${min} characters.`;
  if (max && value.length > max) return `${label} should be ${max} characters or fewer.`;
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  if (!value) return "Email is required.";
  if (value.length > limits.email.max || !EMAIL_RE.test(value)) {
    return "Enter a valid email address, such as name@organization.com.";
  }
  return undefined;
}

export function validateApplication(input: ApplicationInput): FieldErrors<ApplicationInput> {
  const errors: FieldErrors<ApplicationInput> = {};
  const set = (key: keyof ApplicationInput, message: string | undefined) => {
    if (message) errors[key] = message;
  };
  set("fullName", checkLength(input.fullName, "Full name", limits.name));
  set("email", validateEmail(input.email));
  set("organization", checkLength(input.organization, "Organization", limits.organization));
  set("title", checkLength(input.title, "Professional title", limits.title));
  set("country", checkLength(input.country, "Country or region", limits.country));
  if (!input.interest) errors.interest = "Select a primary area of interest.";
  else if (!(interestOptions as readonly string[]).includes(input.interest)) {
    errors.interest = "Select one of the listed areas of interest.";
  }
  set(
    "background",
    checkLength(input.background, "Professional background", limits.longText),
  );
  set("reason", checkLength(input.reason, "Your reason for requesting an invitation", limits.longText));
  if (!input.consent) errors.consent = "Please confirm you have read the Privacy Policy.";
  return errors;
}

export function validateInquiry(input: InquiryInput): FieldErrors<InquiryInput> {
  const errors: FieldErrors<InquiryInput> = {};
  const nameError = checkLength(input.name, "Name", limits.name);
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(input.email);
  if (emailError) errors.email = emailError;
  if (input.organization && input.organization.length > limits.organization.max) {
    errors.organization = `Organization should be ${limits.organization.max} characters or fewer.`;
  }
  if (!inquiryTopics.some((t) => t.value === input.topic)) errors.topic = "Select a topic.";
  const messageError = checkLength(input.message, "Message", limits.message);
  if (messageError) errors.message = messageError;
  if (!input.consent) errors.consent = "Please confirm you have read the Privacy Policy.";
  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
