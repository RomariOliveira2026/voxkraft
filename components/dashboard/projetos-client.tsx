"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProject } from "@/lib/actions/auth";
import type { Project } from "@/lib/types/database";
import { formatRelativeUpdate } from "@/lib/format";

type ProjetosClientProps = {
  projects: Project[];
};

export function ProjetosClient({ projects }: ProjetosClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createProject(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setShowForm(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">Organização</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">Meus Projetos</h1>
          <p className="mt-2 text-slate-400">
            Agrupe seus áudios por campanha, curso ou cliente.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold transition hover:bg-blue-500"
        >
          Novo projeto
        </button>
      </header>

      {showForm && (
        <form
          action={handleCreate}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          {error && <p className="mb-3 text-sm text-red-300">{error}</p>}
          <label className="text-sm font-bold text-slate-300">Nome do projeto</label>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] px-4 py-3 text-sm outline-none focus:border-blue-500"
            placeholder="Ex: Campanha Verão 2026"
          />
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Criar projeto"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium hover:bg-white/10"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${project.color_class}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
            </div>

            <h2 className="mt-4 text-lg font-bold">{project.name}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {project.audios_count ?? 0} áudios · {formatRelativeUpdate(project.updated_at)}
            </p>

            <Link
              href={`/dashboard/gerar-audio?projeto=${project.id}`}
              className="mt-5 inline-flex text-sm font-medium text-blue-400 hover:underline"
            >
              Gerar áudio neste projeto →
            </Link>
          </article>
        ))}

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 text-slate-400 transition hover:border-white/30 hover:bg-white/5 hover:text-slate-300"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="mt-2 text-sm font-medium">Criar novo projeto</span>
        </button>
      </div>
    </div>
  );
}
