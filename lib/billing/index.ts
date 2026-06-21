export type { BillingProvider, CheckoutSessionResult, PlanChangePayload } from "@/lib/billing/types";

export {
  buildPlanChangePayload,
  buildSubscriptionUpdateFromPlan,
  getCreditsLimitForPlan,
} from "@/lib/billing/apply-plan";

export {
  createStripeCheckoutSession,
  getStripePriceId,
  isStripeConfigured,
  type StripeWebhookEvent,
} from "@/lib/billing/stripe";

export { createCheckoutPreference } from "@/lib/mercadopago";

import { isStripeConfigured } from "@/lib/billing/stripe";
import type { BillingProvider } from "@/lib/billing/types";

export function getPreferredBillingProvider(): BillingProvider {
  if (isStripeConfigured()) return "stripe";
  if (process.env.MERCADO_PAGO_ACCESS_TOKEN) return "mercadopago";
  return "none";
}
