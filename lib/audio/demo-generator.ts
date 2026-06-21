import { createDemoAudio } from "@/lib/demo-store";
import type { AudioGenerator, GenerateAudioInput, GenerateAudioResult } from "@/lib/audio/types";

const DEMO_GENERATION_DELAY_MS = 1500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class DemoAudioGenerator implements AudioGenerator {
  async generate(input: GenerateAudioInput, userId: string): Promise<GenerateAudioResult> {
    await sleep(DEMO_GENERATION_DELAY_MS);

    const result = await createDemoAudio({
      userId,
      text: input.text,
      voiceId: input.voiceId,
      projectId: input.projectId,
      title: input.title,
      speed: input.speed,
      stability: input.stability,
      similarity: input.similarity,
    });

    return {
      audio: {
        id: result.audio.id,
        title: result.audio.title,
        duration_seconds: result.audio.duration_seconds,
        voice_id: result.audio.voice_id,
        project_id: result.audio.project_id,
        created_at: result.audio.created_at,
      },
      url: result.url,
    };
  }
}

export const demoAudioGenerator = new DemoAudioGenerator();
