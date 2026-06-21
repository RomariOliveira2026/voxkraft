import { demoAudioGenerator } from "@/lib/audio/demo-generator";
import { productionAudioGenerator } from "@/lib/audio/production-generator";
import type { AudioGenerator } from "@/lib/audio/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function getAudioGenerator(): AudioGenerator {
  if (isSupabaseConfigured()) {
    return productionAudioGenerator;
  }

  return demoAudioGenerator;
}

export type { GenerateAudioInput, GenerateAudioResult } from "@/lib/audio/types";
