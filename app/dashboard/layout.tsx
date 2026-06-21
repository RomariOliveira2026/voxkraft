import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { AuthFeedbackBanner } from "@/components/auth/auth-feedback-banner";
import {
  getCurrentUser,
  getSubscription,
  getUserProfile,
} from "@/lib/data";
import { getPlanLabel } from "@/lib/plans";
import { getInitials } from "@/lib/format";
import { getDemoSession } from "@/lib/auth/demo-session";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser) redirect("/login");

    return (
      <AppShell
        userName={demoUser.fullName}
        userInitials={getInitials(demoUser.fullName)}
        planLabel="Plano Essencial (demo)"
      >
        <Suspense fallback={null}>
          <AuthFeedbackBanner />
        </Suspense>
        {children}
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
      <Suspense fallback={null}>
        <AuthFeedbackBanner />
      </Suspense>
      {children}
    </AppShell>
  );
}
