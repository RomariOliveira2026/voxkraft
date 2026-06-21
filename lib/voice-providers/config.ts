import type { VoiceProviderId } from "@/lib/voice-providers/types";

const VALID_PROVIDERS: VoiceProviderId[] = ["demo", "elevenlabs", "voxkraft"];

export function getConfiguredVoiceProviderId(): VoiceProviderId {
  const raw = process.env.VOICE_PROVIDER?.trim().toLowerCase();

  if (raw && VALID_PROVIDERS.includes(raw as VoiceProviderId)) {
    return raw as VoiceProviderId;
  }

  return "elevenlabs";
}

export function isVoiceProviderId(value: string): value is VoiceProviderId {
  return VALID_PROVIDERS.includes(value as VoiceProviderId);
}
