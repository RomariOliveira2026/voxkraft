import { PROJECT_COLORS } from "@/lib/constants/projects";
import { DEMO_AUDIO_URL } from "@/lib/demo-store/constants";
import {
  EMPTY_DEMO_STORE,
  type DemoAudioRecord,
  type DemoStoreData,
} from "@/lib/demo-store/types";
import { checkCredits, debitMinutes, refundMinutes } from "@/lib/credits";
import { estimateDurationSeconds } from "@/lib/format";
import type { Audio, Project, Subscription } from "@/lib/types/database";
import { voiceCatalog } from "@/lib/voices/catalog";

export function buildDemoSubscription(userId: string, store: DemoStoreData): Subscription {
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

export function demoRecordToAudio(record: DemoAudioRecord): Audio {
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

export function getProjectsFromStore(store: DemoStoreData): Project[] {
  return store.projects.map((project) => ({
    ...project,
    audios_count: store.audios.filter((audio) => audio.project_id === project.id).length,
  }));
}

export function getAudiosFromStore(store: DemoStoreData): Audio[] {
  return store.audios
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(demoRecordToAudio);
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

export function createDemoAudioInStore(
  store: DemoStoreData,
  input: CreateDemoAudioInput,
): { store: DemoStoreData; audio: Audio; url: string } {
  const voice = voiceCatalog.find((item) => item.slug === input.voiceId);
  if (!voice) {
    throw new Error("Voz não encontrada.");
  }

  const subscription = buildDemoSubscription(input.userId, store);
  const speed = input.speed ?? 1;

  const creditCheck = checkCredits({
    text: input.text,
    speed,
    voiceIsPremium: voice.isPremium,
    plan: subscription.plan,
    minutesLimit: subscription.minutes_limit,
    minutesUsed: subscription.minutes_used,
  });

  if (!creditCheck.ok) {
    throw new Error(creditCheck.message);
  }

  const durationSeconds = estimateDurationSeconds(input.text, speed);

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
    storage_path: DEMO_AUDIO_URL,
    duration_seconds: durationSeconds,
    file_format: "mp3",
    speed,
    stability: input.stability ?? 0.75,
    similarity: input.similarity ?? 0.8,
    created_at: now,
    demo_url: DEMO_AUDIO_URL,
    voice_name: voice.name,
    project_name: project?.name ?? null,
  };

  const nextStore: DemoStoreData = structuredClone(store);
  nextStore.audios.unshift(record);
  nextStore.subscription.minutes_used = debitMinutes(
    nextStore.subscription.minutes_used,
    durationSeconds / 60,
  );

  if (project) {
    const index = nextStore.projects.findIndex((item) => item.id === project.id);
    if (index >= 0) {
      nextStore.projects[index] = {
        ...nextStore.projects[index],
        updated_at: now,
      };
    }
  }

  return {
    store: nextStore,
    audio: demoRecordToAudio(record),
    url: DEMO_AUDIO_URL,
  };
}

export function createDemoProjectInStore(
  store: DemoStoreData,
  userId: string,
  name: string,
): DemoStoreData {
  const now = new Date().toISOString();
  const nextStore = structuredClone(store);

  nextStore.projects.unshift({
    id: crypto.randomUUID(),
    user_id: userId,
    name: name.trim(),
    color_class: PROJECT_COLORS[nextStore.projects.length % PROJECT_COLORS.length],
    created_at: now,
    updated_at: now,
  });

  return nextStore;
}

export function deleteDemoAudioInStore(store: DemoStoreData, audioId: string): DemoStoreData {
  const nextStore = structuredClone(store);
  const index = nextStore.audios.findIndex((audio) => audio.id === audioId);
  if (index === -1) return store;

  const [removed] = nextStore.audios.splice(index, 1);
  nextStore.subscription.minutes_used = refundMinutes(
    nextStore.subscription.minutes_used,
    removed.duration_seconds / 60,
  );

  return nextStore;
}

export function getDashboardMetricsFromStore(userId: string, store: DemoStoreData) {
  const subscription = buildDemoSubscription(userId, store);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const audiosThisMonth = store.audios.filter(
    (audio) => new Date(audio.created_at) >= monthStart,
  ).length;

  const projects = getProjectsFromStore(store);

  return {
    subscription,
    totalAudios: store.audios.length,
    audiosThisMonth,
    recentProjects: projects.slice(0, 3),
  };
}

export function getEmptyDemoStore(): DemoStoreData {
  return structuredClone(EMPTY_DEMO_STORE);
}
