export const TEAM_PRICE = 1_000_000;
export const TEAM_CAPACITY = 40;
export type PaymentMode = "full" | "split";
export type TeamStatus = "HELD_PENDING_PAYMENT" | "PARTIALLY_PAID" | "PAYMENT_PROCESSING" | "PAID_CONFIRMED" | "EXPIRED" | "PAYMENT_FAILED" | "MANUAL_REVIEW" | "REFUND_PENDING" | "REFUNDED" | "CANCELED";
export interface Golfer { name: string; email: string }
export function obligations(mode: PaymentMode): number[] {
  return mode === "split" ? [TEAM_PRICE / 2, TEAM_PRICE / 2] : [TEAM_PRICE];
}
export function teamStatus(payments: { amount: number; status: string }[], expected: number, previous: TeamStatus): TeamStatus {
  if (["MANUAL_REVIEW", "REFUND_PENDING", "REFUNDED", "CANCELED"].includes(previous)) return previous;
  const paid = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  if (paid > expected) return "MANUAL_REVIEW";
  if (paid === expected) return previous === "EXPIRED" ? "MANUAL_REVIEW" : "PAID_CONFIRMED";
  if (payments.some(p => p.status === "processing")) return "PAYMENT_PROCESSING";
  if (paid > 0) return "PARTIALLY_PAID";
  if (payments.some(p => p.status === "failed")) return "PAYMENT_FAILED";
  return previous;
}
export function validateGolfers(value: unknown): value is [Golfer, Golfer] {
  if (!Array.isArray(value) || value.length !== 2) return false;
  return value.every(p => p && typeof p.name === "string" && p.name.trim().length >= 2 && p.name.length <= 120 && typeof p.email === "string" && p.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) && value[0].email.trim().toLowerCase() !== value[1].email.trim().toLowerCase();
}
