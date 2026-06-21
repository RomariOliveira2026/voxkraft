import { getPlanById } from "@/lib/plans";
import type { CheckoutSessionResult } from "@/lib/billing/types";
import type { PlanId } from "@/lib/types/database";

/**
 * Estrutura preparada para integração Stripe (Fase 2).
 * Não ativa pagamentos até STRIPE_SECRET_KEY e price IDs estarem configurados.
 */
export function isStripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_PROFESSIONAL &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
}

export function getStripePriceId(planId: PlanId): string | null {
  if (planId === "professional") {
    return process.env.STRIPE_PRICE_PROFESSIONAL ?? null;
  }

  if (planId === "enterprise") {
    return process.env.STRIPE_PRICE_ENTERPRISE ?? null;
  }

  return null;
}

export async function createStripeCheckoutSession(
  userId: string,
  planId: PlanId,
  customerEmail?: string,
): Promise<CheckoutSessionResult> {
  const plan = getPlanById(planId);

  if (!plan.priceCents || planId === "free") {
    throw new Error("Plano inválido para checkout Stripe.");
  }

  if (!isStripeConfigured()) {
    return {
      prepared: true,
      provider: "stripe",
      checkoutUrl: null,
      sessionId: null,
      message:
        "Integração Stripe preparada. Configure STRIPE_SECRET_KEY, STRIPE_PRICE_PROFESSIONAL e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY para ativar pagamentos.",
      userId,
      planId,
      amountCents: plan.priceCents,
    };
  }

  // Ponto de extensão: instalar `stripe` e criar Checkout Session aqui.
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({ ... });

  return {
    prepared: true,
    provider: "stripe",
    checkoutUrl: null,
    sessionId: null,
    message: "Stripe configurado. Implemente createStripeCheckoutSession com o SDK oficial.",
    userId,
    planId,
    amountCents: plan.priceCents,
  };
}

export type StripeWebhookEvent = {
  type: "checkout.session.completed" | "customer.subscription.updated" | "customer.subscription.deleted";
  userId: string;
  planId: PlanId;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
};
