/**
 * Products — typed source of truth for the Sales and Social product pages.
 * Both pages render via the same <ProductPage config={...}/> template.
 */

import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  ChartLine,
  CheckCircle2,
  HeartHandshake,
  Layers,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
} from 'lucide-react'

export type ProductSlug = 'sales' | 'social'
export type AccentColor = 'sales' | 'social'
export type ProductStatus = 'production' | 'beta' | 'roadmap'
export type IntegrationStatus = 'active' | 'in-development' | 'planned'

export interface ProductHero {
  eyebrow: string             // "Rbbt Sales · Em produção"
  status: ProductStatus
  headlineLines: string[]     // for line-reveal animation (one per <span>)
  subtitle: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
}

export interface ProductFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface ProductBenefit {
  title: string
  description: string
}

export interface ProductIntegration {
  label: string
  status: IntegrationStatus
}

export interface ProductPricing {
  eyebrow: string
  headline: string
  body: string
  footnote: string
  cta: { label: string; to: string }
}

export interface ProductCrossSell {
  slug: ProductSlug
  eyebrow: string
  headline: string
  body: string
  cta: { label: string; to: string }
}

export interface ProductConfig {
  slug: ProductSlug
  name: string                // "Rbbt Sales"
  shortName: string           // "Sales"
  accentColor: AccentColor
  hero: ProductHero
  audience: { eyebrow: string; headline: string; body: string }
  features: { eyebrow: string; headline: string; subhead: string; items: ProductFeature[] }
  integrations?: { eyebrow: string; headline: string; body: string; items: ProductIntegration[] }
  pricing: ProductPricing
  crossSell: ProductCrossSell
  closing: { headline: string; subhead: string; cta: { label: string; to: string } }
}

// ────────────────────────────────────────────────────────────────────────────

export const salesConfig: ProductConfig = {
  slug: 'sales',
  name: 'Rbbt Sales',
  shortName: 'Sales',
  accentColor: 'sales',
  hero: {
    eyebrow: 'Rbbt Sales · Em produção',
    status: 'production',
    headlineLines: ['Conversa', 'que vira venda', 'no WhatsApp.'],
    subtitle:
      'Atende com contexto. Lembra do cliente. Recomenda no momento certo. Sem ninguém esperando, sem nenhuma venda no comentário.',
    primaryCta: { label: 'Falar com a gente', to: '/contato' },
    secondaryCta: { label: 'Conhecer Social', to: '/social' },
  },
  audience: {
    eyebrow: 'Para quem é',
    headline: 'Para o varejo que vive do WhatsApp — e perde venda quando ninguém responde.',
    body:
      'Marcas com equipe enxuta, margem apertada e pressão por resultado. Operações que misturam loja física, e-commerce e redes sociais. O WhatsApp virou o canal de tudo. Sales devolve esse canal sob controle.',
  },
  features: {
    eyebrow: 'O que entrega',
    headline: 'Mais do que um agente.',
    subhead: 'Uma plataforma com identidade, memória e contexto — dedicada à sua marca.',
    items: [
      {
        icon: Brain,
        title: 'Identidade do agente por marca',
        description:
          'Tom de voz, catálogo, políticas e limites estruturados. Cada marca opera com sua própria identidade — não é template compartilhado.',
      },
      {
        icon: Layers,
        title: 'Memória que persiste',
        description:
          'Preferências, fatos e eventos do cliente classificados por importância. Retoma a conversa exatamente de onde parou — semanas, meses depois.',
      },
      {
        icon: HeartHandshake,
        title: 'Recomendação com contexto',
        description:
          'O agente cruza histórico do cliente, estoque em tempo real e momento da conversa. Recomenda o que faz sentido, não o que está em campanha.',
      },
      {
        icon: ShoppingBag,
        title: 'Checkout dentro da conversa',
        description:
          'Fecha sem redirecionar para outro canal. Captura a decisão no momento certo e devolve o atendimento para o humano quando precisa.',
      },
    ],
  },
  integrations: {
    eyebrow: 'Integrações',
    headline: 'Conectado ao seu e-commerce.',
    body:
      'Rbbt Sales se integra ao seu e-commerce e ao seu ERP para consulta de estoque, preço, status do pedido e histórico em tempo real. Não substitui sistema — conecta.',
    items: [
      { label: 'Wake', status: 'active' },
      { label: 'Nuvemshop', status: 'active' },
      { label: 'Shopify', status: 'in-development' },
    ],
  },
  pricing: {
    eyebrow: 'Planos',
    headline: 'Sob medida para o tamanho da sua operação.',
    body:
      'O modelo combina mensalidade fixa e variável sobre vendas fechadas. O ponto de partida muda com o catálogo, o volume de conversas e as integrações. Em uma conversa de 30 minutos, montamos o plano que faz sentido para o seu varejo.',
    footnote: 'Tier inicial pensado para pequenas marcas. Pacote enterprise com SLA dedicado.',
    cta: { label: 'Conversar sobre planos', to: '/contato' },
  },
  crossSell: {
    slug: 'social',
    eyebrow: 'Combine com',
    headline: 'Rbbt Social.',
    body:
      'Enquanto Sales fecha no WhatsApp, Social escuta o Instagram. Sinais do feed viram contexto de venda — e dúvidas da conversa viram pauta de conteúdo.',
    cta: { label: 'Conhecer Social', to: '/social' },
  },
  closing: {
    headline: 'Pronto para vender sem deixar ninguém esperando?',
    subhead: 'Em 30 minutos, mostramos onde Sales entra primeiro na sua operação.',
    cta: { label: 'Agendar conversa', to: '/contato' },
  },
}

