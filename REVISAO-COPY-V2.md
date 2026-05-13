# Revisão de Copy V2 — RBBT Lab Institucional

> **Status:** Spec final pronto para handoff ao frontend-developer.
> **Base:** OPORTUNIDADES-COMUNICACAO.md + 3 diretrizes do CEO (2026-05-12).
> **Quem lê:** CEO (10 min) → frontend-dev (executa em 1 sessão de 2-3h).
> **O que NÃO contém:** código React. Apenas copy + estrutura.

---

## Seção 1 — Diagnóstico atualizado

- **RBBT Lab é uma plataforma multi-agente. Sales e Social são DUAS aplicações dela.** O site hoje sugere que "RBBT = Sales + Social". Falso. A plataforma tem identidade própria (memória tipada, identidade de agente em camadas, orquestração cross-canal, Content Factory, Brand Kit, MCP Permission). Sales e Social são produtos verticais que rodam em cima — e existem outros agentes/aplicações (operações em rede, agentes Instagram, pipeline interno de conteúdo).
- **Varejo, não "varejo digital".** O caso de maior escala é uma rede de 32 lojas físicas. A plataforma integra WhatsApp, Instagram, Telegram, ERP (Microvix Linx), e-commerce (Wake, Nuvemshop) e dashboards. "Varejo digital" exclui artificialmente o físico. Trocar por **"varejo"** ou **"varejo omnichannel"**.
- **Cases viram vitrine, não narrativa.** Hoje os cards têm parágrafos descritivos ("A solução desenvolvida para X se tornou…"). O CEO quer cards superficiais (logo + segmento + 1 linha) e um bloco "Trusted by" com NBA Brasil, Camys, X-One, Growth — sem descrições.
- **A relação Sales↔Social precisa subordinar-se ao Lab.** O GrowthConnector atual ("Social → Growth → Sales") é correto mas insuficiente. Falta mostrar que tudo isso roda sobre uma infraestrutura comum. Sugestão: rebatizar mentalmente "RBBT.GROWTH" não como ponte entre dois produtos, mas como **a expressão visível da plataforma RBBT Lab por trás dos dois**.
- **Densidade técnica entra como evidência, não como jargão.** "Memória que persiste entre sessões", "identidade do agente em camadas", "orquestrador entre canais" — sim. "MCP", "Soul", "Claude SDK" — não, no público.

---

## Seção 2 — Nova estrutura proposta (página por página)

### `/` Home

Ordem nova:

1. **HeroSection** — manter, ajustar subhead (remover "varejo digital") e tagline secundária.
2. **LabScaleSection** — manter como está. Ainda válido como metodologia.
3. **PlatformOverview** *(NOVO — substitui a leitura de ValueProposition)* — apresenta a plataforma RBBT Lab: três blocos curtos (Identidade dos agentes / Memória que persiste / Orquestração entre canais). Mostra que **a base é uma só** antes de mostrar os produtos.
4. **ProductsPreview** — manter, mas reescrever copy de Sales/Social e ajustar o título da seção ("Dois produtos. Uma só plataforma." em vez de "Uma só inteligência."). Reposicionar Sales e Social como **dois produtos derivados da plataforma**, não como ela inteira.
5. **GrowthConnectorSection** — manter, com copy revisado. O nó central deixa de ser apenas "rbbt.growth" e passa a ser lido como "rbbt lab" (a plataforma) com .growth sendo o nome dado à integração quando os dois produtos conversam.
6. **CasesLightweight** *(REESCRITA)* — versão enxuta com 2 cards (Camys + X-One). Sem narrativa de "virou produto". Só marca, segmento, canal e link para o produto correspondente.
7. **TrustedBySection** *(NOVO)* — bloco vitrine. NBA Brasil, Camys, X-One, Growth. Sem descrição. Posição: logo após CasesLightweight.
8. **ValueProposition** — **REMOVER da Home.** Migrar conteúdo para ManifestoFull (`/sobre#manifesto`), onde os três pilares (Profundidade, Simbiose, Transição) já existem. Manter a Home mais ritmada e operacional. Justificativa: na Home, os três princípios concorrem com o PlatformOverview e diluem a narrativa "Lab é plataforma". O manifesto é o lugar natural deles.
9. **ManifestoPreview** — manter.
10. **CTASection** — manter, ajustar subhead (remover "varejo digital").

