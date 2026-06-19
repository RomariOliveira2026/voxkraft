import type { PlanId } from "@/lib/types/database";
import { getPlanById } from "@/lib/plans";

/**
 * Preparação para integração Mercado Pago.
 * Implementação real será conectada quando as credenciais estiverem configuradas.
 */
export async function createCheckoutPreference(userId: string, planId: PlanId) {
  const plan = getPlanById(planId);

  if (!plan.priceCents || planId === "free") {
    throw new Error("Plano inválido para checkout.");
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      prepared: true,
      checkoutUrl: null as string | null,
      message:
        "Integração Mercado Pago preparada. Configure MERCADO_PAGO_ACCESS_TOKEN para ativar pagamentos.",
      preferenceId: null as string | null,
      userId,
      planId,
      amountCents: plan.priceCents,
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: `VoxKraft — Plano ${plan.name}`,
          quantity: 1,
          unit_price: plan.priceCents / 100,
          currency_id: "BRL",
        },
      ],
      payer: { id: userId },
      back_urls: {
        success: `${appUrl}/dashboard/assinatura?status=success`,
        failure: `${appUrl}/dashboard/assinatura?status=failure`,
        pending: `${appUrl}/dashboard/assinatura?status=pending`,
      },
      auto_return: "approved",
      metadata: { user_id: userId, plan_id: planId },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mercado Pago: ${errorText}`);
  }

  const data = (await response.json()) as { id: string; init_point: string };

  return {
    prepared: true,
    checkoutUrl: data.init_point,
    message: null,
    preferenceId: data.id,
    userId,
    planId,
    amountCents: plan.priceCents,
  };
}
