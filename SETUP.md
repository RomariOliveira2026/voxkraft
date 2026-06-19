# VoxKraft MVP — Configuração

## 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute o arquivo `supabase/migrations/001_initial_schema.sql`
3. Em **Authentication → URL Configuration**, adicione:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`
4. Copie `.env.example` para `.env.local` e preencha as chaves

## 2. ElevenLabs

1. Obtenha sua API key em [elevenlabs.io](https://elevenlabs.io)
2. Configure `ELEVENLABS_API_KEY` no `.env.local`
3. Atualize os `elevenlabs_voice_id` na tabela `voices` com os IDs reais das suas vozes

## 3. Mercado Pago (opcional)

Configure no `.env.local` quando for ativar pagamentos:

- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_PUBLIC_KEY`
- `MERCADO_PAGO_WEBHOOK_SECRET`

## 4. Executar

```bash
npm install
npm run dev
```

## Fluxo do MVP

- **Cadastro/Login** → Supabase Auth
- **Gerar Áudio** → ElevenLabs API → Supabase Storage → tabela `audios`
- **Biblioteca** → "Usar esta voz" redireciona para Gerar Áudio com voz pré-selecionada
- **Histórico** → dados reais com reprodução, download e exclusão
- **Dashboard** → métricas do banco (áudios, tempo, plano, projetos)
- **Assinatura** → planos Grátis (30 min), Profissional (5h), Empresarial
