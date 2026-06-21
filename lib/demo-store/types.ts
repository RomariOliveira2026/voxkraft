import type { Audio, PlanId, Project } from "@/lib/types/database";

export type DemoSubscription = {
  plan: PlanId;
  minutes_limit: number;
  minutes_used: number;
};

export type DemoAudioRecord = Audio & {
  demo_url: string;
  voice_name: string;
  project_name: string | null;
};

export type DemoStoreData = {
  subscription: DemoSubscription;
  projects: Project[];
  audios: DemoAudioRecord[];
};

export const EMPTY_DEMO_STORE: DemoStoreData = {
  subscription: {
    plan: "free",
    minutes_limit: 30,
    minutes_used: 0,
  },
  projects: [],
  audios: [],
};
