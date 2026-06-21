import { getDemoSession } from "@/lib/auth/demo-session";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { voiceCatalog } from "@/lib/voices/catalog";
import type { Audio, Invoice, Project, Subscription, UserProfile, Voice } from "@/lib/types/database";

function demoSubscription(userId: string): Subscription {
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  return {
    id: "demo-subscription",
    user_id: userId,
    plan: "free",
    minutes_limit: 30,
    minutes_used: 0,
    status: "active",
    mercado_pago_subscription_id: null,
    mercado_pago_preference_id: null,
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
  };
}

function demoVoices(): Voice[] {
  return voiceCatalog.map((voice) => ({
    id: voice.slug,
    name: voice.name,
    style: voice.description,
    elevenlabs_voice_id: voice.slug,
    tags: voice.categories,
    color_class: voice.colorClass,
    is_premium: voice.isPremium ?? false,
    preview_url: voice.previewUrl,
  }));
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser) return null;

    return {
      id: demoUser.id,
      email: demoUser.email,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser || demoUser.id !== userId) return null;

    return {
      id: demoUser.id,
      full_name: demoUser.fullName,
      company: null,
      phone: null,
      avatar_url: null,
      default_voice_id: null,
      default_export_format: "mp3",
      email: demoUser.email,
    };
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return data;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser || demoUser.id !== userId) return null;
    return demoSubscription(userId);
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data;
}

export async function getVoices(): Promise<Voice[]> {
  if (!isSupabaseConfigured()) {
    return demoVoices();
  }

  const supabase = await createClient();
  const { data } = await supabase.from("voices").select("*").order("name");
  return data ?? [];
}

export async function getProjects(_userId: string): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", _userId)
    .order("updated_at", { ascending: false });

  if (!projects?.length) return [];

  const { data: audioCounts } = await supabase
    .from("audios")
    .select("project_id")
    .eq("user_id", _userId);

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

export async function getAudios(_userId: string): Promise<Audio[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("audios")
    .select("*, voice:voices(name), project:projects(name)")
    .eq("user_id", _userId)
    .order("created_at", { ascending: false });

  return (data ?? []) as Audio[];
}

export async function getInvoices(userId: string): Promise<Invoice[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getDashboardMetrics(userId: string) {
  if (!isSupabaseConfigured()) {
    return {
      subscription: demoSubscription(userId),
      totalAudios: 0,
      audiosThisMonth: 0,
      recentProjects: [] as Project[],
    };
  }

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

export { PROJECT_COLORS } from "@/lib/constants/projects";