**Mudança fundamental de leitura na Home:** Hero → Modelo → **Plataforma (NOVO)** → Produtos → Conexão → Cases → Vitrine → Manifesto → CTA.

---

### `/sales`

Ordem (mantém template `<ProductPage>`):

1. **Hero** — manter line-reveal, ajustar subhead.
2. **Audience** — reescrever para incluir varejo físico que usa WhatsApp (não só digital).
3. **Features** — manter os 4 itens, **reescrever copy** com vocabulário da plataforma traduzido (memória tipada, identidade do agente, etc.).
4. **HowItWorks** *(NOVO, opcional — recomendado)* — 3 frases sobre como funciona por dentro: identidade, memória, integração. Insere densidade técnica sem jargão.
5. **Integrations** — manter (Wake, Nuvemshop, Shopify).
6. **Pricing** — manter (gated).
7. **CrossSell** — manter (Social).
8. **Closing** — manter, ajustar verbos.

---

### `/social`

Mesma estrutura, equivalente. Detalhes em Seção 3.

---

### `/sobre`

Ordem nova:

1. **FounderEditorial** — manter, ajustar último parágrafo (remover "varejo digital").
2. **TeamSection** — manter.
3. **PlatformLayer** *(NOVO)* — bloco curto (80-100 palavras) sobre a plataforma RBBT Lab: quantos agentes em produção, quantas integrações ativas, qualquer sinal de operação. Sem números investidor-y. Posição: depois do TeamSection, antes do Manifesto.
4. **ManifestoFull** — manter. Enriquecer o pilar "Profundidade técnica" com referências concretas (memória, identidade em camadas, orquestrador, brand kit).
5. **VisionEditorial** — manter, reescrever para tirar a leitura "varejo digital é onde provamos e depois expande" — a visão é mais ampla desde já.
6. **CTASection** — manter.

---

### `/contato`

Sem mudança estrutural. Apenas trocar duas linhas de copy que mencionam "varejo digital" ou "camada de inteligência" pelas versões revisadas.

---

## Seção 3 — Copy final, página por página

### `/` HOME

#### 3.1 HeroSection

Wordmark "rbbt lab" e strapline "Think Service." — **mantidos verbatim**.

Tagline principal (mantida):

> **Soluções inteligentes que resolvem problemas reais.**

Subhead (REESCRITO — remove "varejo digital"):

> **A plataforma de agentes que estrutura o crescimento do varejo — do físico ao digital, do feed à conversa.**

CTAs (mantidos):

- Primário: **Falar com a gente** → `/contato`
- Secundário (text link): **Conheça a plataforma** → `#plataforma` *(antes era "Conheça os produtos")*

---

#### 3.2 LabScaleSection

Eyebrow (mantido): **Nosso modelo**

H2 (mantido): **Lab + Scale.**

Body (REESCRITO levemente):

> Operamos em dois modos. O **Lab** é onde exploramos o que há de mais novo em inteligência para resolver problemas reais. O **Scale** é onde as soluções que provam valor ganham tração e viram produto.

Steps (mantidos verbatim):

> **01. Explorar.** Entendemos profundamente o problema e avaliamos se, onde e como a inteligência pode realmente gerar valor.
>
> **02. Prototipar.** Construímos rapidamente um MVP funcional conectado ao contexto real do negócio.
>
> **03. Validar & Escalar.** Testamos em ambiente real. O que prova impacto evolui para produto escalável.

---

#### 3.3 PlatformOverview *(NOVO — substitui a saída do ValueProposition da Home)*

ID da seção: `#plataforma`

Eyebrow:

> **A plataforma**

H2:

> **Uma camada. Vários agentes. Um só consumidor no centro.**

Body de abertura:

> A RBBT Lab é a infraestrutura de agentes que opera por baixo dos nossos produtos. Identidade, memória e orquestração: construídas em casa, compartilhadas por toda aplicação que roda em cima.

Três blocos em sequência (cards ou linhas — frontend decide):

