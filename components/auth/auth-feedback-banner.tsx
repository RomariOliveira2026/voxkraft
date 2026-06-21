"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MESSAGES: Record<string, string> = {
  cadastro: "Conta criada com sucesso! Bem-vindo ao VoxKraft.",
  login: "Login realizado com sucesso.",
};

export function AuthFeedbackBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const cadastro = searchParams.get("cadastro");
    const login = searchParams.get("login");

    if (cadastro === "sucesso") {
      setMessage(MESSAGES.cadastro);
    } else if (login === "sucesso") {
      setMessage(MESSAGES.login);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => {
      setMessage(null);
      router.replace("/dashboard");
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [message, router]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
    >
      {message}
    </div>
  );
}
