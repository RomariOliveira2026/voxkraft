import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  createDemoSession,
  isDemoAuthEnabled,
  setDemoSessionCookie,
} from "@/lib/auth/demo-session";
import { validateSignupInput } from "@/lib/auth/validate";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      full_name?: string;
      email?: string;
      password?: string;
    };

    const fullName = String(body.full_name ?? "");
    const email = String(body.email ?? "");
    const password = String(body.password ?? "");

    const validationError = validateSignupInput({ fullName, email, password });
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

      const session = createDemoSession(fullName, email);
      const response = NextResponse.json({
        success: true,
        mode: "demo",
        redirectTo: "/dashboard?cadastro=sucesso",
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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3015";
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${appUrl}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      mode: "supabase",
      redirectTo: "/dashboard?cadastro=sucesso",
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível criar sua conta. Tente novamente." },
      { status: 500 },
    );
  }
}
