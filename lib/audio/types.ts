export type GenerateAudioInput = {
  text: string;
  voiceId: string;
  projectId?: string | null;
  title?: string;
  speed?: number;
  stability?: number;
  similarity?: number;
};

export type GenerateAudioResult = {
  audio: {
    id: string;
    title: string;
    duration_seconds: number;
    voice_id: string;
    project_id: string | null;
    created_at: string;
  };
  url: string;
};

export type AudioGenerator = {
  generate(input: GenerateAudioInput, userId: string): Promise<GenerateAudioResult>;
};
