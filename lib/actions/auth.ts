"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado." };

  const fullName = String(formData.get("full_name") ?? "");
  const company = String(formData.get("company") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const defaultVoiceId = String(formData.get("default_voice_id") ?? "") || null;
  const defaultExportFormat = String(formData.get("default_export_format") ?? "mp3");

  const { error } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      company,
      phone,
      default_voice_id: defaultVoiceId,
      default_export_format: defaultExportFormat,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  return { success: "Perfil atualizado com sucesso." };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Informe o nome do projeto." };

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const colorIndex = (count ?? 0) % 4;

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name,
    color_class: [
      "bg-blue-600/20 text-blue-300",
      "bg-purple-600/20 text-purple-300",
      "bg-emerald-600/20 text-emerald-300",
      "bg-amber-600/20 text-amber-300",
    ][colorIndex],
  });

  if (error) return { error: error.message };
  return { success: true };
}
