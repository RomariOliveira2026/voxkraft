# Roadmap comercial — VoxKraft

Documento estratégico de evolução comercial e de produto. Define posicionamento, fases de crescimento, monetização e **estimativa de receita potencial** em reais (BRL), com premissas explícitas para revisão trimestral.

---

## 1. Visão geral do produto

O **VoxKraft** é uma plataforma brasileira de **texto em voz (TTS)** voltada a criadores, empresas e desenvolvedores que precisam transformar texto em áudio profissional em português.

**Proposta de valor:**

- Interface simples para gerar narrações, comerciais, aulas e conteúdo para redes sociais
- Biblioteca curada de vozes em português brasileiro
- Dashboard com histórico, projetos e controle de uso
- Evolução progressiva: MVP validável → assinaturas → integrações de qualidade → diferenciação local → clonagem autorizada → API B2B → motor proprietário

**Posicionamento:** referência nacional em TTS profissional em PT-BR — com qualidade comparável a players globais, preço em reais, suporte local e foco em vozes e sotaques brasileiros.

**Estado atual (Fase 1):** MVP funcional em produção (Vercel), com modo demo quando Supabase e provedores externos não estão configurados. Arquitetura preparada para múltiplos provedores de voz via `VoiceProvider`.

---

## 2. Público-alvo

| Segmento | Necessidade | Plano típico |
|----------|-------------|--------------|
| **Criadores de conteúdo** | Narração rápida para YouTube, Reels, TikTok | Essencial → Profissional |
| **Freelancers e locutores digitais** | Produção em volume com qualidade estável | Profissional |
| **Agências de marketing** | Vozes variadas, uso comercial, múltiplos clientes | Profissional → Empresarial |
| **E-learning e infoprodutores** | Aulas, cursos e materiais em áudio | Profissional |
| **PMEs** | Comerciais, URA, vídeos institucionais | Profissional → Empresarial |
| **Desenvolvedores e integradores** | API para apps, automações e white-label | Empresarial → API (Fase 6) |
| **Marcas e empresas** | Voz exclusiva ou clone autorizado da marca | Empresarial + Fase 5 |

**Persona principal:** criador ou profissional de marketing digital brasileiro, 25–45 anos, que hoje grava a própria voz ou terceiriza locução e busca velocidade, previsibilidade de custo e qualidade profissional sem estúdio.

**Mercados secundários:** podcasts, audiolivros, acessibilidade, jogos indie e automação de conteúdo.

---

## 3. Fases de evolução

### Fase 1 — MVP funcional

**Status:** em curso / validação

**Entregas:**

- Cadastro e login (demo ou Supabase)
- Biblioteca pública de vozes (`/biblioteca`)
- Dashboard com métricas básicas
- Geração de áudio (demo via localStorage ou produção)
- Histórico e projetos (MVP)
- Landing, blog e SEO inicial

**Objetivo comercial:** validar proposta de valor, fluxo completo e disposição a pagar.

**Critério de conclusão:** 500+ cadastros, >40% de ativação (1º áudio gerado), feedback qualitativo positivo de 20+ usuários.

---

### Fase 2 — Assinaturas e créditos

**Dependências:** MVP estável, Supabase em produção, política de uso clara

**Entregas:**

- Checkout e billing via **Stripe** (ou Mercado Pago + Stripe internacional)
- Planos Essencial / Profissional / Empresarial
- **Controle de créditos** (minutos ou caracteres)
- Limites por plano (vozes premium, fila, exportação)
- Portal do assinante (upgrade, cancelamento, faturas)
- E-mails transacionais (boas-vindas, limite, renovação)

**Objetivo comercial:** monetização recorrente previsível (MRR).

**Critério de conclusão:** billing ativo, 3–8% conversão free → pago, churn mensal <8%.

---

### Fase 3 — Integração ElevenLabs ou OpenAI TTS

**Dependências:** Fase 2 ativa, margem unitária controlada

**Entregas:**

- Síntese em produção via provedor externo de qualidade:
  - **ElevenLabs** — vozes naturais, multilíngue, clonagem futura
  - **OpenAI TTS** — custo competitivo, boa qualidade, integração simples
- Seleção via `VOICE_PROVIDER` (já preparado na arquitetura)
- Catálogo sincronizado com tabela `voices`
- Qualidade de áudio real (substituir demo)
- Monitoramento de custo por minuto gerado
- Retry, rate limit e fila básica

