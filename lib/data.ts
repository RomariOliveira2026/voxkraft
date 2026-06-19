import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Audio, Invoice, Project, Subscription, UserProfile, Voice } from "@/lib/types/database";

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return data;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data;
}

export async function getVoices(): Promise<Voice[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("voices").select("*").order("name");
  return data ?? [];
}

export async function getProjects(userId: string): Promise<Project[]> {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (!projects?.length) return [];

  const { data: audioCounts } = await supabase
    .from("audios")
    .select("project_id")
    .eq("user_id", userId);

  const countMap = (audioCounts ?? []).reduce<Record<string, number>>((acc, audio) => {
    if (audio.project_id) {
      acc[audio.project_id] = (acc[audio.project_id] ?? 0) + 1;
    }
    return acc;
  }, {});

  return projects.map((project) => ({
    ...project,
    audios_count: countMap[project.id] ?? 0,
  }));
}

export async function getAudios(userId: string): Promise<Audio[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("audios")
    .select("*, voice:voices(name), project:projects(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []) as Audio[];
}

export async function getInvoices(userId: string): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getDashboardMetrics(userId: string) {
  const supabase = await createClient();
  const subscription = await getSubscription(userId);

  const { count: totalAudios } = await supabase
    .from("audios")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { count: audiosThisMonth } = await supabase
    .from("audios")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", monthStart.toISOString());

  const projects = await getProjects(userId);

  return {
    subscription,
    totalAudios: totalAudios ?? 0,
    audiosThisMonth: audiosThisMonth ?? 0,
    recentProjects: projects.slice(0, 3),
  };
}

export const PROJECT_COLORS = [
  "bg-blue-600/20 text-blue-300",
  "bg-purple-600/20 text-purple-300",
  "bg-emerald-600/20 text-emerald-300",
  "bg-amber-600/20 text-amber-300",
];
