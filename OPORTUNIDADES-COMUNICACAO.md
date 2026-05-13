# Oportunidades de Comunicação — RBBT Lab

> **Status:** Análise. Nada implementado no site ainda.
> **Base:** Exploração técnica de `/Users/thiagofreire/rbbt-lab` (plataforma) + `/Users/thiagofreire/NBA` (primeiro aplicado).
> **Data:** 2026-05-12

---

## TL;DR — em uma página

O site atual de RBBT Lab fala em termos genéricos ("camada de inteligência", "agentes próprios", "construído de dentro pra fora"). O código no `/rbbt-lab` revela uma plataforma **muito mais específica e densa** do que o site comunica. Há tese técnica forte, vocabulário próprio, e diferenciais arquiteturais que não aparecem hoje. Além disso, o projeto NBA Brasil é o primeiro caso de escala real (32 lojas em produção) — não está no site e provavelmente deveria entrar, com cuidado de confidencialidade.

**3 movimentos imediatos:**
1. Reescrever o pilar "Construído de dentro pra fora" com evidência concreta (Soul + Operations, Memória multi-camada, Content Factory, MCP Permission, etc.)
2. Adicionar um case "Operações em Rede" (referenciando NBA sem citar o nome — contrato é confidencial)
3. Substituir genéricos ("conecta marcas e consumidores") por verbos operacionais que descrevem o que a plataforma faz

---

## 1. O que a RBBT Lab é (de verdade, segundo o código)

### 1.1 Definição técnica honesta

**Não é**: um wrapper de Claude, um framework genérico de IA, ou um chatbot SaaS.

**É**: uma **plataforma proprietária de orquestração multi-agente** construída sobre Node.js + TypeScript + Claude Agent SDK + MCP (Model Context Protocol), com:
- Memória persistente de cliente (zero amnésia entre sessões)
- Identidade estruturada por agente (Soul + Operations)
- Orquestração cross-gateway (um agente despacha pra outro mantendo contexto)
- Dual-AI pipeline (Claude pra raciocínio, Gemini pra formatação)
- Multi-tenancy isolado desde o dia 1
- Auditoria completa de cada decisão de agente

**Stack** (não pra expor publicamente, mas pra entender solidez):
- Node.js 22 + TS 5.8 + Express 5.1
- PostgreSQL + Prisma 6, Redis 7, RabbitMQ 4
- Claude Agent SDK (`@anthropic-ai/claude-agent-sdk`) + Gemini (`@google/genai`)
- Model Context Protocol SDK
- OpenTelemetry full-stack (traces + metrics)
- 466 testes Jest, multi-gateway production-ready

### 1.2 Conceitos-chave que o time inventou ou apropriou

Vocabulário interno que pode (e deve) virar copy do site:

| Conceito | Como chamam | O que faz |
|---|---|---|
| **Soul** | Identidade do agente | role, personality, boundaries, style — quem é o agente |
| **Operations** | Manual de operação | rules[], workflows[], fallbacks[], escalation — como o agente opera |
| **Memory** | Memória multi-camada | Session (Redis, 24-48h) + Long-term (FACT/PREFERENCE/EVENT/NOTE com importance score) + Customer Profile inferido |
| **Brand Kit** | Voz da marca, estruturada | JSON com voice principles, vocabulary preferred/forbidden, signoffs — injetado no prompt automaticamente |
| **Orchestrator** | Roteador entre agentes | Um agente especialista chama outro via MCP tool, mantendo contexto do usuário e gateway original |
| **Content Factory** | Pipeline de produção de conteúdo | Fanout automático: agente A finaliza artefato → sistema expande filhos → encadeia agentes B, C, D downstream |
| **MCP Permission** | Aprovação interativa de tools | Quando um agente quer usar uma ferramenta não-whitelist, manda botão WhatsApp pro humano aprovar; só executa após resposta |
| **Agent Version** | Histórico de versões do agente | Snapshot automático antes de cada update; rollback com 1 clique |

Esse vocabulário é o que diferencia "infraestrutura" de "wrapper". Não está no site hoje.

### 1.3 Diferenciais visíveis no código (com evidência)

