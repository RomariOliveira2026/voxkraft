import type {
  SynthesizeSpeechInput,
  SynthesizeSpeechResult,
  VoiceProvider,
} from "@/lib/voice-providers/types";

export class DemoVoiceProvider implements VoiceProvider {
  readonly id = "demo" as const;
  readonly displayName = "VoxKraft Demo";

  isAvailable() {
    return false;
  }

  async synthesize(_input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult> {
    throw new Error(
      "Provedor demo: síntese ocorre no navegador (localStorage). Use o fluxo client-side.",
    );
  }
}

export const demoVoiceProvider = new DemoVoiceProvider();