**Objetivo comercial:** produto **vendável** com qualidade profissional; reduzir churn por qualidade.

**Economia unitária (referência):**

| Provedor | Custo aprox. | Uso recomendado |
|----------|--------------|-----------------|
| ElevenLabs | ~US$ 0,15–0,30/min | Premium, clonagem (Fase 5) |
| OpenAI TTS | ~US$ 0,01–0,03/min | Volume, planos intermediários |

Margem bruta alvo VoxKraft: **50–65%** após API e infra.

---

### Fase 4 — Banco de vozes brasileiras

**Dependências:** Fase 3, curadoria e contratos de locução

**Entregas:**

- Expansão do catálogo (regional, gênero, estilo)
- Vozes exclusivas VoxKraft (licenciadas com locutores BR)
- Biblioteca marketing + app unificadas
- Tags: narrador, comercial, podcast, nordestina, institucional, sotaques regionais
- Preview e A/B de vozes no funil de conversão

**Objetivo comercial:** **diferenciação** vs concorrentes genéricos; justificar premium e retenção.

**Critério de conclusão:** 30+ vozes exclusivas ou licenciadas, NPS >45 entre usuários pagantes.

---

### Fase 5 — Clonagem de voz autorizada

**Dependências:** Jurídico (LGPD, consentimento), Fase 4, processo KYC de voz

**Entregas:**

- Fluxo de **consentimento explícito** do titular da voz
- Clonagem sob demanda (B2B / plano Empresarial)
- Voz privada por workspace (multi-tenant)
- Auditoria e revogação de clone
- Integração com ElevenLabs Professional Voice ou motor próprio

**Objetivo comercial:** ticket alto, contratos anuais, agências e marcas.

**Critério de conclusão:** processo jurídico aprovado, 10+ clientes clone pagantes.

---

### Fase 6 — API pública VoxKraft

**Dependências:** Fases 3–5, SLA, documentação, rate limit

**Entregas:**

- API REST documentada (OpenAPI)
- Chaves de API por conta
- Billing por consumo (minutos / requests)
- Sandbox e webhooks
- Casos de uso: apps, automações, parceiros white-label

**Objetivo comercial:** canal **B2B2C** e receita variável escalável.

**Critério de conclusão:** 15+ contas API pagas, documentação pública, uptime >99,5%.

---

### Fase 7 — Motor próprio VoxKraft

**Dependências:** Fases 4–6, investimento em ML/infra — ver [modelo-proprio.md](./modelo-proprio.md)

**Entregas:**

- Serviço TTS proprietário (`VOICE_PROVIDER=voxkraft`)
- Redução de dependência de ElevenLabs/OpenAI
- Modelos PT-BR otimizados (sotaques, domínios)
- Fine-tuning contínuo e versionamento de modelos

**Objetivo comercial:** **margem bruta 75–85%**; moat tecnológico; pricing competitivo.

**Impacto econômico:** redução de COGS de síntese em 40–60% vs API externa; permite planos mais agressivos ou maior lucro no mesmo preço.

---

## 4. Estratégia de monetização

### Modelos de receita

| Modelo | Fase | Descrição |
|--------|------|-----------|
| **Freemium** | 1–2 | Plano grátis como lead gen; conversão para pago |
| **Assinatura recorrente (MRR)** | 2+ | Planos mensais com minutos inclusos |
| **Créditos avulsos** | 2+ | Pacotes extras de minutos além do plano |
| **Upsell de vozes premium** | 4+ | Add-on por vozes exclusivas brasileiras |
| **Clonagem (setup + manutenção)** | 5 | Receita one-time + recorrente B2B |
| **API pay-as-you-go** | 6 | Consumo por minuto/request |
| **Contratos Enterprise** | 5–7 | Anual, volume, SLA, voz dedicada |

### Princípios

1. **Preço em BRL** — reduz fricção vs concorrentes em dólar
2. **Minutos como unidade** — fácil de entender para o usuário final
3. **Margem protegida** — limites por plano alinhados ao custo do provedor (Fase 3)
4. **Upsell natural** — free → profissional → empresarial → API → clone
5. **Receita diversificada** — SaaS + B2B + API reduz dependência de um único canal

### Premissas para estimativa de receita

| Premissa | Valor base |
|----------|------------|
| Moeda | BRL (reais) |
| Horizonte por fase | 12 meses após início da fase |
| Churn mensal (SaaS) | 5–8% (fases iniciais) → 3–5% (maduro) |
| CAC estimado | R$ 80–250 (orgânico + ads leves) |
| Margem bruta alvo | 60–75% (API externa) → 80%+ (motor próprio) |

