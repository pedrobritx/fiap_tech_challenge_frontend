# EduPost — Frontend (React + Vite + TypeScript)

SPA para a plataforma de blogging educacional EduPost. Interface responsiva, acessível e com tema glassmorphism em verde coruja. Integra com API Node/REST configurável via variável de ambiente.

## Requisitos

- Node.js LTS (>= 18)
- pnpm ou npm

## Setup

- Instale dependências:
  - `pnpm i` ou `npm i`
- Configure variáveis:
  - `cp .env.example .env.local`
  - Edite `VITE_API_BASE_URL` conforme seu backend (ex.: `http://localhost:3000`)
- Prepare hooks (opcional, após instalar deps):
  - `npm run prepare` (instala Husky)

## Scripts

- `npm run dev` — roda em dev com Vite
- `npm run build` — build de produção
- `npm run preview` — serve build produzido
- `npm run test` — executa testes (Vitest + RTL)
- `npm run lint` — checa ESLint
- `npm run format` — Prettier

## Estrutura

```
/edupost-frontend
  ├─ src/
  │  ├─ app/
  │  │   ├─ router.tsx
  │  │   └─ providers.tsx
  │  ├─ auth/
  │  │   ├─ AuthContext.tsx
  │  │   ├─ authReducer.ts
  │  │   └─ PrivateRoute.tsx
  │  ├─ components/
  │  │   ├─ ui/ (Card, Button, etc.)
  │  │   └─ layout/ (AppShell, Header)
  │  ├─ pages/ (Home, PostRead, Admin, PostCreate, PostEdit, Login)
  │  ├─ services/ (apiClient, posts)
  │  ├─ styles/ (tokens.css, globals.css)
  │  ├─ tests/ (auth.test.tsx, posts.test.tsx, setup.ts)
  │  ├─ utils/ (format.ts)
  │  ├─ main.tsx
  │  └─ App.tsx
  ├─ .env.example
  ├─ vite.config.ts
  ├─ tsconfig.json
  ├─ README.md
  └─ package.json
```

## Configuração da API

- Defina `VITE_API_BASE_URL` (ex.: `http://localhost:3000`).
- Autenticação:
  - `POST /auth/login` → `{ token }` (JWT). O token é persistido em `localStorage`.
  - Chamadas protegidas enviam `Authorization: Bearer <token>`.
  - Respostas `401` limpam a sessão e redirecionam para `/login`.

## Rotas

- `/` — lista de posts com busca e paginação
- `/posts/:id` — leitura do post
- `/login` — autenticação
- `/admin` — painel de gestão (protegida)
- `/admin/posts/new` — criar post (protegida)
- `/admin/posts/:id/edit` — editar post (protegida)

## Testes e Qualidade

- Testes com Vitest + React Testing Library
- Cobertura configurada em `vite.config.ts`
- ESLint + Prettier
- Husky (pre-commit): roda `lint` e `test`

## Notas de Acessibilidade

- Componentes com semântica adequada, foco visível, rotulagem ARIA e contraste dentro do padrão.

## Extensões futuras (placeholders)

- Comentários no `PostRead` (feature flag desligado por padrão)
- i18n (pt-BR/en-US) com react-i18next
- Modo escuro (tokens prontos)

