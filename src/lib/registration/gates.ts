import "server-only";

// Intentionally fail closed. An environment switch cannot bypass owner review.
export const launchApproval = {
  merchant: false,
  testOrders: false,
  inventoryAndRecovery: false,
  charityRulesAndFunding: false,
  hospitalityAndVip: false,
  lodging: false,
  summitLogistics: false,
  policiesAndSupport: false,
  imageryRights: false,
  monitoredDelivery: false,
  stagingReview: false,
} as const;

export function registrationMode(): "closed" | "test" | "live" {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const configured = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.STRIPE_WEBHOOK_SECRET && process.env.EVENT_PUBLIC_ORIGIN;
  if (!configured) return "closed";
  if (process.env.EVENT_CHECKOUT_MODE === "test" && key.startsWith("sk_test_") && process.env.CONTEXT !== "production") return "test";
  if (process.env.EVENT_CHECKOUT_MODE === "live" && key.startsWith("sk_live_") && Object.values(launchApproval).every(Boolean)) return "live";
  return "closed";
}
