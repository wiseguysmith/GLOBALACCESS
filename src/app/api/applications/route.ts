import { handleSubmission } from "@/lib/submissions/handle";

/** Receives Global Invitation requests from /invitation/apply. */
export async function POST(request: Request) {
  return handleSubmission(request, "application");
}
