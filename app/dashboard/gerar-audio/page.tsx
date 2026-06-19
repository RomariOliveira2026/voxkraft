import { redirect } from "next/navigation";
import { GerarAudioForm } from "@/components/dashboard/gerar-audio-form";
import {
  getCurrentUser,
  getProjects,
  getUserProfile,
  getVoices,
} from "@/lib/data";

type PageProps = {
  searchParams: Promise<{ voz?: string; projeto?: string }>;
};

export default async function GerarAudioPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  const [voices, projects, profile] = await Promise.all([
    getVoices(),
    getProjects(user.id),
    getUserProfile(user.id),
  ]);

  const initialVoiceId =
    params.voz ?? profile?.default_voice_id ?? voices[0]?.id;

  return (
    <GerarAudioForm
      voices={voices}
      projects={projects}
      initialVoiceId={initialVoiceId}
      initialProjectId={params.projeto}
    />
  );
}
