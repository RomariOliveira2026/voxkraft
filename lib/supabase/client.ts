import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase não configurado. Use as rotas /api/auth/login e /api/auth/signup.",
    );
  }

  const env = getSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase não configurado. Crie o arquivo .env.local com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createBrowserClient(env.url, env.anonKey);
}
