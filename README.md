# EduPost — Frontend

> Interface web da plataforma de blogging educacional EduPost. Aplicação React com TypeScript, design responsivo e acessível, tema glassmorphism em verde coruja.

## 📋 Sobre o Projeto

Frontend da plataforma EduPost desenvolvido como parte do Tech Challenge 3 da FIAP. Interface moderna e intuitiva para criação, leitura, edição e gerenciamento de posts educacionais.

### Características Principais

- ⚡️ **Vite** — Build tool rápida e moderna
- ⚛️ **React 18** — Biblioteca UI com hooks e componentes funcionais
- 📘 **TypeScript** — Type safety e melhor DX
- 🎨 **CSS Modules** — Estilização componentizada e scopada
- 🔐 **Autenticação JWT** — Sistema de login com tokens Bearer
- 🧪 **Vitest + React Testing Library** — Testes unitários e de integração
- 📝 **Markdown** — Renderização de posts com biblioteca `marked`
- 🔄 **Modo Adaptativo** — Fallback automático para dados mock quando API indisponível
- ♿️ **Acessível** — Semântica HTML, ARIA labels e navegação por teclado

## 🛠️ Requisitos

- **Node.js** versão LTS (>= 18)
- **npm** ou **pnpm**

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/pedrobritx/fiap_tech_challenge_frontend.git
cd tech_challenge_3_frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e configure a URL da API backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> **Nota:** O projeto funciona mesmo sem backend ativo, utilizando dados mock automaticamente.

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

| Script               | Descrição                                         |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Inicia servidor de desenvolvimento com hot reload |
| `npm run build`      | Gera build otimizado para produção                |
| `npm run preview`    | Serve o build de produção localmente              |
| `npm run test`       | Executa todos os testes uma vez                   |
| `npm run test:watch` | Executa testes em modo watch                      |
| `npm run lint`       | Verifica código com ESLint                        |
| `npm run format`     | Formata código com Prettier                       |

## 📁 Estrutura do Projeto

```text
tech_challenge_3_frontend/
├── public/
│   ├── auth_test.html          # Página de teste de autenticação
│   └── set_token.html          # Utilitário para setar token manualmente
├── src/
│   ├── app/
│   │   ├── providers.tsx       # Context providers (Router, Auth)
│   │   └── router.tsx          # Configuração de rotas
│   ├── auth/
│   │   ├── AuthContext.tsx     # Context de autenticação
│   │   ├── authReducer.ts      # Reducer para estado de auth
│   │   └── PrivateRoute.tsx    # Componente de rota protegida
│   ├── components/
│   │   ├── icons/
│   │   │   └── EdupostIcon.tsx # Ícone SVG do logo
│   │   ├── layout/
│   │   │   ├── AppShell.tsx    # Layout principal da aplicação
│   │   │   └── Header.tsx      # Cabeçalho com navegação
│   │   └── ui/                 # Componentes reutilizáveis
│   │       ├── BackButton.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ConfirmDialog.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Loader.tsx
│   │       ├── Table.tsx
│   │       ├── TextArea.tsx
│   │       ├── TextField.tsx
│   │       └── Toast.tsx
│   ├── pages/
│   │   ├── Admin.tsx           # Painel administrativo
│   │   ├── Home.tsx            # Listagem de posts
│   │   ├── Login.tsx           # Página de autenticação
│   │   ├── PostCreate.tsx      # Criação de novo post
│   │   ├── PostEdit.tsx        # Edição de post existente
│   │   └── PostRead.tsx        # Visualização de post
│   ├── services/
│   │   ├── adaptivePosts.ts    # Serviço adaptativo (API + Mock)
│   │   ├── apiClient.ts        # Cliente HTTP base
│   │   ├── mockData.ts         # Dados mock para desenvolvimento
│   │   └── posts.ts            # Serviço de posts da API
│   ├── styles/
│   │   ├── globals.css         # Estilos globais
│   │   └── tokens.css          # Design tokens (cores, espaçamentos)
│   ├── tests/
│   │   ├── auth.test.tsx       # Testes de autenticação
│   │   ├── posts.test.tsx      # Testes de posts
│   │   └── setup.ts            # Configuração do ambiente de testes
│   ├── utils/
│   │   └── format.ts           # Funções de formatação
│   ├── App.tsx                 # Componente raiz
│   ├── Logo.tsx                # Componente de logo
│   ├── main.tsx                # Entry point
│   ├── types.ts                # Tipos TypeScript globais
│   └── vite-env.d.ts           # Tipos do Vite
├── .env.example                # Exemplo de variáveis de ambiente
├── index.html                  # HTML principal
├── package.json                # Dependências e scripts
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite (proxy, build)
├── vitest.config.ts            # Configuração Vitest
└── README.md                   # Este arquivo
```

