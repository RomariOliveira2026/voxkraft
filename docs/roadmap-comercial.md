# Roadmap comercial — VoxKraft

Documento estratégico de evolução comercial e de produto. Define fases, entregas, métricas e **estimativa de receita potencial** em reais (BRL), com premissas explícitas para revisão trimestral.

---

## Visão

Posicionar o VoxKraft como a plataforma brasileira de referência para **texto em voz profissional** — começando com validação de mercado (MVP) e evoluindo até motor proprietário, clonagem autorizada e API B2B.

**Público-alvo principal:** criadores de conteúdo, agências, e-learning, podcasts, PMEs e desenvolvedores.

---

## Premissas para estimativa de receita

| Premissa | Valor base |
|----------|------------|
| Moeda | BRL (reais) |
| Horizonte por fase | 12 meses após início da fase |
| Churn mensal (SaaS) | 5–8% (fases iniciais) → 3–5% (maduro) |
| Ticket médio | Varia por fase (detalhado abaixo) |
| CAC estimado | R$ 80–250 (orgânico + ads leves) |
| Margem bruta alvo | 60–75% (fases com API externa) → 80%+ (motor próprio) |

As faixas abaixo são **potencial**, não projeção garantida. Servem para priorização e metas internas.

---

## Fase 1 — MVP funcional

**Status:** em curso / validação

### Entregas

- Cadastro e login (demo ou Supabase)
- Biblioteca pública de vozes (`/biblioteca`)
- Dashboard com métricas básicas
- Geração de áudio (demo localStorage ou produção)
- Histórico e projetos (MVP)
- Landing, blog e SEO inicial

### Objetivo comercial

Validar proposta de valor, fluxo completo e disposição a pagar.

### Modelo de receita

- Plano **Grátis** (lead gen)
- Plano **Profissional** (manual / lista de espera) — opcional nesta fase
- Receita principal: **zero a baixa**; foco em usuários ativos e feedback

### Estimativa de receita potencial (12 meses)

| Cenário | Usuários cadastrados | Pagantes | Ticket/mês | MRR | ARR |
|---------|---------------------|----------|------------|-----|-----|
| Conservador | 500 | 0–10 | R$ 49 | R$ 0–490 | R$ 0–6k |
| Base | 2.000 | 30 | R$ 79 | R$ 2,4k | ~R$ 29k |
| Otimista | 5.000 | 100 | R$ 79 | R$ 7,9k | ~R$ 95k |

**Potencial acumulado Fase 1:** **R$ 0 – R$ 95 mil/ano**

---

## Fase 2 — Assinaturas Stripe e créditos

**Dependências:** MVP estável, Supabase em produção, política de uso clara

### Entregas

- Checkout e billing via **Stripe** (ou Mercado Pago + Stripe internacional)
- Planos: Essencial / Profissional / Empresarial
- **Controle de créditos** (minutos ou caracteres)
- Limites por plano (vozes premium, fila, exportação)
- Portal do assinante (upgrade, cancelamento, faturas)
- E-mails transacionais (boas-vindas, limite, renovação)

### Objetivo comercial

Monetização recorrente previsível (MRR).

### Modelo de receita sugerido

| Plano | Preço/mês | Minutos | Público |
|-------|-----------|---------|---------|
| Essencial | Grátis | 30 min | Teste |
| Profissional | R$ 79–129 | 300 min | Criadores / freelancers |
| Empresarial | R$ 299–499 | 1.500+ min | Agências / empresas |

### Estimativa de receita potencial (12 meses)

| Cenário | Pagantes | Ticket médio | MRR | ARR |
|---------|----------|--------------|-----|-----|
| Conservador | 80 | R$ 99 | R$ 7,9k | ~R$ 95k |
| Base | 250 | R$ 119 | R$ 29,8k | ~R$ 357k |
| Otimista | 600 | R$ 139 | R$ 83,4k | ~R$ 1,0 M |

**Potencial acumulado Fase 2:** **R$ 95 mil – R$ 1,0 milhão/ano**

---

## Fase 3 — Integração ElevenLabs

**Dependências:** Fase 2 ativa, margem unitária controlada

