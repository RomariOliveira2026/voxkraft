import type {
  SynthesizeSpeechInput,
  SynthesizeSpeechResult,
  VoiceProvider,
} from "@/lib/voice-providers/types";

/**
 * Stub do motor proprietário VoxKraft.
 * Futuro: HTTP para serviço TTS dedicado (VOXKRAFT_TTS_URL).
 */
export class VoxKraftVoiceProvider implements VoiceProvider {
  readonly id = "voxkraft" as const;
  readonly displayName = "VoxKraft TTS";

  isAvailable() {
    return Boolean(process.env.VOXKRAFT_TTS_URL?.trim());
  }

  async synthesize(_input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult> {
    const baseUrl = process.env.VOXKRAFT_TTS_URL?.trim();

    if (!baseUrl) {
      throw new Error(
        "Motor VoxKraft ainda não configurado. Defina VOXKRAFT_TTS_URL quando o serviço TTS estiver disponível.",
      );
    }

    // Ponto de integração futuro com serviço TTS proprietário.
    throw new Error(
      "Motor VoxKraft em desenvolvimento. Consulte /docs/modelo-proprio.md.",
    );
  }
}

export const voxKraftVoiceProvider = new VoxKraftVoiceProvider();
