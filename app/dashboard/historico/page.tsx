import { redirect } from "next/navigation";
import { HistoricoClient } from "@/components/dashboard/historico-client";
import { getAudios, getCurrentUser } from "@/lib/data";

export default async function HistoricoPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const audios = await getAudios(user.id);

  return <HistoricoClient audios={audios} />;
}