> **01 · Identidade do agente.**
> Cada agente nasce com uma identidade própria: voz da marca, papel definido, limites claros. Não é um prompt monolítico — é arquitetura editável, camada por camada.

> **02 · Memória que persiste.**
> O cliente é lembrado entre sessões. Preferências, fatos, eventos — classificados por importância. Não é histórico de conversa. É perfil que evolui a cada interação.

> **03 · Orquestração entre canais.**
> Um sinal no Instagram vira contexto na conversa do WhatsApp. Uma dúvida no atendimento vira pauta de conteúdo. O orquestrador escolhe qual agente atende, mantendo o consumidor no centro.

Linha de fechamento (opcional, abaixo dos blocos):

> Sales e Social são **dois produtos verticais que rodam nessa camada**. Outras aplicações nascem do mesmo lugar.

---

#### 3.4 ProductsPreview (REESCRITO)

ID: `#produtos`

Eyebrow (REESCRITO):

> **Dois produtos da plataforma**

H2 (REESCRITO):

> **Dois produtos. Uma só plataforma.**

Body de abertura (REESCRITO):

> Sales e Social são as duas aplicações verticais da RBBT Lab em produção. Cada uma resolve um lado da relação com o consumidor — e ambas compartilham a mesma camada de identidade, memória e orquestração.

Card Sales (REESCRITO):

> **RBBT Sales · Em produção**
> **Conversa que vira venda no WhatsApp.**
> Atende com contexto, lembra do histórico do cliente, recomenda no momento certo, fecha sem fricção. Devolve tempo ao time para focar em estratégia.
> CTA: **Conhecer Sales** → `/sales`

Card Social (REESCRITO):

> **RBBT Social · Em testes**
> **Cada sinal do Instagram vira decisão.**
> Lê o que a audiência pede antes dela dizer. Detecta intenção de compra. Cruza orgânico e ads no mesmo painel — em português nativo.
> CTA: **Conhecer Social** → `/social`

---

#### 3.5 GrowthConnectorSection (REESCRITO)

Eyebrow (mantido): **Conectados**

H2 (REESCRITO):

> **Quando os dois se falam, a operação aprende.**

Subhead (REESCRITO):

> Uma dúvida no Instagram vira contexto na conversa do WhatsApp. Uma objeção no WhatsApp vira pauta de conteúdo. Sem operador no meio — porque a plataforma por baixo é a mesma.

Nós (mantidos visualmente):

- Esquerda: **RBBT Social** · *Escuta o Instagram*
- Centro: **rbbt.growth** *(mantido como nome da integração)*
- Direita: **RBBT Sales** · *Guia no WhatsApp*

Caption inferior (mantido):

> A inteligência potencializa. O humano cria. A marca evolui. **O consumidor é servido.**

*(Substitui "A IA potencializa" por "A inteligência potencializa" — alinhado às regras de vocabulário.)*

---

#### 3.6 CasesLightweight (REESCRITA — versão enxuta)

Ver Seção 5 para o spec completo. Resumo aqui:

Eyebrow: **Onde nasceu**

H2:

> **Primeiros casos. Primeiros produtos.**

Body (encurtado):

> Cada produto da RBBT nasceu de um problema real, validado com um cliente real.

Dois cards minimalistas:

> **Camys** · *Moda feminina · WhatsApp* → Ver RBBT Sales

> **X-One** · *Acessórios premium · Instagram* → Ver RBBT Social

Sem parágrafos descritivos. Sem narrativa "virou produto".

---

#### 3.7 TrustedBySection *(NOVO)*

Ver Seção 4 para o spec completo. Resumo aqui:

Eyebrow:

> **Operam com a RBBT Lab**

Linha única (sem H2 grande — é vitrine, não seção narrativa):

> Marcas que confiam na nossa plataforma para crescer.

Conteúdo: NBA Brasil · Camys · X-One · Growth — em wordmarks neutros ou texto estilizado (sem logo oficial da NBA — ver Seção 4 sobre cuidado).

---

#### 3.8 ManifestoPreview

**Mantido verbatim.** Apenas substituir "tecnologia" pela leitura corrente já presente — copy atual está bom.

---

#### 3.9 CTASection

H2 (mantido): **Pronto para conversar?**

