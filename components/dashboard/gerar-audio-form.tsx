"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { checkCredits, getCreditSnapshot } from "@/lib/credits";
import { isDemoMode } from "@/lib/config/demo-mode";
import {
  createClientDemoAudio,
  getClientProjects,
  getClientSubscription,
} from "@/lib/demo-store/client-store";
import { DEMO_GENERATION_DELAY_MS } from "@/lib/demo-store/constants";
import { useDemoStoreVersion } from "@/lib/demo-store/use-demo-store";
import type { Project, Subscription, Voice } from "@/lib/types/database";
import { estimateDurationLabel, formatMinutesUsed } from "@/lib/format";

type GerarAudioFormProps = {
  voices: Voice[];
  projects: Project[];
  initialVoiceId?: string;
  initialProjectId?: string;
  userId: string;
  subscription: Subscription;
  demoMode?: boolean;
};

const REQUEST_TIMEOUT_MS = 30000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function GerarAudioForm({
  voices,
  projects,
  initialVoiceId,
  initialProjectId,
  userId,
  subscription: serverSubscription,
  demoMode = false,
}: GerarAudioFormProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const useLocalStore = useMemo(() => demoMode || isDemoMode(), [demoMode]);
  const storeVersion = useDemoStoreVersion(useLocalStore);

  const defaultVoiceId = initialVoiceId ?? voices[0]?.id ?? "";
  const [text, setText] = useState(
    "Olá! Bem-vindo ao VoxKraft. Com nossa tecnologia de inteligência artificial, você cria narrações profissionais em segundos.",
  );
  const [voiceId, setVoiceId] = useState(defaultVoiceId);
  const [projectId, setProjectId] = useState(initialProjectId ?? "");
  const [speed, setSpeed] = useState(1);
  const [stability, setStability] = useState(75);
  const [similarity, setSimilarity] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const availableProjects = useMemo(() => {
    if (!useLocalStore) return projects;
    return getClientProjects(userId);
  }, [useLocalStore, projects, userId, storeVersion]);

  const subscription = useMemo(() => {
    if (useLocalStore) return getClientSubscription(userId);
    return serverSubscription;
  }, [useLocalStore, userId, storeVersion, serverSubscription]);

  const selectedVoice = useMemo(
    () => voices.find((voice) => voice.id === voiceId),
    [voices, voiceId],
  );

  const credits = useMemo(() => getCreditSnapshot(subscription), [subscription]);

  const creditCheck = useMemo(
    () =>
      checkCredits({
        text,
        speed,
        voiceIsPremium: selectedVoice?.is_premium,
        plan: subscription.plan,
        minutesLimit: subscription.minutes_limit,
        minutesUsed: Number(subscription.minutes_used),
      }),
    [text, speed, selectedVoice, subscription],
  );

  const canGenerate = creditCheck.ok && Boolean(text.trim());
  const creditsBlocked = !creditCheck.ok && creditCheck.reason === "insufficient_credits";

  const charCount = text.length;
  const durationLabel = useMemo(() => estimateDurationLabel(text, speed), [text, speed]);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (useLocalStore) {
        await sleep(DEMO_GENERATION_DELAY_MS);

        const result = createClientDemoAudio({
          userId,
          text,
          voiceId,
          projectId: projectId || null,
          speed,
          stability: stability / 100,
          similarity: similarity / 100,
        });

        setAudioUrl(result.url);
        setGeneratedTitle(result.audio.title);
        setSuccess("Áudio gerado com sucesso! Você já pode ouvir, baixar ou consultar no histórico.");
        router.refresh();
        return;
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch("/api/audio/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            voiceId,
            projectId: projectId || null,
            speed,
            stability: stability / 100,
            similarity: similarity / 100,
          }),
          signal: controller.signal,
        });

        const data = (await response.json()) as {
          error?: string;
          url?: string;
          audio?: { title: string };
        };

        if (!response.ok) {
          throw new Error(data.error ?? "Erro ao gerar áudio.");
        }

        setAudioUrl(data.url ?? null);
        setGeneratedTitle(data.audio?.title ?? "audio-voxkraft");
        setSuccess("Áudio gerado com sucesso! Você já pode ouvir, baixar ou consultar no histórico.");
        router.refresh();
      } finally {
        window.clearTimeout(timeoutId);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Tempo esgotado. Tente novamente.");
      } else {
        setError(err instanceof Error ? err.message : "Erro ao gerar áudio.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handlePreview() {
    if (!audioUrl || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    audioRef.current.play();
    setIsPlaying(true);
  }

  function handleDownload() {
    if (!audioUrl) return;

    const anchor = document.createElement("a");
    anchor.href = audioUrl;
    anchor.download = `${generatedTitle ?? "audio-voxkraft"}.mp3`;
    anchor.click();
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-blue-400">Estúdio</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Gerar Áudio</h1>
        <p className="mt-2 text-slate-400">
          Transforme seu texto em narração profissional com vozes brasileiras.
        </p>
      </header>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </p>
      )}

      {creditsBlocked && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <p>{creditCheck.message}</p>
          <Link href="/dashboard/assinatura" className="mt-2 inline-block font-medium text-blue-400 hover:underline">
            Ver planos e fazer upgrade →
          </Link>
        </div>
      )}

      {!creditCheck.ok && creditCheck.reason === "premium_voice" && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {creditCheck.message}{" "}
          <Link href="/dashboard/assinatura" className="font-medium text-blue-400 hover:underline">
            Fazer upgrade
          </Link>
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <label className="text-sm font-bold text-slate-300">Seu texto</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-3 h-64 w-full resize-none rounded-xl border border-white/10 bg-[#0B102A] p-4 text-white outline-none transition focus:border-blue-500"
              placeholder="Cole ou digite o texto que deseja transformar em voz..."
            />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{charCount} caracteres</span>
              <span>{durationLabel}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <label className="text-sm font-bold text-slate-300">Voz</label>
              <select
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] p-3 text-sm text-white outline-none focus:border-blue-500"
              >
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name} — {voice.style}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <label className="text-sm font-bold text-slate-300">Projeto</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] p-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="">Sem projeto</option>
                {availableProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold text-slate-300">Seus créditos</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">Disponíveis</p>
                <p className="mt-1 text-lg font-bold">
                  {credits.isUnlimited
                    ? "Ilimitado"
                    : formatMinutesUsed(credits.minutesAvailable)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Utilizados</p>
                <p className="mt-1 text-lg font-bold">{formatMinutesUsed(credits.minutesUsed)}</p>
              </div>
            </div>
            {!credits.isUnlimited && (
              <>
                <p className="mt-3 text-xs text-slate-500">{credits.usagePercent}% consumido</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${credits.usagePercent}%` }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-bold text-slate-300">Configurações de voz</h2>

            <div className="mt-5 space-y-5">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Velocidade</span>
                  <span>{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Estabilidade</span>
                  <span>{stability}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stability}
                  onChange={(e) => setStability(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Similaridade</span>
                  <span>{similarity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={similarity}
                  onChange={(e) => setSimilarity(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B102A] p-6">
            <p className="text-sm text-slate-400">Prévia do áudio</p>
            <div className="mt-4 flex min-h-20 items-center justify-center rounded-xl bg-white/5">
              {audioUrl ? (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full px-4"
                  controls
                />
              ) : (
                <div className="flex items-end gap-1 py-4">
                  {[3, 5, 8, 4, 7, 5, 9, 6, 4, 7, 5, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-blue-500/60"
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !canGenerate}
              className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
            >
              {loading
                ? "Gerando..."
                : creditsBlocked
                  ? "Créditos esgotados"
                  : "Gerar áudio"}
            </button>
            <button
              type="button"
              onClick={handlePreview}
              disabled={!audioUrl}
              className="mt-3 w-full rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-40"
            >
              {isPlaying ? "Pausar prévia" : "Ouvir prévia"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!audioUrl}
              className="mt-3 w-full rounded-full border border-blue-500/30 bg-blue-600/10 px-6 py-3 text-sm font-medium text-blue-300 transition hover:bg-blue-600/20 disabled:opacity-40"
            >
              Baixar áudio demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
