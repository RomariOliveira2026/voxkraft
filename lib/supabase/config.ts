const PLACEHOLDER_URL = "https://seu-projeto.supabase.co";
const PLACEHOLDER_KEY = "sua-anon-key";

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) return null;

  return { url, anonKey };
}

export function isSupabaseConfigured() {
  const env = getSupabaseEnv();
  if (!env) return false;

  return (
    env.url !== PLACEHOLDER_URL &&
    env.anonKey !== PLACEHOLDER_KEY &&
    !env.url.includes("seu-projeto")
  );
}
