"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/actions/auth";
import type { UserProfile, Voice } from "@/lib/types/database";
import { getInitials } from "@/lib/format";

type ConfiguracoesFormProps = {
  profile: UserProfile;
  voices: Voice[];
};

export function ConfiguracoesForm({ profile, voices }: ConfiguracoesFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setMessage(null);
    const result = await updateProfile(formData);
    if (result?.error) setError(result.error);
    if (result?.success) setMessage(result.success);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-blue-400">Conta</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Configurações</h1>
        <p className="mt-2 text-slate-400">
          Gerencie seu perfil, preferências e segurança.
        </p>
      </header>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {message && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {message}
        </p>
      )}

      <form action={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold">Perfil</h2>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/30 text-xl font-bold text-blue-300">
              {getInitials(profile.full_name)}
            </div>
            <div>
              <button
                type="button"
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium transition hover:bg-white/10"
              >
                Alterar foto
              </button>
              <p className="mt-1 text-xs text-slate-500">JPG ou PNG. Máximo 2 MB.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-300">Nome</label>
              <input
                name="full_name"
                type="text"
                defaultValue={profile.full_name ?? ""}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">E-mail</label>
              <input
                type="email"
                defaultValue={profile.email ?? ""}
                disabled
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] px-4 py-2.5 text-sm text-slate-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Empresa</label>
              <input
                name="company"
                type="text"
                defaultValue={profile.company ?? ""}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Telefone</label>
              <input
                name="phone"
                type="tel"
                defaultValue={profile.phone ?? ""}
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B102A] px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold">Preferências de áudio</h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Formato padrão de exportação</p>
                <p className="text-sm text-slate-400">Usado ao baixar novos áudios</p>
              </div>
              <select
                name="default_export_format"
                defaultValue={profile.default_export_format}
                className="rounded-xl border border-white/10 bg-[#0B102A] px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Voz padrão</p>
                <p className="text-sm text-slate-400">Pré-selecionada ao gerar áudio</p>
              </div>
              <select
                name="default_voice_id"
                defaultValue={profile.default_voice_id ?? ""}
                className="rounded-xl border border-white/10 bg-[#0B102A] px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option value="">Selecionar</option>
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name} — {voice.style}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </form>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-bold">Segurança</h2>
        <div className="mt-5 space-y-4">
          <a
            href="/recuperar-senha"
            className="block w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-medium transition hover:bg-white/5 sm:w-auto"
          >
            Alterar senha
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="text-lg font-bold text-red-400">Zona de perigo</h2>
        <p className="mt-2 text-sm text-slate-400">
          A exclusão da conta é permanente e remove todos os seus áudios e projetos.
        </p>
        <button
          type="button"
          className="mt-4 rounded-full border border-red-500/30 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          Excluir conta
        </button>
      </section>
    </div>
  );
}