Body (REESCRITO):

> Reservamos trinta minutos para entender o seu varejo e mostrar onde a plataforma entra primeiro.

CTAs (mantidos).

---

### `/sales` SALES PAGE

Edição no `src/data/products.ts`, `salesConfig`.

#### Hero

Eyebrow (mantido): `RBBT Sales · Em produção`

Headline (mantida): `Conversa | que vira venda | no WhatsApp.`

Subtitle (REESCRITA):

> **Atende com contexto. Lembra do cliente. Recomenda no momento certo. Sem ninguém esperando, sem nenhuma venda no comentário.**

CTAs (mantidos).

---

#### Audience (REESCRITO)

Eyebrow (mantido): **Para quem é**

Headline (REESCRITA — não diz "varejo digital"):

> **Para o varejo que vive do WhatsApp — e perde venda quando ninguém responde.**

Body (REESCRITO — inclui físico):

> Marcas com equipe enxuta, margem apertada e pressão por resultado. Operações que misturam loja física, e-commerce e redes sociais. O WhatsApp virou o canal de tudo. Sales devolve esse canal sob controle.

---

#### Features (REESCRITAS)

Eyebrow (mantido): **O que entrega**

Headline (REESCRITA):

> **Mais do que um agente.**

Subhead (REESCRITO):

> **Uma plataforma com identidade, memória e contexto — dedicada à sua marca.**

Itens (REESCRITOS):

> **01 · Identidade do agente por marca.**
> Tom de voz, catálogo, políticas e limites estruturados. Cada marca opera com sua própria identidade — não é template compartilhado.

> **02 · Memória que persiste.**
> Preferências, fatos e eventos do cliente classificados por importância. Retoma a conversa exatamente de onde parou — semanas, meses depois.

> **03 · Recomendação com contexto.**
> O agente cruza histórico do cliente, estoque em tempo real e momento da conversa. Recomenda o que faz sentido, não o que está em campanha.

> **04 · Checkout dentro da conversa.**
> Fecha sem redirecionar para outro canal. Captura a decisão no momento certo e devolve o atendimento para o humano quando precisa.

---

#### HowItWorks *(NOVO — recomendado, ver Seção 7 para decisão)*

Eyebrow:

> **Por dentro**

Headline:

> **A camada que separa atendimento de venda.**

Body (3 frases):

> Cada agente é construído em camadas: **identidade** (quem é, como fala), **manual de operação** (regras, fluxos, escalações) e **voz da marca** (vocabulário, tom, signoffs). A memória do cliente é tipada — fatos, preferências, eventos — não é histórico de chat. A integração com seu e-commerce é em tempo real: estoque, preço, status do pedido.

---

#### Integrations (REESCRITO levemente)

Eyebrow (mantido): **Integrações**

Headline (mantida): **Conectado ao seu e-commerce.**

Body (REESCRITO):

> RBBT Sales se integra ao seu e-commerce e ao seu ERP para consulta de estoque, preço, status do pedido e histórico em tempo real. Não substitui sistema — conecta.

Itens (mantidos):

- Wake · ativo
- Nuvemshop · ativo
- Shopify · em desenvolvimento

---

#### Pricing, CrossSell, Closing

**Mantidos verbatim** — copy atual está adequado. Apenas confirmar que nenhum trecho usa "varejo digital".

Subhead do Closing (REESCRITO):

> **Em 30 minutos, mostramos onde Sales entra primeiro na sua operação.**

*(Sem alteração; só checagem.)*

---

### `/social` SOCIAL PAGE

Edição em `socialConfig`.

#### Hero

Eyebrow (mantido): `RBBT Social · Em testes`

Headline (mantida): `Cada sinal | do seu Instagram | vira decisão.`

Subtitle (REESCRITA):

> **A camada de inteligência entre o que você publica e a receita que isso gera.**

---

#### Audience (REESCRITO)

Headline (mantida): **Para times de marketing, agências e marcas que vivem do Instagram.**

Body (REESCRITO):

> Times pequenos, com pressão por resultado, que precisam de leitura rápida do que funciona — sem alternar entre cinco ferramentas e três fusos de exportação.

---

#### Features (REESCRITAS levemente)

