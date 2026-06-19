import { AppShell } from "@/components/app/app-shell";
import { SetupRequired } from "@/components/setup/setup-required";
import {
  getCurrentUser,
  getSubscription,
  getUserProfile,
} from "@/lib/data";
import { getPlanLabel } from "@/lib/plans";
import { getInitials } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <AppShell
        userName="Configuração"
        userInitials="VK"
        planLabel="Ambiente local"
      >
        <SetupRequired />
      </AppShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [profile, subscription] = await Promise.all([
    getUserProfile(user.id),
    getSubscription(user.id),
  ]);

  return (
    <AppShell
      userName={profile?.full_name ?? user.email ?? "Usuário"}
      userInitials={getInitials(profile?.full_name ?? user.email)}
      planLabel={`Plano ${getPlanLabel(subscription?.plan ?? "free")}`}
    >
      {children}
    </AppShell>
  );
}
