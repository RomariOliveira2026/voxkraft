import { redirect } from "next/navigation";
import { BibliotecaClient } from "@/components/dashboard/biblioteca-client";
import { getCurrentUser, getVoices } from "@/lib/data";

export default async function BibliotecaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const voices = await getVoices();

  return <BibliotecaClient voices={voices} />;
}
