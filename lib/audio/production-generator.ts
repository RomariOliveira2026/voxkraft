import { createClient } from "@/lib/supabase/server";
import { generateSpeech } from "@/lib/elevenlabs";
import { estimateDurationSeconds } from "@/lib/format";
import type { AudioGenerator, GenerateAudioInput, GenerateAudioResult } from "@/lib/audio/types";

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

    const estimatedMinutes = estimateDurationSeconds(text, speed) / 60;
    const remainingMinutes = subscription.minutes_limit - Number(subscription.minutes_used);

    if (subscription.plan !== "enterprise" && estimatedMinutes > remainingMinutes) {
      throw new Error("Limite de minutos do plano atingido. Faça upgrade para continuar.");
    }

    if (voice.is_premium && subscription.plan === "free") {
      throw new Error("Esta voz está disponível apenas no plano Profissional.");
    }

    const audioBuffer = await generateSpeech({
      text,
      voiceId: voice.elevenlabs_voice_id,
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
        minutes_used: Number(subscription.minutes_used) + durationSeconds / 60,
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
