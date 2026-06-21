import { generateSpeech } from "@/lib/elevenlabs";
import type {
  SynthesizeSpeechInput,
  SynthesizeSpeechResult,
  VoiceProvider,
} from "@/lib/voice-providers/types";

export class ElevenLabsVoiceProvider implements VoiceProvider {
  readonly id = "elevenlabs" as const;
  readonly displayName = "ElevenLabs";

  isAvailable() {
    return Boolean(process.env.ELEVENLABS_API_KEY?.trim());
  }

  async synthesize(input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult> {
    const audioBuffer = await generateSpeech({
      text: input.text,
      voiceId: input.externalVoiceId,
      speed: input.speed,
      stability: input.stability,
      similarity: input.similarity,
    });

    return {
      audioBuffer,
      mimeType: "audio/mpeg",
      provider: this.id,
    };
  }
}

export const elevenLabsVoiceProvider = new ElevenLabsVoiceProvider();
