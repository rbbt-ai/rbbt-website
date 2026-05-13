/**
 * Team — typed source of truth for the team grid.
 * V3: todos co-fundadores. Bios revisadas pra refletir cargos atuais.
 */

export type TeamTag = 'Founder' | 'Strategy' | 'Tech' | 'Engenharia' | 'Growth'

export interface TeamMember {
  id: string
  name: string
  role: string
  tag: TeamTag
  photo: string
  linkedin?: string
  tagline: string
  bio: string
}

export const team: readonly TeamMember[] = [
  {
    id: 'thiago-freire',
    name: 'Thiago Freire',
    role: 'Founder & CPO',
    tag: 'Founder',
    photo: '/team/thiago_freire.png',
    tagline: 'Customer experience como sistema, não como discurso.',
    bio:
      'Founder e CPO da RBBT Lab. Oito anos na Apple Brasil cobrindo Customer Experience, Operações, B2B e Estratégia. Antes, mais de cinco anos em trade marketing e estratégia comercial na Petróleo Ipiranga e FEMSA. Formado em Marketing pela ESPM, com MBA em Gestão Empresarial pela FGV. Traduz duas décadas de varejo premium em produto: define o que a infraestrutura precisa entregar para que cada interação importe.',
  },
  {
    id: 'gustavo-kurozawa',
    name: 'Gustavo Kurozawa',
    role: 'CEO & Co-founder',
    tag: 'Founder',
    photo: '/team/gustavo_kurozawa.png',
    tagline: 'Estratégia de crescimento em escala bilionária, aplicada ao varejo brasileiro.',
    bio:
      'CEO e co-founder da RBBT Lab. Vinte e cinco anos liderando estratégia comercial e digital em tecnologia e telecom — com doze anos na Apple (Head of Sales Brasil, Country Manager Brasil e Head of Digital Sales & Strategy LATAM), Google (DoubleClick), Motorola Mobility e TIM Brasil. Formado em Administração pela USP, com programas executivos em Wharton e University of Pittsburgh. Conduz visão estratégica regional e execução comercial em escala.',
  },
  {
    id: 'tiago-peixoto',
    name: 'Tiago Peixoto',
    role: 'CTO & Co-founder',
    tag: 'Founder',
    photo: '/team/tiago_peixoto.jpeg',
    tagline: 'Quatorze anos transformando ambiguidade em produto entregue.',
    bio:
      'CTO e co-founder da RBBT Lab. Engenheiro generalista com mais de quatorze anos construindo software em produção — passou pela Sora Schools como primeiro engenheiro e Head of Software Engineering, cofundou a Plyom (adquirida) e desenvolveu plataformas de machine learning para energia solar residencial. Ruby, JavaScript, Rust, React. Formado em Engenharia Mecatrônica pela UFSC. Responsável pela arquitetura técnica da infraestrutura multi-agêntica.',
  },
  {
    id: 'israel-nunes',
    name: 'Israel Nunes',
    role: 'Co-founder & Full Stack Engineer',
    tag: 'Founder',
    photo: '/team/israel.jpeg',
    tagline: 'Da arquitetura ao deploy, ponta a ponta.',
    bio:
      'Co-founder e Full Stack Engineer da RBBT Lab. Constrói produtos prontos para produção de ponta a ponta — arquitetura, pipelines de dados, interface e deploy. Tem experiência fundando SaaS com dados intensivos rodando em AWS, incluindo o SwellGuide. Stack: React/Next.js, Node/TypeScript/Python, infraestrutura serverless. Formado em Administração Pública pela UDESC, com especialização em Full Stack Development pela FIAP. Conecta dados, agentes e canais em uma camada única.',
  },
  {
    id: 'felipe-siqueira',
    name: 'Felipe Siqueira',
    role: 'Co-founder & Investor',
    tag: 'Founder',
    photo: '/team/felipe_siqueira.png',
    tagline: 'Construindo marcas que crescem com método.',
    bio:
      'Co-founder e investor da RBBT Lab. Empreendedor serial com mais de uma década construindo e escalando marcas — cofundador e CEO da The Growth Brands, e cofundador de empresas anteriores em marketing, growth e estratégia de marca. Mentor na G4 Educação. Formado em Administração pela Ibmec Business School. Aporta à RBBT método de growth aplicado a marcas brasileiras de varejo.',
  },
] as const
