import { productionAudioGenerator } from "@/lib/audio/production-generator";
import type { AudioGenerator } from "@/lib/audio/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function getAudioGenerator(): AudioGenerator {
  if (!isSupabaseConfigured()) {
    throw new Error("Geração demo ocorre no navegador (localStorage).");
  }

  return productionAudioGenerator;
}

export type { GenerateAudioInput, GenerateAudioResult } from "@/lib/audio/types";
