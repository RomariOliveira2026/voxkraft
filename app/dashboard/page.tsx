import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { CreditsSummaryCard } from "@/components/dashboard/credits-summary-card";
import Link from "next/link";
import {
  getCurrentUser,
  getDashboardMetrics,
  getUserProfile,
} from "@/lib/data";
import { isDemoMode } from "@/lib/config/demo-mode";
import { getPlanById } from "@/lib/plans";
import { formatRelativeUpdate } from "@/lib/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getUserProfile(user.id);

  if (isDemoMode()) {
    return <DashboardClient userId={user.id} profile={profile} />;
  }

  const metrics = await getDashboardMetrics(user.id);
  const subscription = metrics.subscription;
  const plan = getPlanById(subscription?.plan ?? "free");
  const firstName = profile?.full_name?.split(" ")[0] ?? "Usuário";

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">Painel</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-400">
            Bem-vindo de volta, {firstName}. Aqui está o resumo da sua conta.
          </p>
        </div>

        <Link
          href="/dashboard/gerar-audio"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
          Gerar Novo Áudio
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Total de áudios gerados</p>
          <p className="mt-3 text-4xl font-black">{metrics.totalAudios}</p>
          <p className="mt-2 text-xs text-emerald-400">+{metrics.audiosThisMonth} este mês</p>
        </div>

        {subscription ? (
          <CreditsSummaryCard subscription={subscription} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Créditos do plano</p>
            <p className="mt-3 text-4xl font-black">—</p>
          </div>
        )}

        <div className="rounded-2xl border border-blue-500/30 bg-blue-600/10 p-6">
          <p className="text-sm text-blue-300">Plano atual</p>
          <p className="mt-3 text-4xl font-black">{plan.name}</p>
          <p className="mt-2 text-xs text-slate-400">{plan.price}</p>
          <Link
            href="/dashboard/assinatura"
            className="mt-4 inline-block text-sm font-medium text-blue-400 hover:underline"
          >
            Gerenciar assinatura →
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Últimos projetos</h2>
          <Link href="/dashboard/projetos" className="text-sm text-blue-400 hover:underline">
            Ver todos
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {metrics.recentProjects.length === 0 ? (
            <p className="text-sm text-slate-400 sm:col-span-3">
              Nenhum projeto criado ainda.
            </p>
          ) : (
            metrics.recentProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-white/10 bg-[#070B1F]/50 p-5 transition hover:border-white/20"
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${project.color_class}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-bold">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {project.audios_count ?? 0} áudios · {formatRelativeUpdate(project.updated_at)}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
