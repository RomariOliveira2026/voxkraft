import { checkCredits, debitMinutes } from "@/lib/credits";
import { createClient } from "@/lib/supabase/server";
import { estimateDurationSeconds } from "@/lib/format";
import type { AudioGenerator, GenerateAudioInput, GenerateAudioResult } from "@/lib/audio/types";
import { getConfiguredVoiceProviderId, getVoiceProvider } from "@/lib/voice-providers";
import { resolveExternalVoiceId } from "@/lib/voice-providers/resolve-voice-id";

export class ProductionAudioGenerator implements AudioGenerator {
  async generate(input: GenerateAudioInput, userId: string): Promise<GenerateAudioResult> {
    const supabase = await createClient();
    const text = input.text.trim();
    const voiceId = input.voiceId;
    const projectId = input.projectId ?? null;
    const title = input.title?.trim() || "Áudio sem título";
    const speed = input.speed ?? 1;
    const stability = input.stability ?? 0.75;
    const similarity = input.similarity ?? 0.8;

    const { data: voice } = await supabase
      .from("voices")
      .select("*")
      .eq("id", voiceId)
      .single();

    if (!voice) {
      throw new Error("Voz não encontrada.");
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!subscription) {
      throw new Error("Assinatura não encontrada.");
    }

    const creditCheck = checkCredits({
      text,
      speed,
      voiceIsPremium: voice.is_premium,
      plan: subscription.plan,
      minutesLimit: subscription.minutes_limit,
      minutesUsed: Number(subscription.minutes_used),
    });

    if (!creditCheck.ok) {
      throw new Error(creditCheck.message);
    }

    const providerId = getConfiguredVoiceProviderId();
    const voiceProvider = getVoiceProvider(providerId);

    if (!voiceProvider.isAvailable()) {
      throw new Error(
        `Provedor de voz "${voiceProvider.displayName}" indisponível. Verifique as variáveis de ambiente.`,
      );
    }

    const { audioBuffer } = await voiceProvider.synthesize({
      text,
      externalVoiceId: resolveExternalVoiceId(voice, providerId),
      speed,
      stability,
      similarity,
    });

    const audioId = crypto.randomUUID();
    const storagePath = `${userId}/${audioId}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from("audios")
      .upload(storagePath, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const durationSeconds = estimateDurationSeconds(text, speed);

    const { data: audio, error: insertError } = await supabase
      .from("audios")
      .insert({
        id: audioId,
        user_id: userId,
        project_id: projectId,
        voice_id: voiceId,
        title,
        text_content: text,
        storage_path: storagePath,
        duration_seconds: durationSeconds,
        speed,
        stability,
        similarity,
      })
      .select("*, voice:voices(name)")
      .single();

    if (insertError) {
      await supabase.storage.from("audios").remove([storagePath]);
      throw new Error(insertError.message);
    }

    await supabase
      .from("subscriptions")
      .update({
        minutes_used: debitMinutes(Number(subscription.minutes_used), durationSeconds / 60),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (projectId) {
      await supabase
        .from("projects")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", projectId)
        .eq("user_id", userId);
    }

    const { data: signedUrl } = await supabase.storage
      .from("audios")
      .createSignedUrl(storagePath, 3600);

    if (!signedUrl?.signedUrl) {
      throw new Error("Não foi possível gerar URL do áudio.");
    }

    return {
      audio: {
        id: audio.id,
        title: audio.title,
        duration_seconds: audio.duration_seconds,
        voice_id: audio.voice_id,
        project_id: audio.project_id,
        created_at: audio.created_at,
      },
      url: signedUrl.signedUrl,
    };
  }
}

export const productionAudioGenerator = new ProductionAudioGenerator();
