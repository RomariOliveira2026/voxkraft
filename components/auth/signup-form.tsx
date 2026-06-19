"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("full_name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-300">
          Nome completo
        </label>
        <input
          id="name"
          name="full_name"
          type="text"
          required
          placeholder="Maria Silva"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

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

      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-300">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-400">
        <input
          type="checkbox"
          required
          className="mt-1 rounded border-white/20 bg-white/5 accent-blue-600"
        />
        <span>
          Concordo com os{" "}
          <button type="button" className="text-blue-400 hover:underline">
            Termos de Uso
          </button>{" "}
          e a{" "}
          <button type="button" className="text-blue-400 hover:underline">
            Política de Privacidade
          </button>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-blue-600 py-3.5 text-sm font-bold transition hover:bg-blue-500 disabled:opacity-60"
      >
        {loading ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}
