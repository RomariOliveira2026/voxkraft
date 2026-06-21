import type { Voice } from "@/lib/types/database";
import type { VoiceProviderId } from "@/lib/voice-providers/types";

/**
 * Resolve o ID externo da voz conforme o provedor ativo.
 * Futuro: coluna `provider_voice_id` ou mapa por provedor na tabela voices.
 */
export function resolveExternalVoiceId(voice: Voice, providerId: VoiceProviderId): string {
  switch (providerId) {
    case "elevenlabs":
      return voice.elevenlabs_voice_id;
    case "voxkraft":
      return voice.elevenlabs_voice_id;
    case "demo":
      return voice.id;
    default:
      return voice.elevenlabs_voice_id;
  }
}
