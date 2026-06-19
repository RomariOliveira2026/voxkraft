"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, Voice } from "@/lib/types/database";
import { estimateDurationLabel } from "@/lib/format";

type GerarAudioFormProps = {
  voices: Voice[];
  projects: Project[];
  initialVoiceId?: string;
  initialProjectId?: string;
};

export function GerarAudioForm({
  voices,
  projects,
  initialVoiceId,
  initialProjectId,
}: GerarAudioFormProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const charCount = text.length;
  const durationLabel = useMemo(() => estimateDurationLabel(text, speed), [text, speed]);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Erro ao gerar áudio.");
      }

      setAudioUrl(data.url);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar áudio.");
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
                {projects.map((project) => (
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
            <div className="mt-4 flex h-20 items-center justify-center rounded-xl bg-white/5">
              {audioUrl ? (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full px-4"
                  controls
                />
              ) : (
                <div className="flex items-end gap-1">
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
              disabled={loading || !text.trim()}
              className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Gerando..." : "Gerar áudio"}
            </button>
            <button
              type="button"
              onClick={handlePreview}
              disabled={!audioUrl}
              className="mt-3 w-full rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-40"
            >
              {isPlaying ? "Pausar prévia" : "Ouvir prévia"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