1. **Memória persistente real** — não é "histórico de conversa". É um modelo `AgentMemory` com type (FACT/PREFERENCE/EVENT/NOTE), importance score (1-10), source, expiresAt. O agente lembra: "Cliente usa tamanho M, mencionou casamento em março, paga via PIX." (Schema Prisma confirma.)

2. **Identidade estruturada** — Soul + Operations em vez de prompt monolítico de 1.640 linhas. Permite editar emoji frequency, voiceTone, ou um workflow específico sem quebrar o resto.

3. **Cross-gateway orchestration** — Um agente no Telegram pode despachar pra um agente no WhatsApp e a resposta volta no gateway original. Implementado via metadata `{ gatewayId, deliverTo, sourceAgentId }`.

4. **Dual-AI pipeline** — Claude faz reasoning, Gemini reformata pra WhatsApp interactive buttons / imagens / docs. Não é texto puro saindo do LLM — é estrutura tipada.

5. **MCP Permission interativo** — Tool não-whitelist dispara botão "Aprovar / Negar" no WhatsApp. Usuário clica, Promise resolve, Claude continua o turno. 90s de timeout.

6. **Content Factory** — Agente produtor finaliza, chama `submit_content_breaker_output`, sistema **automaticamente** expande filhos (ex: doc de produto → posts sociais → distribuição) e encadeia.

7. **Multi-tenancy nativo** — Toda query particionada por `agentId`, session key isolada (`agent:{id}:session:{userId}`), MCP headers injetam `x-agent-id` e `x-user-id` em cada tool call.

8. **Auditoria total** — `ClaudeToolCall` registra cada chamada com args, result, duration, status (PENDING/SUCCESS/FAILED/TIMEOUT). `ClaudeSystemEvent` registra eventos de sistema. Tudo é rastreável.

9. **Brand kit resolution** — Cada agente referencia um `brandKitRef`; sistema carrega JSON do brand kit (`src/instance/brandKits/{ref}.json`) e injeta voice + vocabulary + signoffs no prompt. Customização real por cliente.

10. **Versionamento automático** — Toda update de agente faz snapshot. Rollback é 1 clique.

### 1.4 Agentes em produção hoje

Por dentro do `/src/instance/agents/`:
- **TARS** — orquestrador central (Telegram)
- **Cami** — agente de vendas WhatsApp para Camys (moda feminina) — workflows reais: DISCOVERY, PRODUCT_SEARCH_CASCADE, CROSS_SELL_OBRIGATÓRIO, CHECKOUT_SEQUENCE, PRICE_OBJECTION_2_FASES, IMAGE_PROCESSING
- **Content Breaker, Distribution Brain, Research Producer, Strategy Doc Agent** — pipeline de conteúdo interno
- **IG-Base, IG-Felipe, IG-Thiago** — especialistas por perfil Instagram
- **6 NBA presets** (Store Concierge, OPS-Monitor, Sales Analyst, Stock Guardian, Finance Advisor, Team Coach) — instance separada no repo `/Users/thiagofreire/NBA`

---

## 2. NBA Brasil — o primeiro aplicado de escala real

### 2.1 Resumo (sem violar confidencialidade)

> ⚠️ **Atenção**: o contrato `RBBT-NBA-2026-001` está marcado como "Confidencial" (cláusula 10). NÃO PODE: citar o nome NBA Brasil, números específicos de faturamento, nomes de lojas individuais, datas de Go-Live, valores contratuais (USD 60k + USD 500/loja/mês). PODE: descrever a solução, stack, arquitetura, e métricas de potencial em termos genéricos.

**O que é**: plataforma multi-agente para uma **rede de 32 lojas físicas de varejo de esporte licenciado** (a expressão "esporte licenciado" mantém a confidencialidade — não diz NBA, diz uma categoria).

**O que faz**:
- Sincroniza 6+ endpoints de ERP Linx Microvix em tempo real (15-30min)
- Dashboard consolidado da rede: 32 lojas lado a lado, KPIs por loja, ranking de vendedores
- 6 agentes especialistas: consulta de estoque para vendedores (WhatsApp), monitoramento de anomalias, análise de vendas, gestão de ruptura, finanças, coaching
- Alertas automáticos configuráveis (queda de faturamento, estoque zerado, margem baixa, vendedor inativo, desconto alto, meta atingida)
- Detecção antecipada: identifica deterioração semanas antes do impacto

