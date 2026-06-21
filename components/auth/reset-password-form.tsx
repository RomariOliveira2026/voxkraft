"use client";

import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function ResetPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));

    try {
      if (!isSupabaseConfigured()) {
        setError(
          "Recuperação de senha indisponível no modo demonstração. Configure o Supabase para usar este recurso.",
        );
        return;
      }

      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (authError) {
        setError(authError.message);
      } else {
        setMessage("Enviamos um link de recuperação para o seu e-mail.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar o link de recuperação.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-blue-600 py-3.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar link de recuperação"}
      </button>
    </form>
  );
}
