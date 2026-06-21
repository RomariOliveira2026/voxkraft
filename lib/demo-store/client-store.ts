import {
  DEMO_STORE_STORAGE_PREFIX,
  DEMO_STORE_UPDATED_EVENT,
} from "@/lib/demo-store/constants";
import {
  createDemoAudioInStore,
  createDemoProjectInStore,
  deleteDemoAudioInStore,
  getAudiosFromStore,
  getDashboardMetricsFromStore,
  getEmptyDemoStore,
  getProjectsFromStore,
  buildDemoSubscription,
  type CreateDemoAudioInput,
} from "@/lib/demo-store/operations";
import { EMPTY_DEMO_STORE, type DemoStoreData } from "@/lib/demo-store/types";
import type { Audio, Project } from "@/lib/types/database";

function storageKey(userId: string) {
  return `${DEMO_STORE_STORAGE_PREFIX}${userId}`;
}

export function readClientDemoStore(userId: string): DemoStoreData {
  if (typeof window === "undefined") {
    return getEmptyDemoStore();
  }

  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return getEmptyDemoStore();
    return JSON.parse(raw) as DemoStoreData;
  } catch {
    return getEmptyDemoStore();
  }
}

export function writeClientDemoStore(userId: string, store: DemoStoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(userId), JSON.stringify(store));
}

export function notifyDemoStoreUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DEMO_STORE_UPDATED_EVENT));
}

export function getClientAudios(userId: string): Audio[] {
  return getAudiosFromStore(readClientDemoStore(userId));
}

export function getClientProjects(userId: string): Project[] {
  return getProjectsFromStore(readClientDemoStore(userId));
}

export function getClientDashboardMetrics(userId: string) {
  const store = readClientDemoStore(userId);
  return getDashboardMetricsFromStore(userId, store);
}

export function getClientSubscription(userId: string) {
  const store = readClientDemoStore(userId);
  return buildDemoSubscription(userId, store);
}

export function createClientDemoAudio(input: CreateDemoAudioInput) {
  const store = readClientDemoStore(input.userId);
  const result = createDemoAudioInStore(store, input);
  writeClientDemoStore(input.userId, result.store);
  notifyDemoStoreUpdated();
  return result;
}

export function createClientDemoProject(userId: string, name: string) {
  const store = readClientDemoStore(userId);
  const nextStore = createDemoProjectInStore(store, userId, name);
  writeClientDemoStore(userId, nextStore);
  notifyDemoStoreUpdated();
}

export function deleteClientDemoAudio(userId: string, audioId: string) {
  const store = readClientDemoStore(userId);
  const nextStore = deleteDemoAudioInStore(store, audioId);
  writeClientDemoStore(userId, nextStore);
  notifyDemoStoreUpdated();
}

export function getClientDemoAudioUrl(_userId: string, _audioId: string) {
  return "/audio/demo.mp3";
}

export { EMPTY_DEMO_STORE };
