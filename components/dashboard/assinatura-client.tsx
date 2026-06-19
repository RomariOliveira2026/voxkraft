"use client";

import Link from "next/link";
import { useState } from "react";
import { PLANS, getPlanById } from "@/lib/plans";
import type { Invoice, Subscription } from "@/lib/types/database";
import { formatDate, formatMinutesUsed } from "@/lib/format";

type AssinaturaClientProps = {
  subscription: Subscription;
  invoices: Invoice[];
  audiosThisMonth: number;
};

export function AssinaturaClient({
  subscription,
  invoices,
  audiosThisMonth,
}: AssinaturaClientProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const currentPlan = getPlanById(subscription.plan);
  const usagePercent = Math.min(
    100,
    Math.round((Number(subscription.minutes_used) / subscription.minutes_limit) * 100),
  );

  async function handleUpgrade(planId: string) {
    setLoadingPlan(planId);
    setMessage(null);

    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao processar upgrade.");
      }

      if (data.contact) {
        setMessage(data.message);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      setMessage(data.message ?? "Checkout preparado. Configure o Mercado Pago para ativar pagamentos.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao processar upgrade.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-blue-400">Conta</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Assinatura</h1>
        <p className="mt-2 text-slate-400">Gerencie seu plano, uso e faturamento.</p>
      </header>

      {message && (
        <p className="rounded-xl border border-blue-500/30 bg-blue-600/10 px-4 py-3 text-sm text-blue-200">
          {message}
        </p>
      )}

      <div className="rounded-2xl border border-blue-500/30 bg-blue-600/10 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-blue-300">Plano atual</p>
            <h2 className="mt-1 text-2xl font-bold">{currentPlan.name}</h2>
            <p className="mt-1 text-slate-400">
              {currentPlan.price}
              {subscription.current_period_end
                ? ` · Renova em ${formatDate(subscription.current_period_end)}`
                : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleUpgrade("professional")}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
          >
            Gerenciar pagamento
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-[#070B1F]/50 p-4">
            <p className="text-sm text-slate-400">Minutos usados</p>
            <p className="mt-1 text-xl font-bold">{formatMinutesUsed(Number(subscription.minutes_used))}</p>
            <p className="text-xs text-slate-500">
              de {formatMinutesUsed(subscription.minutes_limit)}
            </p>
          </div>
          <div className="rounded-xl bg-[#070B1F]/50 p-4">
            <p className="text-sm text-slate-400">Áudios este mês</p>
            <p className="mt-1 text-xl font-bold">{audiosThisMonth}</p>
            <p className="text-xs text-slate-500">gerados no período</p>
          </div>
          <div className="rounded-xl bg-[#070B1F]/50 p-4">
            <p className="text-sm text-slate-400">Próxima cobrança</p>
            <p className="mt-1 text-xl font-bold">
              {subscription.plan === "professional" ? "R$ 49,00" : "—"}
            </p>
            <p className="text-xs text-slate-500">
              {subscription.current_period_end
                ? formatDate(subscription.current_period_end)
                : "Sem cobrança"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Uso mensal</span>
            <span>{usagePercent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold">Comparar planos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 ${
                subscription.plan === plan.id
                  ? "border-blue-500 bg-blue-600/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {subscription.plan === plan.id && (
                <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium">
                  Atual
                </span>
              )}
              <h3 className={`font-bold ${subscription.plan === plan.id ? "mt-2" : ""}`}>
                {plan.name}
              </h3>
              <p className="mt-2 text-2xl font-black">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {subscription.plan !== plan.id && (
                <button
                  type="button"
                  disabled={loadingPlan === plan.id}
                  onClick={() => handleUpgrade(plan.id)}
                  className="mt-5 w-full rounded-full border border-white/20 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:opacity-60"
                >
                  {loadingPlan === plan.id
                    ? "Processando..."
                    : plan.id === "enterprise"
                      ? "Falar com vendas"
                      : "Fazer upgrade"}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-bold">Histórico de faturas</h2>
        <div className="mt-4 divide-y divide-white/10">
          {invoices.length === 0 ? (
            <p className="py-4 text-sm text-slate-400">Nenhuma fatura registrada ainda.</p>
          ) : (
            invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{formatDate(invoice.created_at)}</p>
                  <p className="text-sm text-slate-400">
                    R$ {(invoice.amount_cents / 100).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-400">
                    {invoice.status === "paid" ? "Pago" : invoice.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <p className="text-center text-sm text-slate-500">
        Precisa de ajuda?{" "}
        <Link href="/" className="text-blue-400 hover:underline">
          Entre em contato com o suporte
        </Link>
      </p>
    </div>
  );
}
