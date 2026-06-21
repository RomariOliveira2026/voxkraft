import { isSupabaseConfigured } from "@/lib/supabase/config";

export function isDemoMode() {
  return !isSupabaseConfigured();
}
