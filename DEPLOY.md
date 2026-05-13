# DEPLOY.md — RBBT Lab Website

> **Última atualização:** 2026-05-12
> **Domínio:** `rbbtlab.ai` (gerenciado no Cloudflare)
> **Org GitHub:** `rbbt-ai`
> **Stack:** React 19 + Vite 7 + TypeScript SPA (BrowserRouter)
> **Plataforma:** Cloudflare Workers + Static Assets

---

## Arquitetura

Site é uma SPA puramente estática. Servida por um Worker Cloudflare via Static Assets binding (`wrangler.jsonc`), com `not_found_handling: "single-page-application"` para que todas as rotas client-side (`/sales`, `/social`, `/sobre`, `/contato`, `/privacidade`) façam fallback para `index.html` com status 200.

```
GitHub: github.com/rbbt-ai/rbbt-website
    │ git push
    ▼
local: pnpm cf:deploy
    │ (1) pnpm build  → ./dist
    │ (2) wrangler deploy
    ▼
Cloudflare Worker: rbbtlab-website
    │ assets binding → ./dist
    │ SPA fallback → index.html
    ▼
Custom domains: rbbtlab.ai, www.rbbtlab.ai
```

---

## Setup inicial (uma vez por máquina)

```bash
# 1. Login na sua conta Cloudflare via wrangler
pnpm exec wrangler login
# abre o navegador → autoriza o Wrangler na conta

# 2. Confirma que está autenticado
pnpm exec wrangler whoami
```

---

## Deploy

```bash
# Deploy completo (build + push pro Worker)
pnpm cf:deploy
```

Saída esperada:

```
Total Upload: X.XX MiB / gzip: X.XX MiB
Uploaded rbbtlab-website (X.XXs)
Deployed rbbtlab-website triggers (X.XXs)
  https://rbbtlab-website.<account>.workers.dev
```

A URL `*.workers.dev` é o deploy padrão. O domínio `rbbtlab.ai` é configurado via Custom Domain (passo abaixo) — uma única vez.

---

## Custom Domain — bindar rbbtlab.ai ao Worker

Como o domínio `rbbtlab.ai` já está no Cloudflare na sua conta, basta:

1. Cloudflare Dashboard → **Workers & Pages** → `rbbtlab-website` → **Settings** → **Domains & Routes** → **Add → Custom Domain**
2. Hostname: `rbbtlab.ai` → **Add Domain**
3. Repetir para `www.rbbtlab.ai`
4. Cloudflare cria automaticamente:
   - registro DNS `AAAA` apontando para o edge
   - cert TLS via Universal SSL
   - rota `rbbtlab.ai/*` → Worker `rbbtlab-website`

Não precisa mexer em DNS manualmente. Pronto em ~30 segundos.

---

## Preview local com runtime Workers

```bash
pnpm cf:preview
# inicia wrangler dev em http://localhost:8787 com a mesma SPA fallback
```

Diferença do `pnpm dev`: `pnpm dev` é o Vite (HMR + dev server). `pnpm cf:preview` simula o ambiente Workers de produção (assets servidos como prod, SPA fallback igual ao deploy).

---

## CI/CD (opcional — fase 2)

Para automatizar deploy em push pro `main`, criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Secrets a criar em GitHub → Settings → Secrets:
- `CLOUDFLARE_API_TOKEN` — gerado em Cloudflare Dashboard → My Profile → API Tokens → "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — disponível no Cloudflare Dashboard (sidebar direita de qualquer página)

---

## Troubleshooting

| Erro | Causa | Fix |
|---|---|---|
| `Error: Not logged in` ao rodar `cf:deploy` | wrangler sem auth | `pnpm exec wrangler login` |
| `/sales` retorna 404 ao dar refresh | `not_found_handling` ausente | já configurado em `wrangler.jsonc` |
| Build falha com erro de Node | Node < 22.12 | `nvm install 22 && nvm use 22` |
| Custom domain "pending" | DNS ainda propagando | aguardar até 60s, geralmente <10s |

---

## Variáveis de ambiente

Formulário de contato usa Formspree (opcional). Para habilitar:

1. Criar form em https://formspree.io
2. Adicionar secret no Cloudflare: `pnpm exec wrangler secret put VITE_FORMSPREE_ENDPOINT`
3. **OU** definir em `.env.production` local antes de rodar `pnpm cf:deploy`:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/XXXX
   ```

Sem essa variável, o formulário cai num fallback `mailto:hello@rbbtlab.ai`.
