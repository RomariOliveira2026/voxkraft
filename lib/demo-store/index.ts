import { PROJECT_COLORS } from "@/lib/constants/projects";
import { readDemoStore, updateDemoStore } from "@/lib/demo-store/storage";
import type { DemoAudioRecord, DemoStoreData } from "@/lib/demo-store/types";
import { estimateDurationSeconds } from "@/lib/format";
import type { Audio, Project, Subscription } from "@/lib/types/database";
import { voiceCatalog } from "@/lib/voices/catalog";

function buildSubscription(userId: string, store: DemoStoreData): Subscription {
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  return {
    id: "demo-subscription",
    user_id: userId,
    plan: store.subscription.plan,
    minutes_limit: store.subscription.minutes_limit,
    minutes_used: store.subscription.minutes_used,
    status: "active",
    mercado_pago_subscription_id: null,
    mercado_pago_preference_id: null,
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
  };
}

function toAudio(record: DemoAudioRecord): Audio {
  return {
    id: record.id,
    user_id: record.user_id,
    project_id: record.project_id,
    voice_id: record.voice_id,
    title: record.title,
    text_content: record.text_content,
    storage_path: record.storage_path,
    duration_seconds: record.duration_seconds,
    file_format: record.file_format,
    speed: record.speed,
    stability: record.stability,
    similarity: record.similarity,
    created_at: record.created_at,
    voice: { name: record.voice_name },
    project: record.project_name ? { name: record.project_name } : null,
  };
}

export async function getDemoSubscription(userId: string) {
  const store = await readDemoStore(userId);
  return buildSubscription(userId, store);
}

export async function getDemoProjects(userId: string): Promise<Project[]> {
  const store = await readDemoStore(userId);

  return store.projects.map((project) => ({
    ...project,
    audios_count: store.audios.filter((audio) => audio.project_id === project.id).length,
  }));
}

export async function getDemoAudios(userId: string): Promise<Audio[]> {
  const store = await readDemoStore(userId);
  return store.audios
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(toAudio);
}

export async function getDemoAudioById(userId: string, audioId: string) {
  const store = await readDemoStore(userId);
  const record = store.audios.find((audio) => audio.id === audioId);
  if (!record) return null;
  return { record, audio: toAudio(record) };
}

export async function createDemoProject(userId: string, name: string) {
  const now = new Date().toISOString();

  return updateDemoStore(userId, (store) => {
    const project: Project = {
      id: crypto.randomUUID(),
      user_id: userId,
      name: name.trim(),
      color_class: PROJECT_COLORS[store.projects.length % PROJECT_COLORS.length],
      created_at: now,
      updated_at: now,
    };

    store.projects.unshift(project);
    return store;
  });
}

export type CreateDemoAudioInput = {
  userId: string;
  text: string;
  voiceId: string;
  projectId?: string | null;
  title?: string;
  speed?: number;
  stability?: number;
  similarity?: number;
};

export async function createDemoAudio(input: CreateDemoAudioInput) {
  const voice = voiceCatalog.find((item) => item.slug === input.voiceId);
  if (!voice) {
    throw new Error("Voz não encontrada.");
  }

  const store = await readDemoStore(input.userId);
  const subscription = buildSubscription(input.userId, store);

  if (voice.isPremium && subscription.plan === "free") {
    throw new Error("Esta voz está disponível apenas no plano Profissional.");
  }

  const speed = input.speed ?? 1;
  const durationSeconds = estimateDurationSeconds(input.text, speed);
  const estimatedMinutes = durationSeconds / 60;
  const remainingMinutes = subscription.minutes_limit - subscription.minutes_used;

  if (subscription.plan !== "enterprise" && estimatedMinutes > remainingMinutes) {
    throw new Error("Limite de minutos do plano atingido. Faça upgrade para continuar.");
  }

  const project = input.projectId
    ? store.projects.find((item) => item.id === input.projectId)
    : null;

  if (input.projectId && !project) {
    throw new Error("Projeto não encontrado.");
  }

  const now = new Date().toISOString();
  const audioId = crypto.randomUUID();
  const title =
    input.title?.trim() ||
    input.text.trim().slice(0, 60).replace(/\s+/g, " ") ||
    "Áudio sem título";

  const record: DemoAudioRecord = {
    id: audioId,
    user_id: input.userId,
    project_id: project?.id ?? null,
    voice_id: voice.slug,
    title,
    text_content: input.text.trim(),
    storage_path: voice.previewUrl,
    duration_seconds: durationSeconds,
    file_format: "mp3",
    speed,
    stability: input.stability ?? 0.75,
    similarity: input.similarity ?? 0.8,
    created_at: now,
    demo_url: voice.previewUrl,
    voice_name: voice.name,
    project_name: project?.name ?? null,
  };

  const nextStore = await updateDemoStore(input.userId, (current) => {
    current.audios.unshift(record);
    current.subscription.minutes_used += durationSeconds / 60;

    if (project) {
      const index = current.projects.findIndex((item) => item.id === project.id);
      if (index >= 0) {
        current.projects[index] = {
          ...current.projects[index],
          updated_at: now,
        };
      }
    }

    return current;
  });

  return {
    audio: toAudio(record),
    url: record.demo_url,
    subscription: buildSubscription(input.userId, nextStore),
  };
}

export async function deleteDemoAudio(userId: string, audioId: string) {
  await updateDemoStore(userId, (store) => {
    const index = store.audios.findIndex((audio) => audio.id === audioId);
    if (index === -1) return store;

    const [removed] = store.audios.splice(index, 1);
    store.subscription.minutes_used = Math.max(
      0,
      store.subscription.minutes_used - removed.duration_seconds / 60,
    );

    return store;
  });
}

export async function getDemoDashboardMetrics(userId: string) {
  const store = await readDemoStore(userId);
  const subscription = buildSubscription(userId, store);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const audiosThisMonth = store.audios.filter(
    (audio) => new Date(audio.created_at) >= monthStart,
  ).length;

  const projects = await getDemoProjects(userId);

  return {
    subscription,
    totalAudios: store.audios.length,
    audiosThisMonth,
    recentProjects: projects.slice(0, 3),
  };
}
