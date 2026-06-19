import { redirect } from "next/navigation";
import { ProjetosClient } from "@/components/dashboard/projetos-client";
import { getCurrentUser, getProjects } from "@/lib/data";

export default async function ProjetosPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const projects = await getProjects(user.id);

  return <ProjetosClient projects={projects} />;
}
