"use server";

import { redirect } from "next/navigation";
import { clearDemoSession, getDemoSession } from "@/lib/auth/demo-session";
import { PROJECT_COLORS } from "@/lib/constants/projects";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  if (!isSupabaseConfigured()) {
    await clearDemoSession();
    redirect("/login");
  }

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
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Informe o nome do projeto." };

  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser) return { error: "Não autenticado." };

    return { success: true, clientSide: true };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Não autenticado." };

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const colorIndex = (count ?? 0) % 4;

  const { error } = await supabase.from("projects").insert({
    user_id: user.id,
    name,
    color_class: PROJECT_COLORS[colorIndex],
  });

  if (error) return { error: error.message };
  return { success: true };
}
