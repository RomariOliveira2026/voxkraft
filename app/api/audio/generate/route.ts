import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateSpeech } from "@/lib/elevenlabs";
import { estimateDurationSeconds } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await request.json();
    const text = String(body.text ?? "").trim();
    const voiceId = String(body.voiceId ?? "");
    const projectId = body.projectId ? String(body.projectId) : null;
    const title = String(body.title ?? "").trim() || "Áudio sem título";
    const speed = Number(body.speed ?? 1);
    const stability = Number(body.stability ?? 0.75);
    const similarity = Number(body.similarity ?? 0.8);

    if (!text) {
      return NextResponse.json({ error: "Informe o texto." }, { status: 400 });
    }

    if (!voiceId) {
      return NextResponse.json({ error: "Selecione uma voz." }, { status: 400 });
    }

    const { data: voice } = await supabase
      .from("voices")
      .select("*")
      .eq("id", voiceId)
      .single();

    if (!voice) {
      return NextResponse.json({ error: "Voz não encontrada." }, { status: 404 });
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!subscription) {
      return NextResponse.json({ error: "Assinatura não encontrada." }, { status: 404 });
    }

    const estimatedMinutes = estimateDurationSeconds(text, speed) / 60;
    const remainingMinutes = subscription.minutes_limit - Number(subscription.minutes_used);

    if (subscription.plan !== "enterprise" && estimatedMinutes > remainingMinutes) {
      return NextResponse.json(
        { error: "Limite de minutos do plano atingido. Faça upgrade para continuar." },
        { status: 403 },
      );
    }

    if (voice.is_premium && subscription.plan === "free") {
      return NextResponse.json(
        { error: "Esta voz está disponível apenas no plano Profissional." },
        { status: 403 },
      );
    }

    const audioBuffer = await generateSpeech({
      text,
      voiceId: voice.elevenlabs_voice_id,
      speed,
      stability,
      similarity,
    });

    const audioId = crypto.randomUUID();
    const storagePath = `${user.id}/${audioId}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from("audios")
      .upload(storagePath, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const durationSeconds = estimateDurationSeconds(text, speed);

    const { data: audio, error: insertError } = await supabase
      .from("audios")
      .insert({
        id: audioId,
        user_id: user.id,
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
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    await supabase
      .from("subscriptions")
      .update({
        minutes_used: Number(subscription.minutes_used) + durationSeconds / 60,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (projectId) {
      await supabase
        .from("projects")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", projectId)
        .eq("user_id", user.id);
    }

    const { data: signedUrl } = await supabase.storage
      .from("audios")
      .createSignedUrl(storagePath, 3600);

    return NextResponse.json({
      audio,
      url: signedUrl?.signedUrl ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao gerar áudio.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
