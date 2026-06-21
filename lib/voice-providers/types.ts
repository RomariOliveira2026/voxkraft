export type VoiceProviderId = "demo" | "elevenlabs" | "voxkraft";

export type SynthesizeSpeechInput = {
  text: string;
  externalVoiceId: string;
  speed?: number;
  stability?: number;
  similarity?: number;
};

export type SynthesizeSpeechResult = {
  audioBuffer: Buffer;
  mimeType: string;
  provider: VoiceProviderId;
};

export interface VoiceProvider {
  readonly id: VoiceProviderId;
  readonly displayName: string;
  isAvailable(): boolean;
  synthesize(input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult>;
}

/** Job de TTS para fila assíncrona (implementação futura). */
export type TtsJobStatus = "queued" | "processing" | "completed" | "failed";

export type TtsJob = {
  id: string;
  user_id: string;
  voice_id: string;
  status: TtsJobStatus;
  provider: VoiceProviderId;
  storage_path: string | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
};