Headline (mantida): **Três camadas. Um painel.**

Subhead (REESCRITO):

> **Orgânico, ads e leitura conversacional dos seus dados — em uma só interface.**

Itens (REESCRITOS — remove "IA conversacional"):

> **01 · Gestão do orgânico.**
> Detecção de intenção de compra em comentários e DMs. Resposta na voz da marca. Recomendação de pauta baseada em padrões do que converte.

> **02 · Gestão de ads.**
> Funil de conversão em seis estágios com ROAS diário. Detecção de fadiga publicitária. Gestão de campanhas no mesmo painel.

> **03 · Conversa com seus dados.**
> Pergunte em português. Receba leitura cruzada de orgânico e ads, previsões com indicador de confiança, e visualização imediata.

---

#### Integrations / Diferencial (mantido)

Apenas trocar **"Inteligência que fala português de verdade."** por **"Inteligência que opera em português, não traduzida."** — mais preciso.

---

#### Pricing, CrossSell, Closing

Mantidos. Checar ausência de "varejo digital".

---

### `/sobre` ABOUT PAGE

#### FounderEditorial (AJUSTE)

H1 (mantido): **Um laboratório que nasce do varejo real.**

Parágrafos (REESCRITOS — segundo parágrafo remove "varejo digital"):

> Quase oito anos liderando Customer Experience na Apple Brasil. Antes, mais de uma década em trade marketing e estratégia comercial em Ipiranga e FEMSA. Duas décadas de varejo premium — onde cada interação importa.

> A RBBT Lab nasceu para traduzir tudo isso em uma plataforma de agentes que devolve tempo, contexto e clareza para marcas de pequeno e médio porte. Construímos a camada cognitiva que organiza, conecta e potencializa operações de varejo — do físico ao digital.

> Não vendemos tecnologia. Vendemos comportamento estruturado pelo consumidor.

---

#### TeamSection

**Sem alteração de copy.** Manter como está.

---

#### PlatformLayer *(NOVO — opcional, alto valor)*

Eyebrow:

> **A camada**

H2:

> **Plataforma própria. Operação real.**

Body (80-100 palavras):

> A RBBT Lab opera uma plataforma multi-agente proprietária: identidade estruturada por agente, memória tipada do cliente, orquestração entre canais, e voz da marca configurável. Hoje, mais de uma dezena de agentes especialistas rodam em produção — vendas, atendimento, operações de loja, conteúdo, gestão de estoque. Integrações ativas com WhatsApp, Instagram, e-commerce (Wake, Nuvemshop) e ERPs de varejo. Auditoria completa por agente. Multi-tenancy isolado. **Não é wrapper. É infraestrutura.**

*Sem números investidor-y. Sinaliza maturidade.*

---

#### ManifestoFull (AJUSTE no pilar 01)

Pilar 01 (REESCRITO — enriquecer com evidência concreta):

> **Profundidade técnica.**
> Arquitetura própria, construída camada por camada: memória do cliente que persiste entre sessões, identidade do agente em camadas (papel, voz da marca, regras de operação), orquestrador que escolhe qual agente atende e mantém contexto entre canais. Concorrentes copiam interface, não infraestrutura.

Pilares 02 e 03: **mantidos verbatim.**

Demais blocos do manifesto (Acreditamos, Não somos, Closing): **mantidos verbatim** — estão excelentes.

---

#### VisionEditorial (REESCRITO)

H2 (REESCRITO):

> **Inteligência que nasce na operação.**
> *Escala como produto.*
> *Expande como plataforma.*

Body (REESCRITO — não diz "varejo digital é onde provamos e depois expande"):

> O varejo é onde provamos o modelo — do WhatsApp da Camys ao Instagram da X-One, da rede de lojas físicas ao painel de gestão da marca. A plataforma que construímos com Sales e Social se aplica a qualquer operação que precisa de inteligência para crescer.

> Não queremos ser uma empresa de tecnologia que vende para empresas. Queremos ser o laboratório onde marcas brasileiras descobrem como usar inteligência para crescer — com soluções que funcionam no mundo real e evoluem junto com a tecnologia.

> Camys e X-One foram a prova. O varejo é só o começo.

---

