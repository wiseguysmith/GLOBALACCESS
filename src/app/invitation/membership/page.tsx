import { permanentRedirect } from "next/navigation";

// Membership has been retired. This route permanently redirects to Participation.
// Safe to delete: next.config.ts also redirects /invitation/membership.
export default function MembershipRedirect() {
  permanentRedirect("/invitation/participation");
}