### Entregas

- Síntese em produção via **ElevenLabs** (já preparado via `VoiceProvider`)
- Catálogo sincronizado com tabela `voices`
- Qualidade de áudio real (não demo)
- Monitoramento de custo por minuto gerado
- Retry, rate limit e fila básica

### Objetivo comercial

Produto **vendável** com qualidade profissional; reduzir churn por qualidade.

### Economia unitária (referência)

- Custo ElevenLabs: ~US$ 0,15–0,30/min (varia por plano API)
- Preço VoxKraft Profissional: ~R$ 0,40–0,60/min equivalente
- Margem bruta alvo: **50–65%** após API e infra

### Estimativa de receita potencial (12 meses)

| Cenário | Pagantes | Ticket médio | MRR | ARR |
|---------|----------|--------------|-----|-----|
| Conservador | 200 | R$ 109 | R$ 21,8k | ~R$ 262k |
| Base | 500 | R$ 129 | R$ 64,5k | ~R$ 774k |
| Otimista | 1.200 | R$ 149 | R$ 178,8k | ~R$ 2,1 M |

**Potencial incremental vs Fase 2:** +30–80% ARR (melhor retenção e upsell)

**Potencial acumulado Fase 3:** **R$ 260 mil – R$ 2,1 milhões/ano**

---

## Fase 4 — Banco de vozes brasileiras

**Dependências:** Fase 3, curadoria e contratos de locução

### Entregas

- Expansão do catálogo (regional, gênero, estilo)
- Vozes exclusivas VoxKraft (licenciadas)
- Biblioteca marketing + app unificadas
- Tags: narrador, comercial, podcast, nordestina, institucional
- Preview e A/B de vozes no funil de conversão

### Objetivo comercial

**Diferenciação** vs concorrentes genéricos; justificar premium.

### Modelo de receita

- Upsell: pacotes de voz premium (+R$ 29–49/mês)
- Add-on Empresarial: voz dedicada para marca

### Estimativa de receita potencial (12 meses)

| Cenário | MRR base Fase 3 | Upsell (+15–25%) | MRR total | ARR |
|---------|-----------------|------------------|-----------|-----|
| Conservador | R$ 21,8k | +R$ 3,3k | R$ 25,1k | ~R$ 301k |
| Base | R$ 64,5k | +R$ 12,9k | R$ 77,4k | ~R$ 929k |
| Otimista | R$ 178,8k | +R$ 44,7k | R$ 223,5k | ~R$ 2,7 M |

**Potencial acumulado Fase 4:** **R$ 300 mil – R$ 2,7 milhões/ano**

---

## Fase 5 — Clonagem de voz autorizada

**Dependências:** Jurídico (LGPD, consentimento), Fase 4, processo KYC de voz

### Entregas

- Fluxo de **consentimento explícito** do titular da voz
- Clonagem sob demanda (B2B / plano Empresarial)
- Voz privada por workspace (multi-tenant)
- Auditoria e revogação de clone

### Objetivo comercial

Ticket alto, contratos anuais, agências e marcas.

### Modelo de receita

| Produto | Preço |
|---------|-------|
| Setup clone (one-time) | R$ 499 – R$ 2.999 |
| Manutenção clone/mês | R$ 99 – R$ 499 |
| Minutos adicionais | R$ 0,50 – R$ 1,20/min |

### Estimativa de receita potencial (12 meses)

| Cenário | Clientes clone | Setup médio | MRR manutenção | ARR |
|---------|----------------|-------------|----------------|-----|
| Conservador | 10 | R$ 799 | R$ 2k | ~R$ 132k |
| Base | 40 | R$ 1.299 | R$ 12k | ~R$ 696k |
| Otimista | 100 | R$ 1.999 | R$ 35k | ~R$ 2,2 M |

**Potencial acumulado Fase 5:** **R$ 130 mil – R$ 2,2 milhões/ano** (camada B2B; somável ao SaaS)

---

## Fase 6 — API pública VoxKraft

**Dependências:** Fases 3–5, SLA, documentação, rate limit

### Entregas

