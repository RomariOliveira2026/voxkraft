import type { PlanId } from "@/lib/types/database";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  price: string;
  priceCents: number | null;
  minutesLimit: number | null;
  features: string[];
};

export const PLANS: PlanDefinition[] = [
  {
    id: "free",
    name: "Essencial",
    price: "Grátis",
    priceCents: 0,
    minutesLimit: 30,
    features: ["30 min/mês", "Biblioteca básica", "MP3"],
  },
  {
    id: "professional",
    name: "Profissional",
    price: "R$ 49/mês",
    priceCents: 4900,
    minutesLimit: 300,
    features: ["5 horas/mês", "Todas as vozes", "MP3 e WAV", "Uso comercial"],
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "Sob consulta",
    priceCents: null,
    minutesLimit: null,
    features: ["Volume personalizado", "Vozes exclusivas", "API", "Suporte prioritário"],
  },
];

export function getPlanById(planId: PlanId) {
  return PLANS.find((plan) => plan.id === planId) ?? PLANS[0];
}

export function getPlanLabel(planId: PlanId) {
  return getPlanById(planId).name;
}