#### CTASection (Mantido — ver 3.9)

---

### `/contato` CONTACT PAGE

**Apenas duas trocas pontuais de copy:**

Subhead do hero (REESCRITO):

> **Trinta minutos para entender o seu varejo e mostrar onde a plataforma entra primeiro.**

Item 02 da sidebar "O que esperar" (REESCRITO):

> Onde a plataforma entra primeiro — Sales, Social ou ambos.

---

## Seção 4 — Spec do "Trusted by"

### Posição
Logo após o `CasesLightweight` reescrito, antes do `ManifestoPreview`. Os dois blocos juntos formam a sequência: **caso simplificado (com narrativa mínima) → vitrine de marcas (sem narrativa)**.

### Conteúdo
Quatro marcas, na ordem:

1. **NBA Brasil**
2. **Camys**
3. **X-One**
4. **Growth**

### Tratamento visual recomendado

**Opção A (recomendada): wordmarks em texto estilizado**
- Tipografia: PP Neue Machina Light, uppercase, tracking generoso.
- Cor: `text-[var(--muted)]` com hover sutil para `text-[var(--foreground)]`.
- Separadores verticais finos entre nomes (`·` ou `|` em opacity baixa).
- Layout: linha única horizontal em desktop, grid 2x2 em mobile.

Justificativa: evita o problema de licenciamento de logo da NBA, mantém minimalismo Apple/Japan, e é coerente com o resto do site (que não usa logos coloridos em lugar nenhum).

**Opção B (se houver logos reais autorizados):** marquee infinito horizontal com logos em monocromático (cinza/branco), sem cor, sem efeitos. **Não usar logo oficial da NBA sob nenhuma hipótese** — se for esse caminho, usar apenas o wordmark "NBA Brasil" em texto estilizado, mesmo que as outras três sejam logos reais.

### Copy do bloco

Eyebrow:

> **Operam com a RBBT Lab**

Linha de contexto (uma única, abaixo dos wordmarks):

> **Marcas e redes que confiam na nossa plataforma — do físico ao digital, do feed à conversa.**

Sem CTA. É vitrine, não conversão.

### Cuidado com NBA — checklist obrigatório

- Pode aparecer como **texto "NBA Brasil"** estilizado.
- **NÃO pode** aparecer o logo oficial da NBA, da NBA Brasil, ou qualquer marca registrada.
- **NÃO pode** ter descrição do que foi feito (32 lojas, números, datas, segmento "esporte licenciado").
- **NÃO pode** ter link clicável para case detalhado da NBA.
- A presença é **prova social passiva** — confirma que operam com a gente, nada além disso.
- Confirmar com Thiago antes de publicar se o nome "NBA Brasil" no site é autorizado pelo contrato, ou se prefere usar apenas "Rede nacional de varejo licenciado" como wordmark.

---

## Seção 5 — Cases simplificados (versão substitutiva)

### Recomendação

**Dois cards no `CasesLightweight` (Camys + X-One). NBA Brasil entra só no `TrustedBy`.**

Justificativa: o card descritivo, mesmo enxuto, exige narrativa mínima ("segmento", "canal", "produto que originou"). Para a NBA Brasil, mesmo isso pode violar a cláusula de confidencialidade. O `TrustedBy` é mais seguro — só nome, sem contexto. Camys e X-One são cases públicos onde o cliente autoriza menção.

### Spec dos cards (Camys e X-One)

Cada card contém:
- Número (01 / 02) — tipográfico, muted
- Eyebrow: **"Origem RBBT Sales"** / **"Origem RBBT Social"**
- Nome da marca em display weight
- Segmento + canal em uma linha pequena: *"Moda feminina · WhatsApp"*
- **(SEM PARÁGRAFO DESCRITIVO)**
- Link para o produto correspondente

Versão de copy:

> **01 · Origem RBBT Sales**
> **Camys**
> *Moda feminina · WhatsApp*
> → Ver RBBT Sales

> **02 · Origem RBBT Social**
> **X-One**
> *Acessórios premium · Instagram*
> → Ver RBBT Social

H2 da seção (REESCRITO — mais curto):

> **Primeiros casos. Primeiros produtos.**

Subhead (REESCRITO — uma frase):

