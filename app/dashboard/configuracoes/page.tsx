import { redirect } from "next/navigation";
import { ConfiguracoesForm } from "@/components/dashboard/configuracoes-form";
import { getCurrentUser, getUserProfile, getVoices } from "@/lib/data";

export default async function ConfiguracoesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [profile, voices] = await Promise.all([
    getUserProfile(user.id),
    getVoices(),
  ]);

  if (!profile) redirect("/login");

  return (
    <ConfiguracoesForm
      profile={{ ...profile, email: user.email }}
      voices={voices}
    />
  );
}
