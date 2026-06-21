import { getPlanById } from "@/lib/plans";
import type { PlanChangePayload } from "@/lib/billing/types";
import type { PlanId } from "@/lib/types/database";

/**
 * Mapeia plano → limite de créditos (minutos/mês).
 * Usado por webhooks Stripe/Mercado Pago quando pagamentos forem integrados.
 */
export function getCreditsLimitForPlan(planId: PlanId): number {
  const plan = getPlanById(planId);
  return plan.minutesLimit ?? 999_999;
}

export function buildPlanChangePayload(userId: string, planId: PlanId): PlanChangePayload {
  return {
    userId,
    planId,
    minutesLimit: getCreditsLimitForPlan(planId),
  };
}

export function buildSubscriptionUpdateFromPlan(planId: PlanId) {
  return {
    plan: planId,
    minutes_limit: getCreditsLimitForPlan(planId),
    minutes_used: 0,
    status: "active",
    updated_at: new Date().toISOString(),
  };
}
