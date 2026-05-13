# RBBT Lab — Website

Site institucional da RBBT Lab — **rbbtlab.ai**.
Cognitive infrastructure for retail. **Think Service.**

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4** (com `@tailwindcss/vite`)
- **Framer Motion** + animação editorial
- **React Router 7** (BrowserRouter)
- **Cloudflare Workers** (Static Assets) + custom domain

## Desenvolvimento

```bash
pnpm install
pnpm dev          # vite dev server (HMR)
pnpm lint         # eslint
pnpm build        # tsc -b && vite build → ./dist
pnpm preview      # preview do build via vite
pnpm cf:preview   # preview no runtime Workers (wrangler dev)
pnpm cf:deploy    # build + deploy pro Cloudflare Worker
```

## Deploy

Detalhes completos em [DEPLOY.md](./DEPLOY.md).

```bash
# 1ª vez na máquina:
pnpm exec wrangler login

# A cada deploy:
pnpm cf:deploy
```

## Estrutura

```
src/
├── pages/             # HomePage, SalesPage, SocialPage, AboutPage, ContactPage, PrivacyPage, NotFoundPage
├── components/
│   ├── sections/      # blocos da home + páginas de produto
│   ├── templates/     # ProductPage (template compartilhado /sales e /social)
│   ├── layout/        # Header, Footer
│   ├── flowchart-v2/  # demo interativo "Agent Flow" do /sales
│   └── ui/            # Button, SectionLabel, StatusBadge, AnimatedSection, Sheet
├── lib/               # motion variants, hooks compartilhados, utils, animation-config
├── hooks/             # useCursor (custom cursor)
├── data/              # dados estáticos (team, etc.)
└── App.tsx            # rotas + ScrollToTop + AnimatePresence

public/                # assets estáticos (logos, fonts, imagens da Cami, team)
wrangler.jsonc         # config do Cloudflare Worker
```

## Princípios

1. **Consumer-first**: a tecnologia serve o consumidor, não o contrário.
2. **Apple-inspired minimalism**: tipografia editorial, dark, monoespaçada, respiração generosa.
3. **Performance > efeitos**: animações respeitam `prefers-reduced-motion`. Cursor custom só em pointer fine.
4. **Acessibilidade**: semântica correta, aria-labels, contraste, navegação por teclado.
5. **LGPD**: formulário com consentimento explícito + link para `/privacidade`.

## Comunicação — palavras proibidas

Nada de: "chatbot", "tecnologia de ponta", "somos especialistas em IA", "LLM treinada", "usamos Claude/Gemini/OpenAI".

A RBBT é **infraestrutura cognitiva para varejo** — não é ferramenta, não é chatbot, não é "só IA".
