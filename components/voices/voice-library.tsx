"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { voiceCategories, type VoiceCategoryId } from "@/lib/voices/categories";
import type { CatalogVoice } from "@/lib/voices/catalog";
import { VoiceDemoPlayer } from "@/components/voices/voice-demo-player";

type VoiceLibraryProps = {
  voices: CatalogVoice[];
};

export function VoiceLibrary({ voices }: VoiceLibraryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<VoiceCategoryId | "todas">("todas");

  const filteredVoices = useMemo(() => {
    return voices.filter((voice) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        voice.name.toLowerCase().includes(query) ||
        voice.description.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "todas" || voice.categories.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [voices, search, activeCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar voz..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:max-w-xs"
        />
        <p className="text-sm text-slate-400">
          {filteredVoices.length} {filteredVoices.length === 1 ? "voz" : "vozes"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("todas")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            activeCategory === "todas"
              ? "bg-blue-600 text-white"
              : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          Todas
        </button>
        {voiceCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredVoices.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
          <p className="text-lg font-bold">Nenhuma voz encontrada</p>
          <p className="mt-2 text-slate-400">Tente outro termo ou categoria.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredVoices.map((voice) => (
            <article
              key={voice.slug}
              className={`group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br ${voice.colorClass} p-5 transition hover:border-white/20`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{voice.name}</h2>
                    {voice.isPremium ? (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                        Premium
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{voice.description}</p>
                </div>
              </div>

              <VoiceDemoPlayer src={voice.previewUrl} voiceName={voice.name} />

              <Link
                href={`/cadastro?voz=${voice.slug}`}
                className="mt-5 block w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-bold transition hover:bg-blue-500"
              >
                Usar esta voz
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
