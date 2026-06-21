import { redirect } from "next/navigation";
import { ProjetosClient } from "@/components/dashboard/projetos-client";
import { isDemoMode } from "@/lib/config/demo-mode";
import { getCurrentUser, getProjects } from "@/lib/data";

export default async function ProjetosPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const projects = await getProjects(user.id);

  return (
    <ProjetosClient
      projects={projects}
      userId={user.id}
      demoMode={isDemoMode()}
    />
  );
}
