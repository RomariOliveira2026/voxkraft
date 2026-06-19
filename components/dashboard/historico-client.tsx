"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Audio } from "@/lib/types/database";
import { formatDate, formatDuration } from "@/lib/format";

type HistoricoClientProps = {
  audios: Audio[];
};

export function HistoricoClient({ audios }: HistoricoClientProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return audios.filter(
      (audio) =>
        audio.title.toLowerCase().includes(query) ||
        audio.voice?.name?.toLowerCase().includes(query) ||
        audio.project?.name?.toLowerCase().includes(query),
    );
  }, [audios, search]);

  async function getSignedUrl(id: string) {
    const response = await fetch(`/api/audio/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data.url as string;
  }

  async function handlePlay(id: string) {
    try {
      if (playingId === id && audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        return;
      }

      const url = await getSignedUrl(id);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlayingId(null);
      await audio.play();
      setPlayingId(id);
    } catch {
      alert("Não foi possível reproduzir o áudio.");
    }
  }

  async function handleDownload(id: string, title: string) {
    try {
      const url = await getSignedUrl(id);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${title}.mp3`;
      anchor.click();
    } catch {
      alert("Não foi possível baixar o áudio.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja excluir este áudio?")) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/audio/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao excluir.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">Registros</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Histórico</h1>
          <p className="mt-2 text-slate-400">Todos os áudios gerados na sua conta.</p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar no histórico..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-72"
        />
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-slate-400">
              <th className="px-5 py-3.5 font-medium">Áudio</th>
              <th className="hidden px-5 py-3.5 font-medium md:table-cell">Voz</th>
              <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Projeto</th>
              <th className="px-5 py-3.5 font-medium">Duração</th>
              <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Data</th>
              <th className="px-5 py-3.5 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                  Nenhum áudio gerado ainda.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="transition hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 md:hidden">
                      {item.voice?.name ?? "—"} · {formatDate(item.created_at)}
                    </p>
                  </td>
                  <td className="hidden px-5 py-4 text-slate-400 md:table-cell">
                    {item.voice?.name ?? "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-slate-400 lg:table-cell">
                    {item.project?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    {formatDuration(item.duration_seconds)}
                  </td>
                  <td className="hidden px-5 py-4 text-slate-500 sm:table-cell">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlay(item.id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label="Reproduzir"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d={playingId === item.id ? "M6 4h4v16H6zM14 4h4v16h-4z" : "M8 5v14l11-7z"} />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(item.id, item.title)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label="Baixar"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 16.5V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-red-400 disabled:opacity-40"
                        aria-label="Excluir"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
