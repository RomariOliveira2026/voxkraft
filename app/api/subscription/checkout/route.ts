import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutPreference } from "@/lib/mercadopago";
import type { PlanId } from "@/lib/types/database";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await request.json();
    const planId = String(body.planId ?? "") as PlanId;

    if (!["professional", "enterprise"].includes(planId)) {
      return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
    }

    if (planId === "enterprise") {
      return NextResponse.json({
        message: "Entre em contato com vendas para o plano Empresarial.",
        contact: true,
      });
    }

    const checkout = await createCheckoutPreference(user.id, planId);

    if (checkout.preferenceId) {
      await supabase
        .from("subscriptions")
        .update({
          mercado_pago_preference_id: checkout.preferenceId,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    }

    return NextResponse.json(checkout);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao iniciar checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