**Stack adicional sobre o framework base**:
- 2.942 linhas de API custom (`src/api/nba.ts`)
- microvix-mcp em Python (FastMCP 3.1.1) — sincroniza dados do ERP
- 32 páginas de admin UI específicas
- 5 migrations Prisma com tabelas NBA-specific (lojas, produtos, preços, estoque, movimentos, alertas, rotinas, triggers, clientes)

**Status atual** (abr/2026):
- ✅ POC Campinas concluída (dez/2025 - mar/2026)
- ✅ Fases 1-4 implementadas (Foundation, Chat+Ranking+Alertas, Estoque+Relatórios, Agentes+Rotinas+Triggers)
- ⏳ Fase 1 em transição pra Go-Live em produção
- ⏳ 2-4 lojas adicionais sendo onboarded

**Resultados da POC** (NÃO expor números — só pra entendimento interno):
- 91 dias de operação
- 100k+ produtos catalogados
- 20k+ clientes na base
- Detectou automaticamente uma queda significativa de faturamento e um padrão de descontos sem política

### 2.2 Como entrar no site (proposta de framing)

**Título do case**: "Operações Inteligentes em Rede"

**Subhead**: "32 lojas. Visibilidade em tempo real. Decisões em dias, não em meses."

**Corpo (~120 palavras, confidentiality-safe)**:
> Uma rede nacional de varejo licenciado precisava transformar operações fragmentadas em visão consolidada. Cada loja gerava dados em ERP local, mas gestores não conseguiam enxergar anomalias até ser tarde demais. Faturamento caindo numa unidade, estoque zerando em outra, descontos sem política em uma terceira — tudo isolado em planilhas e relatórios atrasados.
>
> A solução: uma plataforma multi-agente que sincroniza o ERP em tempo real, detecta anomalias por regras configuráveis e entrega visibilidade via WhatsApp e dashboard web. Seis agentes especialistas — de consulta de estoque a coaching de vendedores — respondem em segundos.
>
> Resultado: gestores detectam padrões de deterioração em dias, vendedores consultam catálogo de 100k+ SKUs por mensagem, e a rede ganha benchmark consistente entre franqueados.

**CTA**: leva pra `/contato` ou `/sales` (já que o aplicado central é o agente Store Concierge + análise operacional).

### 2.3 Posicionamento estratégico que o case desbloqueia

O case NBA prova 3 coisas que hoje o site não consegue demonstrar:
1. **Escala**: não é experimento — é 32 lojas, 100k SKUs, 20k clientes
2. **Integração profunda**: não substitui o ERP, integra (Microvix). Argumenta contra o medo de "ter que trocar sistema"
3. **Multi-segmento**: hoje Camys (moda) + X-One (acessórios) parecem nicho. Adicionar varejo de esporte licenciado abre leque pra "qualquer rede de varejo, qualquer segmento"

---

## 3. Gap analysis — site atual vs realidade

### 3.1 Hero (`/`)

**Atual**: `Soluções inteligentes que resolvem problemas reais.` + tagline "camada de inteligência que conecta marcas e consumidores no varejo digital".

**Problema**: "camada de inteligência" é genérico demais. Qualquer SaaS de IA diria isso. Não diz O QUE faz.

**Sugestão de upgrade**:
- Manter "Soluções inteligentes que resolvem problemas reais." (verbatim do pitch, é a frase canônica)
- Trocar subhead pra algo mais específico: "Agentes que lembram do cliente, conversam por WhatsApp, conectam ao seu e-commerce — e voltam o time pra estratégia."

### 3.2 Lab + Scale (`/#processo`)

**Atual**: Explorar → Prototipar → Validar & Escalar (três cards, copy genérico).

**Problema**: parece metodologia de qualquer consultoria. Não cita por que o modelo Lab → Scale funciona pra RBBT especificamente.

**Sugestão**: adicionar um quarto bloco curto: "O que vira produto" — explicando que Camys → RBBT Sales e X-One → RBBT Social. Mostra que o modelo já funcionou duas vezes. Hoje isso só aparece no Cases section bem depois.

