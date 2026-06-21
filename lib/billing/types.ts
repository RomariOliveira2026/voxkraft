import type { PlanId } from "@/lib/types/database";

export type BillingProvider = "stripe" | "mercadopago" | "none";

export type CheckoutSessionResult = {
  prepared: boolean;
  provider: BillingProvider;
  checkoutUrl: string | null;
  sessionId: string | null;
  message: string | null;
  userId: string;
  planId: PlanId;
  amountCents: number | null;
};

export type PlanChangePayload = {
  userId: string;
  planId: PlanId;
  minutesLimit: number;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
};
