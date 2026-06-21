import { NextResponse } from "next/server";
import { getAudioGenerator } from "@/lib/audio";
import { getDemoSession } from "@/lib/auth/demo-session";
import { getCurrentUser } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = String(body.text ?? "").trim();
    const voiceId = String(body.voiceId ?? "");
    const projectId = body.projectId ? String(body.projectId) : null;
    const title = String(body.title ?? "").trim() || undefined;
    const speed = Number(body.speed ?? 1);
    const stability = Number(body.stability ?? 0.75);
    const similarity = Number(body.similarity ?? 0.8);

    if (!text) {
      return NextResponse.json({ error: "Informe o texto." }, { status: 400 });
    }

    if (!voiceId) {
      return NextResponse.json({ error: "Selecione uma voz." }, { status: 400 });
    }

    let userId: string | null = null;

    if (!isSupabaseConfigured()) {
      const demoUser = await getDemoSession();
      userId = demoUser?.id ?? null;
    } else {
      const user = await getCurrentUser();
      userId = user?.id ?? null;
    }

    if (!userId) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const generator = getAudioGenerator();
    const result = await generator.generate(
      {
        text,
        voiceId,
        projectId,
        title,
        speed,
        stability,
        similarity,
      },
      userId,
    );

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao gerar áudio.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