### 3.3 Três princípios (`ValueProposition.tsx`)

**Atual**:
1. Construído de dentro pra fora — "Memória, contexto e orquestração: tudo nosso."
2. O humano multiplica — "Agentes eliminam erro e conectam silos."
3. O guia para a nova era — "Acompanhar a velocidade exige obsessão diária."

**Problema**: pilar 01 fala "Memória, contexto, orquestração" mas não dá evidência. O leitor pensa: "todo mundo diz isso." Sem a evidência (Soul/Operations, AgentMemory schema, MCP Orchestrator), é só claim.

**Sugestão**: enriquecer o pilar 01 com 2-3 conceitos concretos que aparecem no código:
- "Memória que persiste entre sessões — não é histórico de conversa, é perfil inferido com importance score"
- "Identidade do agente em camadas: Soul (quem é) + Operations (como opera) + Brand Kit (voz da marca)"
- "Orquestrador que despacha entre agentes mantendo contexto cross-gateway"

Ou em versão mais editorial:
> "Tudo construído: a memória que lembra do cliente, a identidade que define a voz da marca, o roteador que escolhe qual agente atende cada conversa. Cada peça é nossa — porque a camada que falta nesse mercado é a camada que conecta."

### 3.4 Cases lightweight

**Atual**: Camys (RBBT Sales) + X-One (RBBT Social).

**Falta**: o terceiro case — a rede de 32 lojas. Esse é o case que prova escala. Sem ele, leitor pensa "duas marcas pequenas". Com ele, vira "ecossistema funciona em qualquer porte".

### 3.5 GrowthConnectorSection (`/`)

**Atual**: visual SVG de Social → RBBT.GROWTH → Sales com path-draw timeline.

**Problema**: o visual é bonito mas o texto não explica que **a operação aprende sozinha** — sinais do Instagram viram contexto de venda automaticamente. Isso é o killer feature da plataforma, e tá implícito demais.

**Sugestão**: substituir "Quando os dois se falam, a operação aprende" por algo mais concreto: "Uma dúvida no Instagram vira contexto na conversa do WhatsApp. Uma objeção no WhatsApp vira pauta de conteúdo. Sem operador no meio."

### 3.6 Manifesto preview (`/`) e Manifesto full (`/sobre#manifesto`)

**Avaliação**: bem alinhados. A linguagem "IA multiplica talento humano" é forte. O bloco "O que a RBBT não é" é o melhor do site institucionalmente.

**Sugestão pequena**: no Manifesto Full, no bloco "Como construímos isso" (3 pilares — Profundidade técnica, Simbiose, Transição Guiada), enriquecer "Profundidade técnica" com 1-2 referências concretas. Algo como:
> "Memória, orquestração, identidade estruturada, brand kits, content factory. Arquitetura própria — porque a camada de inteligência que esse mercado precisa não existe pronta."

### 3.7 Página de produtos (`/sales` e `/social`)

**Atual**: features genéricas (Inteligência dedicada, Personalização real, Memória persistente, Checkout nativo / Gestão do orgânico, Gestão de ads, Analytics conversacional).

**Problema**: as features são corretas, mas em copy genérico. "Memória persistente" sem o contexto da implementação (FACT/PREFERENCE/EVENT/NOTE, importance score) não convence quem sabe a diferença entre histórico e memória real.

**Sugestão**: adicionar um bloco "Como funciona por dentro" (1 seção, 3-4 frases técnicas) explicando, sem jargão:
- Como a memória é tipada (não é só "histórico")
- Como o agente é configurado (Soul + Operations, não só system prompt)
- Como ele se integra ao seu e-commerce (Wake, Nuvemshop ativos)

Isso dá densidade técnica que diferencia de quem só fala marketing.

### 3.8 Página `/sobre`

**Avaliação**: FounderEditorial + Time + Manifesto + Vision tem bom arco. A foto do Thiago duotone funciona.

