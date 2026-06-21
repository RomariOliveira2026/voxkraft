import { getConfiguredVoiceProviderId } from "@/lib/voice-providers/config";
import { demoVoiceProvider } from "@/lib/voice-providers/demo-provider";
import { elevenLabsVoiceProvider } from "@/lib/voice-providers/elevenlabs-provider";
import { voxKraftVoiceProvider } from "@/lib/voice-providers/voxkraft-provider";
import type { VoiceProvider, VoiceProviderId } from "@/lib/voice-providers/types";

const providers: Record<VoiceProviderId, VoiceProvider> = {
  demo: demoVoiceProvider,
  elevenlabs: elevenLabsVoiceProvider,
  voxkraft: voxKraftVoiceProvider,
};

export function getVoiceProvider(id?: VoiceProviderId): VoiceProvider {
  const providerId = id ?? getConfiguredVoiceProviderId();
  return providers[providerId];
}

export function listVoiceProviders(): VoiceProvider[] {
  return Object.values(providers);
}

export type {
  SynthesizeSpeechInput,
  SynthesizeSpeechResult,
  TtsJob,
  TtsJobStatus,
  VoiceProvider,
  VoiceProviderId,
} from "@/lib/voice-providers/types";

export { getConfiguredVoiceProviderId, isVoiceProviderId } from "@/lib/voice-providers/config";