---

## 5. Planos sugeridos

Alinhados com `lib/plans.ts` (implementação atual) e evolução prevista na Fase 2:

| Plano | Preço/mês | Minutos/mês | Público | Recursos principais |
|-------|-----------|-------------|---------|---------------------|
| **Essencial** | Grátis | 30 min | Teste e lead gen | Biblioteca básica, MP3 |
| **Profissional** | R$ 49–129 | 300 min (5 h) | Criadores, freelancers | Todas as vozes, MP3/WAV, uso comercial |
| **Empresarial** | R$ 299–499 | 1.500+ min | Agências, PMEs | Volume, vozes exclusivas, suporte prioritário |
| **API Developer** | Pay-as-you-go | Variável | Devs (Fase 6) | Chave API, sandbox, documentação |
| **API Business** | R$ 499/mês + consumo | Inclusos + extra | Integradores | SLA, webhooks, volume |
| **Clone de voz** | R$ 499–2.999 setup + R$ 99–499/mês | Sob contrato | Marcas (Fase 5) | Voz privada, consentimento, auditoria |

**Add-ons futuros:**

- Pacote vozes premium BR: +R$ 29–49/mês
- Minutos extras: R$ 0,40–0,60/min (Profissional) | R$ 0,50–1,20/min (clone)
- Voz dedicada para marca (Empresarial): sob consulta

---

## 6. Receita potencial por fase

Estimativas em **ARR** (receita anual recorrente) — faixas conservadora a otimista, horizonte de 12 meses após início de cada fase. Não são projeções garantidas; servem para priorização e metas internas.

### Fase 1 — MVP funcional

| Cenário | Usuários cadastrados | Pagantes | Ticket/mês | MRR | ARR |
|---------|---------------------|----------|------------|-----|-----|
| Conservador | 500 | 0–10 | R$ 49 | R$ 0–490 | R$ 0–6k |
| Base | 2.000 | 30 | R$ 79 | R$ 2,4k | ~R$ 29k |
| Otimista | 5.000 | 100 | R$ 79 | R$ 7,9k | ~R$ 95k |

**Potencial Fase 1:** **R$ 0 – R$ 95 mil/ano**

---

### Fase 2 — Assinaturas e créditos

| Cenário | Pagantes | Ticket médio | MRR | ARR |
|---------|----------|--------------|-----|-----|
| Conservador | 80 | R$ 99 | R$ 7,9k | ~R$ 95k |
| Base | 250 | R$ 119 | R$ 29,8k | ~R$ 357k |
| Otimista | 600 | R$ 139 | R$ 83,4k | ~R$ 1,0 M |

**Potencial Fase 2:** **R$ 95 mil – R$ 1,0 milhão/ano**

---

### Fase 3 — Integração ElevenLabs ou OpenAI TTS

| Cenário | Pagantes | Ticket médio | MRR | ARR |
|---------|----------|--------------|-----|-----|
| Conservador | 200 | R$ 109 | R$ 21,8k | ~R$ 262k |
| Base | 500 | R$ 129 | R$ 64,5k | ~R$ 774k |
| Otimista | 1.200 | R$ 149 | R$ 178,8k | ~R$ 2,1 M |

**Potencial Fase 3:** **R$ 260 mil – R$ 2,1 milhões/ano** (+30–80% vs Fase 2 por melhor retenção)

---

### Fase 4 — Banco de vozes brasileiras

| Cenário | MRR base Fase 3 | Upsell (+15–25%) | MRR total | ARR |
|---------|-----------------|------------------|-----------|-----|
| Conservador | R$ 21,8k | +R$ 3,3k | R$ 25,1k | ~R$ 301k |
| Base | R$ 64,5k | +R$ 12,9k | R$ 77,4k | ~R$ 929k |
| Otimista | R$ 178,8k | +R$ 44,7k | R$ 223,5k | ~R$ 2,7 M |

**Potencial Fase 4:** **R$ 300 mil – R$ 2,7 milhões/ano**

---

### Fase 5 — Clonagem de voz autorizada

| Cenário | Clientes clone | Setup médio | MRR manutenção | ARR |
|---------|----------------|-------------|----------------|-----|
| Conservador | 10 | R$ 799 | R$ 2k | ~R$ 132k |
| Base | 40 | R$ 1.299 | R$ 12k | ~R$ 696k |
| Otimista | 100 | R$ 1.999 | R$ 35k | ~R$ 2,2 M |