> Cada produto da RBBT nasceu de um problema real, validado com um cliente real.

Sem mais texto. O card é a prova; a expansão fica para o `/contato`.

---

## Seção 6 — Substituições globais de vocabulário

Aplicar em **todo o site** (busca-e-substitui):

| De | Para | Onde aparece |
|---|---|---|
| `varejo digital` | `varejo` (default) ou `varejo omnichannel` (quando precisar enfatizar canal) | HeroSection, ProductsPreview, FounderEditorial, VisionEditorial, CTASection, ContactPage, Footer |
| `camada de inteligência` | `plataforma` ou `plataforma de agentes` ou `camada cognitiva` (caso a caso) | Hero subhead, Footer, ContactPage, CTASection |
| `A IA potencializa` | `A inteligência potencializa` | GrowthConnectorSection caption, ManifestoFull |
| `agentes` (solto, genérico) | `agentes com identidade` / `agentes especialistas` | ProductsPreview body, ValueProposition |
| `memória persistente` | `memória que persiste` ou `memória tipada` | Features Sales |
| `personalização real` | `recomendação com contexto` ou `perfil que evolui` | Features Sales |
| `IA conversacional` | `conversa com seus dados` | Features Social |
| `inteligência que fala português de verdade` | `inteligência que opera em português, não traduzida` | Social Diferencial |
| `tecnologia` (quando soa genérico) | manter onde editorial faz sentido (ex.: "não vendemos tecnologia") | revisar caso a caso |
| `Dois produtos. Uma só inteligência.` | `Dois produtos. Uma só plataforma.` | ProductsPreview H2 |
| `Uma camada de inteligência dedicada à sua marca.` | `Uma plataforma com identidade, memória e contexto — dedicada à sua marca.` | Sales Features subhead |

**NUNCA usar (já bloqueado pelas regras de marca, manter):** `chatbot inteligente`, `tecnologia de ponta`, `IA que…`, `LLM treinada`, `Claude`, `Gemini`, `OpenAI`, `MCP`, `Soul`, `Operations`, `RabbitMQ`, `Redis`, `automação/automatizar`, `TAM/SAM/SOM`, `seed`, `valuation`, `investidor`, `captação`.

---

## Seção 7 — Handoff para o frontend-developer

Tarefas ordenadas por dependência. Cada item: **arquivo → mudança → referência ao copy.**

### Bloco A — Substituições e copy (rápidas, ~45min)

1. **`src/components/sections/HeroSection.tsx`** — substituir tagline secundária por novo subhead (Seção 3.1). Trocar o `href` do text link de `#produtos` para `#plataforma`. Trocar label "Conheça os produtos" por "Conheça a plataforma".

2. **`src/components/layout/Footer.tsx`** — substituir `Camada de inteligência que conecta marcas e consumidores no varejo digital.` por:
   > **Plataforma de agentes que estrutura o crescimento do varejo — do físico ao digital, do feed à conversa.**

3. **`src/components/sections/CTASection.tsx`** — substituir subhead para versão da Seção 3.9.

4. **`src/components/sections/GrowthConnectorSection.tsx`** — substituir subhead (Seção 3.5) e trocar `A IA potencializa` por `A inteligência potencializa` no caption inferior.

5. **`src/components/sections/ProductsPreview.tsx`** — substituir eyebrow, H2, body de abertura e cards (Seção 3.4).

6. **`src/components/sections/FounderEditorial.tsx`** — substituir o segundo parágrafo (Seção `/sobre` FounderEditorial).

7. **`src/components/sections/VisionEditorial.tsx`** — substituir H2 e body (Seção `/sobre` VisionEditorial).

8. **`src/components/sections/ManifestoFull.tsx`** — substituir apenas o `body` do primeiro pilar (`pillars[0]`) por versão enriquecida (Seção `/sobre` ManifestoFull).

9. **`src/pages/ContactPage.tsx`** — substituir o subhead do hero e o item 02 da sidebar "O que esperar" (Seção `/contato`).

10. **`src/data/products.ts`** — atualizar `salesConfig` e `socialConfig` com novos copies (Seção 3 — `/sales` e `/social` completas, incluindo subtitles, audience, features, integrations subhead e Social diferencial).