## 🔐 Autenticação

### Fluxo de Autenticação

1. Usuário acessa `/login` e fornece credenciais
2. Frontend envia `POST /auth/login` com `{ email, password }`
3. Backend retorna `{ token, user }` (token JWT)
4. Token é salvo no `localStorage` como `edupost_token`
5. Requisições protegidas incluem header `Authorization: Bearer <token>`
6. Em caso de resposta `401`, usuário é redirecionado para `/login`

### Rotas Protegidas

As seguintes rotas requerem autenticação:

- `/admin` — Painel administrativo
- `/admin/posts/new` — Criar novo post
- `/admin/posts/:id/edit` — Editar post

## 🛣️ Rotas da Aplicação

| Rota                    | Componente   | Descrição                            | Protegida |
| ----------------------- | ------------ | ------------------------------------ | --------- |
| `/`                     | `Home`       | Lista de posts com busca e paginação | ❌        |
| `/posts/:id`            | `PostRead`   | Visualização completa do post        | ❌        |
| `/login`                | `Login`      | Página de autenticação               | ❌        |
| `/admin`                | `Admin`      | Painel de gerenciamento              | ✅        |
| `/admin/posts/new`      | `PostCreate` | Formulário de criação                | ✅        |
| `/admin/posts/:id/edit` | `PostEdit`   | Formulário de edição                 | ✅        |

## 🔌 Integração com API

### Configuração do Proxy

O Vite está configurado para fazer proxy de requisições `/api/*` para o backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### Endpoints Esperados

| Método   | Endpoint      | Descrição                                         |
| -------- | ------------- | ------------------------------------------------- |
| `GET`    | `/posts`      | Lista posts (com query params de busca/paginação) |
| `GET`    | `/posts/:id`  | Obtém post por ID                                 |
| `POST`   | `/posts`      | Cria novo post (protegido)                        |
| `PUT`    | `/posts/:id`  | Atualiza post (protegido)                         |
| `DELETE` | `/posts/:id`  | Remove post (protegido)                           |
| `POST`   | `/auth/login` | Autenticação                                      |

### Modo Adaptativo

O serviço `adaptivePosts.ts` detecta automaticamente se o backend está disponível:

- ✅ **Backend ativo**: usa API real
- ❌ **Backend offline**: usa dados mock local

Isso permite desenvolver e testar a interface mesmo sem backend rodando.

## 🧪 Testes

### Executar Testes

```bash
# Executar uma vez
npm run test

# Modo watch
npm run test:watch
```

### Cobertura

Os testes cobrem:

- ✅ Fluxo de autenticação (login, logout, rotas protegidas)
- ✅ Operações CRUD de posts
- ✅ Renderização de componentes
- ✅ Interações do usuário

### Ferramentas

- **Vitest** — Test runner rápido e compatível com Vite
- **React Testing Library** — Testes centrados no usuário
- **Happy DOM / JSDOM** — Ambiente de DOM para testes

## 🎨 Design System

### Tokens CSS

Cores, espaçamentos e tipografia definidos em `src/styles/tokens.css`:

```css
--color-primary: #2d5016; /* Verde coruja escuro */
--color-primary-light: #4a7c2c; /* Verde médio */
--color-glass-bg: rgba(255, 255, 255, 0.1);
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
/* ... */
```

### Componentes UI

Todos os componentes em `src/components/ui/` são:

- ✅ Tipados com TypeScript
- ✅ Estilizados com CSS Modules
- ✅ Acessíveis (ARIA, semântica)
- ✅ Reutilizáveis

## ♿️ Acessibilidade

- ✅ Semântica HTML5 apropriada
- ✅ Labels e descrições ARIA
- ✅ Navegação completa por teclado
- ✅ Contraste de cores seguindo WCAG 2.1
- ✅ Foco visível em elementos interativos
- ✅ Mensagens de erro descritivas

## 🔧 Qualidade de Código

### Linting

```bash
npm run lint
```

Configurado com:

- ESLint + TypeScript parser
- Plugin React + React Hooks
- Integração com Prettier

### Formatação

```bash
npm run format
```

Prettier configurado para manter código consistente.

## 🚀 Build e Deploy

### Build de Produção

```bash
npm run build
```

Gera arquivos otimizados em `dist/`:

- Minificação de JS/CSS
- Tree-shaking
- Code splitting
- Asset optimization

### Preview Local

```bash
npm run preview
```

Serve o build de produção em `http://localhost:4173`

### Deploy

O projeto pode ser deployado em:

- **Vercel** (recomendado para Vite)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

Lembre-se de configurar a variável `VITE_API_BASE_URL` no ambiente de produção.