**Falta**: nenhuma menção à plataforma técnica. Quem é Apple-influenced em CX precisa saber que existe engenharia séria por trás. Sugestão: depois do TeamSection, adicionar um bloco "A camada" (curto, 80-100 palavras) com 1 frase técnica sobre a plataforma + 3 numbers (X agentes em produção, Y integrações ativas, Z mensagens orquestradas/mês — sem números investidor-y, mas com sinais de operação real).

---

## 4. O que adicionar — concreto

### 4.1 Novo bloco no Home: "Como funciona" (entre LabScale e ValueProposition?)

Curtinho, 3 cards:
1. **Agente com identidade** — "Soul: quem é. Operations: como opera. Brand Kit: a voz da marca."
2. **Memória que persiste** — "Cliente lembrado entre sessões. Preferências classificadas. Contexto que não se perde."
3. **Orquestração entre canais** — "WhatsApp escuta. Instagram lê. O sistema decide qual agente atende. Sem operador no meio."

### 4.2 Novo case no Home (Cases Lightweight)

Adicionar um terceiro card: **"Operações em Rede"** (rede de 32 lojas, varejo licenciado), com link para um mini-case `/cases/operacoes-em-rede` ou simplesmente para `/contato` (pra discutir).

### 4.3 Página de cases (opcional, mas valiosa)

Hoje os cases são lightweight cards. Vale construir `/cases` com narrativa completa? **Sim, se a NBA virar visível** — três cases (Camys, X-One, Rede de Varejo Licenciado) justificam página própria. Sem ela, o quarto que aparecer fica desorganizado.

### 4.4 FAQ ou "perguntas que recebemos" (`/sobre` ou `/`)

Hoje não tem. Algumas perguntas que essa análise revela:
- "Vocês usam Claude / OpenAI? — Usamos a melhor ferramenta pra cada papel. O que importa é a camada que construímos em cima."
- "É um chatbot? — Não. É uma plataforma multi-agente com memória persistente, identidade estruturada e orquestração entre canais. Chatbot é a parte mais rasa do que entregamos."
- "Vocês substituem meu ERP / e-commerce? — Não. Integramos. Wake e Nuvemshop ativos, Shopify em desenvolvimento."
- "Como funciona em escala? — Multi-tenancy desde o dia 1. Cada cliente totalmente isolado: dados, sessão, ferramentas, gateways."

Resposta curta, 4-6 perguntas, formato accordion.

---

## 5. Vocabulário — palavras pra entrar e palavras pra sair

### 5.1 Pra ENTRAR (substituir genéricos)

| Genérico atual | Substituir por |
|---|---|
| "camada de inteligência" | "infraestrutura de agentes" (quando técnico) ou "cognitive layer" (quando conceitual) |
| "agentes" (solto) | "agentes com identidade" / "agentes especialistas" / "agente com memória" |
| "memória persistente" | "memória tipada" (FACT/PREFERENCE/EVENT/NOTE) ou "memória que entende importância" |
| "integrações" | "tools via MCP" (interno) / "conectado ao seu Wake/Nuvemshop/ERP" (externo) |
| "personalização real" | "perfil inferido entre sessões" / "brand kit por marca" |
| "orquestração" | "roteador entre agentes" / "orquestrador cross-gateway" |
| "construído de dentro pra fora" | "construído camada por camada: memória, identidade, orquestração, brand kit, content factory" |

### 5.2 Para CONTINUAR EVITANDO (do regex bloqueante)

Sem alteração — manter o vocabulário proibido (chatbot como claim, IA como sujeito, investidor, captação, valuation etc.) como tá no plano.

### 5.3 Vocabulário interno que NÃO entra no site público

- "MCP" (sigla técnica)
- "Claude SDK", "Gemini" (nomes de vendor)
- "RabbitMQ", "Redis", "Prisma" (stack interna)
- "PostgreSQL", "OpenTelemetry" (idem)
- "TARS", "Content Breaker", nomes internos de agentes

Pode aparecer numa página técnica `/engenharia` se um dia for criada, mas não no copy padrão.

---

## 6. Riscos e o que NÃO comunicar

