-- VoxKraft MVP schema

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Voices (catálogo global)
-- ---------------------------------------------------------------------------
create table public.voices (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  style text not null,
  elevenlabs_voice_id text not null,
  tags text[] not null default '{}',
  color_class text not null default 'from-blue-600/20 to-blue-900/20',
  is_premium boolean not null default false,
  preview_url text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Users (perfil vinculado ao auth.users)
-- ---------------------------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company text,
  phone text,
  avatar_url text,
  default_voice_id uuid references public.voices (id) on delete set null,
  default_export_format text not null default 'mp3',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Subscriptions
-- ---------------------------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'professional', 'enterprise')),
  minutes_limit integer not null default 30,
  minutes_used numeric not null default 0,
  status text not null default 'active',
  mercado_pago_subscription_id text,
  mercado_pago_preference_id text,
  current_period_start timestamptz not null default date_trunc('month', now()),
  current_period_end timestamptz not null default (date_trunc('month', now()) + interval '1 month'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  color_class text not null default 'bg-blue-600/20 text-blue-300',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Audios
-- ---------------------------------------------------------------------------
create table public.audios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  voice_id uuid not null references public.voices (id),
  title text not null,
  text_content text not null,
  storage_path text not null,
  duration_seconds numeric not null default 0,
  file_format text not null default 'mp3',
  speed numeric not null default 1.0,
  stability numeric not null default 0.75,
  similarity numeric not null default 0.80,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Invoices (preparação Mercado Pago)
-- ---------------------------------------------------------------------------
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  amount_cents integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  mercado_pago_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.voices enable row level security;
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.projects enable row level security;
alter table public.audios enable row level security;
alter table public.invoices enable row level security;

create policy "voices_select_all" on public.voices for select using (true);

create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update using (auth.uid() = id);

create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions_update_own" on public.subscriptions for update using (auth.uid() = user_id);

create policy "projects_all_own" on public.projects for all using (auth.uid() = user_id);

create policy "audios_all_own" on public.audios for all using (auth.uid() = user_id);

create policy "invoices_select_own" on public.invoices for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Novo usuário: perfil + assinatura grátis
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  );

  insert into public.subscriptions (user_id, plan, minutes_limit)
  values (new.id, 'free', 30);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Seed vozes (atualize elevenlabs_voice_id no painel Supabase se necessário)
-- ---------------------------------------------------------------------------
insert into public.voices (name, style, elevenlabs_voice_id, tags, color_class, is_premium) values
  ('Lúcio', 'Narrador clássico', 'pNInz6obpgDQGcFmaJgB', array['Institucional', 'Documentário'], 'from-blue-600/20 to-blue-900/20', false),
  ('Aurora', 'Contadora de histórias', 'EXAVITQu4vr4xnSDxMaL', array['Infantil', 'Audiobook'], 'from-purple-600/20 to-purple-900/20', false),
  ('Caio', 'Jovem e vendedor', 'VR6AewLTigWG4xSOukaG', array['Anúncios', 'Redes sociais'], 'from-emerald-600/20 to-emerald-900/20', false),
  ('Isadora', 'Dramática', 'ThT5KcBeYPX3keUQqHPh', array['Cinema', 'Teatro'], 'from-rose-600/20 to-rose-900/20', true),
  ('Davi', 'Natural', 'yoZ06aMxZJJ28mfd3POQ', array['Podcast', 'Conversacional'], 'from-amber-600/20 to-amber-900/20', false),
  ('Lara', 'Profissional', '21m00Tcm4TlvDq8ikWAM', array['E-learning', 'Corporativo'], 'from-cyan-600/20 to-cyan-900/20', true);

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('audios', 'audios', false)
on conflict (id) do nothing;

create policy "audios_insert_own"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'audios'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "audios_select_own"
on storage.objects for select
to authenticated
using (
  bucket_id = 'audios'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "audios_delete_own"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'audios'
  and (storage.foldername(name))[1] = auth.uid()::text
);
