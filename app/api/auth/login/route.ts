import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  createDemoSession,
  isDemoAuthEnabled,
  setDemoSessionCookie,
} from "@/lib/auth/demo-session";
import { validateLoginInput } from "@/lib/auth/validate";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      redirectTo?: string;
    };

    const email = String(body.email ?? "");
    const password = String(body.password ?? "");
    const redirectTo = body.redirectTo?.startsWith("/") ? body.redirectTo : "/dashboard";

    const validationError = validateLoginInput({ email, password });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      if (!isDemoAuthEnabled()) {
        return NextResponse.json(
          {
            error:
              "Autenticação indisponível. Configure o Supabase no arquivo .env.local para continuar.",
          },
          { status: 503 },
        );
      }

      const displayName = email.split("@")[0] ?? "Usuário";
      const session = createDemoSession(displayName, email);
      const response = NextResponse.json({
        success: true,
        mode: "demo",
        redirectTo: `${redirectTo}?login=sucesso`,
      });
      setDemoSessionCookie(response, session);
      return response;
    }

    const env = getSupabaseEnv();
    if (!env) {
      return NextResponse.json(
        { error: "Supabase não configurado corretamente." },
        { status: 503 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(env.url, env.anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    });

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      mode: "supabase",
      redirectTo: `${redirectTo}?login=sucesso`,
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível entrar. Tente novamente." },
      { status: 500 },
    );
  }
}
