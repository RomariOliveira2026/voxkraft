"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Voice } from "@/lib/types/database";

const FILTERS = ["Todas", "Institucional", "Anúncios", "Podcast", "E-learning", "Dramática"];

type BibliotecaClientProps = {
  voices: Voice[];
};

export function BibliotecaClient({ voices }: BibliotecaClientProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filteredVoices = useMemo(() => {
    return voices.filter((voice) => {
      const matchesSearch =
        voice.name.toLowerCase().includes(search.toLowerCase()) ||
        voice.style.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "Todas" ||
        voice.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()));

      return matchesSearch && matchesFilter;
    });
  }, [voices, search, activeFilter]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">Vozes</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Biblioteca de Vozes</h1>
          <p className="mt-2 text-slate-400">
            Explore vozes brasileiras premium para cada tipo de projeto.
          </p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar voz..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-64"
        />
      </header>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredVoices.map((voice) => (
          <article
            key={voice.id}
            className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${voice.color_class} p-5 transition hover:border-white/20`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">{voice.name}</h2>
                <p className="text-sm text-slate-400">{voice.style}</p>
              </div>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-blue-600"
                aria-label={`Ouvir amostra de ${voice.name}`}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {voice.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/dashboard/gerar-audio?voz=${voice.id}`}
              className="mt-5 block w-full rounded-xl border border-white/10 py-2 text-center text-sm font-medium transition hover:bg-white/10"
            >
              Usar esta voz
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