### 6.1 Confidencialidade NBA
- ❌ Não citar "NBA Brasil" por nome
- ❌ Não citar valores contratuais (USD 60k, USD 500/loja/mês)
- ❌ Não citar números específicos de faturamento, descontos, vendas
- ❌ Não citar datas de Go-Live
- ❌ Não citar nomes de lojas, vendedores, gestores
- ✅ Pode descrever a solução em termos genéricos
- ✅ Pode citar "varejo licenciado" ou "rede de franquias" (categoria, não marca)
- ✅ Pode citar arquitetura técnica (multi-agente, MCP, ERP integration)

### 6.2 Vendor leaks da plataforma
- ❌ Não citar Claude / Anthropic / Gemini / OpenAI publicamente
- ❌ Não citar nomes de tools específicas (`save_memory`, `dispatch_to_agent` etc.)
- ✅ Pode falar "agente proprietário", "memória nossa", "orquestrador nosso"

### 6.3 Cuidados gerais
- Toda métrica concreta precisa de fonte ou contexto. Evitar "+40% de conversão na Camys" — leak de cliente.
- "+20% CAC/ano no e-commerce" tipo fonte de mercado (IAB / Buffer) é OK quando citado.

---

## 7. Próximos passos sugeridos (em ordem de impacto x esforço)

| # | Mudança | Impacto | Esforço |
|---|---|---|---|
| 1 | Adicionar 3º case "Operações em Rede" no Home | Alto (prova escala) | Baixo (1 card, 80 palavras) |
| 2 | Enriquecer pilar "Construído de dentro pra fora" com evidência concreta | Alto (diferencia de wrapper) | Baixo (reescrever 1 parágrafo + 2-3 bullets) |
| 3 | Reescrever subhead do Hero pra ser mais específico | Médio | Baixo (1 linha) |
| 4 | Adicionar bloco "Como funciona" no Home (3 cards: Identidade / Memória / Orquestração) | Alto (educação técnica) | Médio (nova seção React) |
| 5 | Bloco "A camada" no `/sobre` com sinais de operação | Médio | Baixo |
| 6 | Reescrever copy do GrowthConnector pra explicar "operação que aprende" | Médio | Baixo |
| 7 | FAQ no `/sobre` ou no Home | Médio (objeções) | Médio |
| 8 | Página `/cases` com narrativa completa dos 3 cases | Alto (depende do ponto 1) | Alto |
| 9 | Página técnica `/engenharia` com vocabulário interno (Soul, Operations, MCP) | Médio (atrai dev/cto) | Alto |
| 10 | "Como funciona por dentro" nas páginas de produto (Sales/Social) | Médio | Médio |

**Recomendação de ordem**: 1 → 2 → 3 → 6 → 4 → 5 → 7 → 8 → 10 → 9.

**Total estimado pra 1-7**: ~1 dia de trabalho de design + copy + implementação.

---

## 8. Validação antes da execução

Antes de aplicar essas mudanças, decisões pra o usuário:

1. **NBA case**: confirma que pode entrar genericamente como "rede de varejo licenciado"? Ou prefere esperar Go-Live oficial / autorização explícita da NBA?
2. **Vocabulário técnico**: ok mencionar "Soul", "Operations", "Brand Kit" no site público? Ou esses termos ficam internos e o site usa traduções tipo "identidade", "manual de operação", "voz da marca"?
3. **FAQ**: vale criar? Em qual página?
4. **Página `/cases`**: vale construir? Ou cases lightweight no Home seguem suficientes por enquanto?
5. **Bloco técnico no `/sobre`**: vale adicionar números operacionais (X agentes em produção, Y integrações)? Quais números são confortáveis pra expor?

---

## Apêndice — referências às explorações originais

- **Plataforma**: `/Users/thiagofreire/rbbt-lab` — README, CLAUDE.md, IMPLEMENTATION_ROADMAP.md, src/instance/agents/*.json, prisma/schema.prisma
- **NBA**: `/Users/thiagofreire/NBA/rbbt-framework-nba` — STATUS-IMPLEMENTACAO.md, ESCOPO-NBA-AI-OPS.md, INTEGRACAO-NBA-RBBT.md, CONTRATO_RBBT_NBA.md (confidencial)
- **Site atual**: `/Users/thiagofreire/RBBT/rbbt-website/src/` — sections, pages, data

---

*Fim da análise. Aguardando decisão pra entrar em modo execução.*