// ────────────────────────────────────────────────────────────────────────────

export const socialConfig: ProductConfig = {
  slug: 'social',
  name: 'Rbbt Social',
  shortName: 'Social',
  accentColor: 'social',
  hero: {
    eyebrow: 'Rbbt Social · Em testes',
    status: 'beta',
    headlineLines: ['Cada sinal', 'do seu Instagram', 'vira decisão.'],
    subtitle:
      'A camada de inteligência entre o que você publica e a receita que isso gera.',
    primaryCta: { label: 'Falar com a gente', to: '/contato' },
    secondaryCta: { label: 'Conhecer Sales', to: '/sales' },
  },
  audience: {
    eyebrow: 'Para quem é',
    headline: 'Para times de marketing, agências e marcas que vivem do Instagram.',
    body:
      'Times pequenos, com pressão por resultado, que precisam de leitura rápida do que funciona — sem alternar entre cinco painéis e três fusos de exportação.',
  },
  features: {
    eyebrow: 'O que entrega',
    headline: 'Três camadas. Um painel.',
    subhead: 'Orgânico, ads e leitura conversacional dos seus dados — em uma só interface.',
    items: [
      {
        icon: MessageCircle,
        title: 'Gestão do orgânico',
        description:
          'Detecção de intenção de compra em comentários e DMs. Resposta na voz da marca. Recomendação de pauta baseada em padrões do que converte.',
      },
      {
        icon: ChartLine,
        title: 'Gestão de ads',
        description:
          'Funil de conversão em seis estágios com ROAS diário. Detecção de fadiga publicitária. Gestão de campanhas no mesmo painel.',
      },
      {
        icon: Sparkles,
        title: 'Conversa com seus dados',
        description:
          'Pergunte em português. Receba leitura cruzada de orgânico e ads, previsões com indicador de confiança, e visualização imediata.',
      },
    ],
  },
  integrations: {
    eyebrow: 'Diferencial',
    headline: 'Inteligência que opera em português, não traduzida.',
    body:
      'Análise de sentimento, detecção de intenção de compra e recomendações operam nativamente em PT-BR, com vocabulário do mercado local. Ferramentas internacionais tratam português como tradução; aqui é a língua principal.',
    items: [
      { label: 'Instagram orgânico', status: 'active' },
      { label: 'Meta Ads', status: 'active' },
      { label: 'TikTok', status: 'planned' },
      { label: 'LinkedIn', status: 'planned' },
    ],
  },
  pricing: {
    eyebrow: 'Planos',
    headline: 'Por conta, por agência, por marca.',
    body:
      'O plano é definido pelo número de contas analisadas, profundidade do histórico e nível de inteligência ativa. Em uma conversa de 30 minutos, mostramos qual configuração se encaixa no seu time.',
    footnote: 'Versão para criadores e pequenos negócios. Versão para agências com múltiplas contas. Versão enterprise com white-label.',
    cta: { label: 'Conversar sobre planos', to: '/contato' },
  },
  crossSell: {
    slug: 'sales',
    eyebrow: 'Combine com',
    headline: 'Rbbt Sales.',
    body:
      'Social entende o que sua audiência quer. Sales transforma esse contexto em venda no WhatsApp.',
    cta: { label: 'Conhecer Sales', to: '/sales' },
  },
  closing: {
    headline: 'Pronto para deixar de reagir e começar a antecipar?',
    subhead: 'Em 30 minutos, mostramos como Social lê seus dados.',
    cta: { label: 'Agendar conversa', to: '/contato' },
  },
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

export const productConfigs: Record<ProductSlug, ProductConfig> = {
  sales: salesConfig,
  social: socialConfig,
}

// re-export icons used in pricing/closing sections that aren't part of features
export const sharedIcons = { CheckCircle2, ShieldCheck, Workflow }