- API REST documentada (OpenAPI)
- Chaves de API por conta
- Billing por consumo (minutos / requests)
- Sandbox e webhooks
- Casos de uso: apps, automações, parceiros white-label

### Objetivo comercial

Canal **B2B2C** e receita variável escalável.

### Modelo de receita

- Tier Developer: R$ 0 + pay-as-you-go
- Tier Business API: R$ 499/mês + minutos inclusos
- Tier Enterprise API: contrato anual (R$ 60k–300k/ano)

### Estimativa de receita potencial (12 meses)

| Cenário | Contas API pagas | MRR SaaS API | Consumo variável/mês | ARR |
|---------|------------------|--------------|----------------------|-----|
| Conservador | 15 | R$ 5k | R$ 3k | ~R$ 96k |
| Base | 50 | R$ 20k | R$ 15k | ~R$ 420k |
| Otimista | 150 | R$ 60k | R$ 50k | ~R$ 1,32 M |

**Potencial acumulado Fase 6:** **R$ 96 mil – R$ 1,3 milhão/ano** (adicional ao core SaaS)

---

## Fase 7 — Motor próprio VoxKraft

**Dependências:** Fases 4–6, investimento em ML/infra, ver `docs/modelo-proprio.md`

### Entregas

- Serviço TTS proprietário (`VOICE_PROVIDER=voxkraft`)
- Redução de dependência ElevenLabs
- Modelos PT-BR otimizados (sotaques, domínios)
- Fine-tuning contínuo e versionamento

### Objetivo comercial

**Margem bruta 75–85%**; moat tecnológico; pricing competitivo.

### Impacto econômico

- Redução COGS síntese: 40–60% vs API externa
- Permite planos mais agressivos ou maior lucro no mesmo preço

### Estimativa de receita potencial (12 meses)

Receita **não é nova por si** — amplifica margem e escala:

| Cenário | ARR SaaS + API (F6) | Margem bruta | Lucro bruto anual |
|---------|---------------------|--------------|-------------------|
| Conservador | R$ 500k | 70% | R$ 350k |
| Base | R$ 1,5 M | 78% | R$ 1,17 M |
| Otimista | R$ 4 M | 82% | R$ 3,28 M |

Com motor próprio + escala, **ARR total plataforma (cenário otimista acumulado):**

**R$ 3,5 – R$ 6 milhões/ano** (SaaS + clones + API), com margem superior às fases anteriores.

---

## Resumo executivo — receita potencial por fase

| Fase | Foco | ARR potencial (faixa 12m) |
|------|------|---------------------------|
| **1** | MVP funcional | R$ 0 – 95k |
| **2** | Stripe + créditos | R$ 95k – 1,0 M |
| **3** | ElevenLabs | R$ 260k – 2,1 M |
| **4** | Vozes brasileiras | R$ 300k – 2,7 M |
| **5** | Clonagem autorizada | +R$ 130k – 2,2 M |
| **6** | API pública | +R$ 96k – 1,3 M |
| **7** | Motor próprio | Margem ↑; ARR consolidado R$ 3,5–6 M |

---

## KPIs comerciais por fase

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

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Custo API ElevenLabs come come margin | Fase 7 motor próprio; limites por plano |
| Commoditização TTS | Vozes BR exclusivas + clone + API |
| Regulatório (voz/clonagem) | Consentimento, LGPD, termos claros |
| Concorrência global | Foco PT-BR, suporte local, preço em BRL |

---

## Próximos passos imediatos (pós-Fase 1)

1. Fechar Fase 1 em produção (Vercel + Supabase)
2. Priorizar **Stripe + créditos** (Fase 2)
3. Ativar ElevenLabs em staging (Fase 3)
4. Validar pricing com 20 entrevistas de usuário
5. Revisar este roadmap a cada trimestre

---

## Documentos relacionados

- [Modelo próprio de voz (técnico)](./modelo-proprio.md)
- Planos atuais: `lib/plans.ts`
- Arquitetura TTS: `lib/voice-providers/`

---

*Última atualização: roadmap estratégico VoxKraft — documento vivo, sujeito a revisão com dados reais de mercado.*
