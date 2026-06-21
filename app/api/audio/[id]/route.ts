import { NextResponse } from "next/server";
import { DEMO_AUDIO_URL } from "@/lib/demo-store/constants";
import { getDemoSession } from "@/lib/auth/demo-session";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id: _id } = await context.params;

  if (!isSupabaseConfigured()) {
    const demoUser = await getDemoSession();
    if (!demoUser) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    return NextResponse.json({ url: DEMO_AUDIO_URL });
  }

  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { data: audio } = await supabase
    .from("audios")
    .select("storage_path")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!audio) {
    return NextResponse.json({ error: "Áudio não encontrado." }, { status: 404 });
  }

  const { data, error } = await supabase.storage
    .from("audios")
    .createSignedUrl(audio.storage_path, 3600);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Não foi possível gerar URL." }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Exclusão demo ocorre localmente no navegador." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { data: audio } = await supabase
    .from("audios")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!audio) {
    return NextResponse.json({ error: "Áudio não encontrado." }, { status: 404 });
  }

  await supabase.storage.from("audios").remove([audio.storage_path]);

  const { error } = await supabase.from("audios").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