**Potencial Fase 5:** **+R$ 130 mil – R$ 2,2 milhões/ano** (camada B2B; somável ao SaaS)

---

### Fase 6 — API pública VoxKraft

| Cenário | Contas API pagas | MRR SaaS API | Consumo variável/mês | ARR |
|---------|------------------|--------------|----------------------|-----|
| Conservador | 15 | R$ 5k | R$ 3k | ~R$ 96k |
| Base | 50 | R$ 20k | R$ 15k | ~R$ 420k |
| Otimista | 150 | R$ 60k | R$ 50k | ~R$ 1,32 M |

**Potencial Fase 6:** **+R$ 96 mil – R$ 1,3 milhão/ano** (adicional ao core SaaS)

---

### Fase 7 — Motor próprio VoxKraft

Receita não é nova por si — **amplifica margem e escala**:

| Cenário | ARR SaaS + API (F6) | Margem bruta | Lucro bruto anual |
|---------|---------------------|--------------|-------------------|
| Conservador | R$ 500k | 70% | R$ 350k |
| Base | R$ 1,5 M | 78% | R$ 1,17 M |
| Otimista | R$ 4 M | 82% | R$ 3,28 M |

**Potencial consolidado (Fase 7, cenário otimista):** **R$ 3,5 – R$ 6 milhões/ano** (SaaS + clones + API), com margem superior às fases anteriores.

---

### Resumo executivo

| Fase | Foco | ARR potencial (faixa 12m) |
|------|------|---------------------------|
| **1** | MVP funcional | R$ 0 – 95k |
| **2** | Assinaturas e créditos | R$ 95k – 1,0 M |
| **3** | ElevenLabs ou OpenAI TTS | R$ 260k – 2,1 M |
| **4** | Banco de vozes brasileiras | R$ 300k – 2,7 M |
| **5** | Clonagem autorizada | +R$ 130k – 2,2 M |
| **6** | API pública | +R$ 96k – 1,3 M |
| **7** | Motor próprio | Margem ↑; ARR consolidado R$ 3,5–6 M |

---

## 7. Próximas prioridades

### Imediato (concluir Fase 1)

1. Estabilizar MVP em produção (Vercel + Supabase configurado)
2. Coletar feedback de 20 usuários reais (entrevistas + analytics)
3. Medir ativação: cadastro → 1º áudio gerado → retorno em 7 dias
4. Corrigir fricções no funil mobile (header, biblioteca, gerar áudio)

### Curto prazo (iniciar Fase 2)

1. Integrar **Stripe** com planos Essencial / Profissional / Empresarial
2. Implementar controle de créditos (minutos) no backend
3. Portal do assinante e e-mails transacionais
4. Validar pricing com dados de entrevistas (ajustar R$ 49–129 se necessário)

### Médio prazo (Fase 3)

1. Ativar **ElevenLabs** ou **OpenAI TTS** em staging
2. Comparar qualidade/custo dos dois provedores com amostra PT-BR
3. Definir `VOICE_PROVIDER` padrão por plano (ex.: OpenAI no Essencial, ElevenLabs no Profissional)
4. Monitoramento de custo por minuto e alertas de margem

### Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Custo API come margin | Limites por plano; OpenAI para volume; Fase 7 motor próprio |
| Commoditização TTS | Vozes BR exclusivas + clone + API |
| Regulatório (voz/clonagem) | Consentimento, LGPD, termos claros |
| Concorrência global | Foco PT-BR, suporte local, preço em BRL |

### KPIs comerciais

| KPI | Fase 1 | Fase 2+ |
|-----|--------|---------|
| Cadastros/mês | 200+ | 500+ |
| Ativação (1º áudio) | >40% | >55% |
| Conversão free → pago | — | 3–8% |
| MRR | — | crescimento 10–20%/mês |
| Churn | — | <6%/mês |
| NPS | >30 | >45 |
| CAC payback | — | <6 meses |

---

## Documentos relacionados

- [Modelo próprio de voz (técnico)](./modelo-proprio.md)
- Planos atuais: `lib/plans.ts`
- Arquitetura TTS: `lib/voice-providers/`

---

*Última atualização: roadmap estratégico VoxKraft — documento vivo, sujeito a revisão trimestral com dados reais de mercado.*