### Bloco B — Reescritas estruturais (~1h)

11. **`src/components/sections/CasesLightweight.tsx`** — reescrever para versão enxuta (Seção 5). Remover o campo `body` da interface `CasePreview` e do JSX. Manter apenas brand, segment, channel, caseLabel, productLabel, productSlug.

12. **`src/components/sections/PlatformOverview.tsx`** *(NOVO ARQUIVO)* — criar nova seção com eyebrow "A plataforma", H2 "Uma camada. Vários agentes. Um só consumidor no centro.", body de abertura, e três blocos (Identidade / Memória / Orquestração). Layout sugerido: três cards em linha (desktop) / empilhados (mobile), com numeração tipográfica como em `LabScaleSection`. ID da seção: `plataforma`. Adicionar export em `src/components/sections/index.ts`.

13. **`src/components/sections/TrustedBySection.tsx`** *(NOVO ARQUIVO)* — criar bloco vitrine conforme Seção 4. Layout: linha horizontal de wordmarks em texto estilizado (PP Neue Machina Light, uppercase, muted), com eyebrow "Operam com a RBBT Lab" e uma linha de contexto abaixo. Sem CTA. Adicionar export em `src/components/sections/index.ts`.

14. **`src/components/sections/PlatformLayer.tsx`** *(NOVO ARQUIVO — opcional, recomendado)* — seção curta para `/sobre`, posicionada entre `TeamSection` e `ManifestoFull`. Copy na Seção 3 — `/sobre` PlatformLayer. Adicionar export em `src/components/sections/index.ts`.

### Bloco C — Reorganização de páginas (~15min)

15. **`src/pages/HomePage.tsx`** — nova ordem:
    ```
    HeroSection
    LabScaleSection
    PlatformOverview          ← novo
    ProductsPreview
    GrowthConnectorSection
    CasesLightweight          ← versão enxuta
    TrustedBySection          ← novo
    ManifestoPreview
    CTASection
    ```
    **Remover:** `ValueProposition` da Home. *(Não apagar o componente; ele pode ser reutilizado no futuro. Apenas remover o import e o render.)*

16. **`src/pages/AboutPage.tsx`** — inserir `PlatformLayer` entre `TeamSection` e `ManifestoFull`:
    ```
    FounderEditorial
    TeamSection
    PlatformLayer             ← novo
    ManifestoFull
    VisionEditorial
    CTASection
    ```

### Bloco D — Validações finais (~15min)

17. **Busca global por `varejo digital`** — confirmar zero ocorrências após as edições acima.

18. **Busca global por `A IA`** — confirmar substituição.

19. **`pnpm lint && pnpm build`** — garantir build limpo.

20. **Smoke test manual** — abrir `/`, `/sales`, `/social`, `/sobre`, `/contato` e validar visualmente que (a) novo bloco PlatformOverview aparece após LabScale, (b) TrustedBySection aparece após CasesLightweight, (c) CasesLightweight está com cards enxutos, (d) ValueProposition saiu da Home, (e) PlatformLayer aparece em `/sobre`.

---

## Notas finais para o CEO

**O que muda fundamentalmente para o leitor do site:**

1. **Em 3 segundos no Hero**, o visitante entende: existe uma plataforma. Não é só "dois produtos juntos".
2. **A Home passa a ter uma seção dedicada à plataforma** (PlatformOverview), que hoje é invisível.
3. **NBA Brasil aparece como prova social** (Trusted by), sem violar confidencialidade.
4. **"Varejo digital" some** — abre a porta para físico, omnichannel e qualquer formato.
5. **Cases viram vitrine** — menos narrativa, mais respiração.

**Tempo total estimado de implementação:** 2h-3h de frontend (rotina, sem invenção).

**O que NÃO foi alterado de propósito:**
- Wordmark "rbbt lab", strapline "Think Service.", tagline "Soluções inteligentes que resolvem problemas reais." — assinaturas verbais canônicas, intocáveis.
- Manifesto (exceto o pilar 01) — está excelente.
- TeamSection — formato e copy preservados.
- Estrutura de Lab + Scale — metodologia ainda válida.

*Fim do documento.*
