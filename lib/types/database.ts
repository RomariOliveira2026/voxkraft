export type PlanId = "free" | "professional" | "enterprise";

export type Voice = {
  id: string;
  name: string;
  style: string;
  elevenlabs_voice_id: string;
  tags: string[];
  color_class: string;
  is_premium: boolean;
  preview_url: string | null;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  company: string | null;
  phone: string | null;
  avatar_url: string | null;
  default_voice_id: string | null;
  default_export_format: string;
  email?: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan: PlanId;
  minutes_limit: number;
  minutes_used: number;
  status: string;
  mercado_pago_subscription_id: string | null;
  mercado_pago_preference_id: string | null;
  current_period_start: string;
  current_period_end: string;
};

export type Project = {
  id: string;
  user_id: string;
  name: string;
  color_class: string;
  created_at: string;
  updated_at: string;
  audios_count?: number;
};

export type Audio = {
  id: string;
  user_id: string;
  project_id: string | null;
  voice_id: string;
  title: string;
  text_content: string;
  storage_path: string;
  duration_seconds: number;
  file_format: string;
  speed: number;
  stability: number;
  similarity: number;
  created_at: string;
  voice?: Pick<Voice, "name">;
  project?: Pick<Project, "name"> | null;
};

export type Invoice = {
  id: string;
  user_id: string;
  amount_cents: number;
  status: string;
  mercado_pago_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
};
