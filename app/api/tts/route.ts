import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  getConfiguredVoiceProviderId,
  getVoiceProvider,
  type VoiceProviderId,
} from "@/lib/voice-providers";

/**
 * API interna de síntese TTS (sem persistência).
 * Fluxo completo do produto: POST /api/audio/generate
 *
 * Evolução futura: enfileirar job e retornar jobId para polling.
 */
export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            "Modo demonstração: síntese ocorre localmente no navegador. Use /api/audio/generate em produção.",
        },
        { status: 503 },
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = (await request.json()) as {
      text?: string;
      externalVoiceId?: string;
      provider?: VoiceProviderId;
      speed?: number;
      stability?: number;
      similarity?: number;
    };

    const text = String(body.text ?? "").trim();
    const externalVoiceId = String(body.externalVoiceId ?? "").trim();

    if (!text) {
      return NextResponse.json({ error: "Informe o texto." }, { status: 400 });
    }

    if (!externalVoiceId) {
      return NextResponse.json({ error: "Informe o externalVoiceId da voz." }, { status: 400 });
    }

    const providerId = body.provider ?? getConfiguredVoiceProviderId();
    const provider = getVoiceProvider(providerId);

    if (!provider.isAvailable()) {
      return NextResponse.json(
        { error: `Provedor "${provider.displayName}" indisponível.` },
        { status: 503 },
      );
    }

    const result = await provider.synthesize({
      text,
      externalVoiceId,
      speed: Number(body.speed ?? 1),
      stability: Number(body.stability ?? 0.75),
      similarity: Number(body.similarity ?? 0.8),
    });

    return NextResponse.json({
      provider: result.provider,
      mimeType: result.mimeType,
      byteLength: result.audioBuffer.byteLength,
      message:
        "Síntese concluída em memória. Persistência e créditos: use POST /api/audio/generate.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro na síntese TTS.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const providerId = getConfiguredVoiceProviderId();
  const providers = ["demo", "elevenlabs", "voxkraft"] as const;

  return NextResponse.json({
    activeProvider: providerId,
    providers: providers.map((id) => {
      const provider = getVoiceProvider(id);
      return {
        id: provider.id,
        displayName: provider.displayName,
        available: provider.isAvailable(),
      };
    }),
    docs: "/docs/modelo-proprio.md",
  });
}
