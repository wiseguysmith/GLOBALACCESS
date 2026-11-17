import "server-only";
export function leadDeliveryReady() {
  return process.env.EVENT_LEADS_ENABLED === "true" && !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY && !!process.env.EVENT_NOTIFY_TO && !!process.env.RESEND_API_KEY && !!process.env.SUBMISSIONS_NOTIFY_FROM && !!process.env.EVENT_PUBLIC_ORIGIN && (process.env.EVENT_LINK_SECRET?.length ?? 0) >= 32 && (process.env.EVENT_ADMIN_SECRET?.length ?? 0) >= 32 && process.env.EVENT_MAIL_WORKER_VERIFIED === "true";
}
