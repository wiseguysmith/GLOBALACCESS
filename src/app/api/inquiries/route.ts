import { handleSubmission } from "@/lib/submissions/handle";

/** Receives general and partnership inquiries from /contact. */
export async function POST(request: Request) {
  return handleSubmission(request, "inquiry");
}
