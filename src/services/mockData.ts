// Mock data for development/testing
export const mockPosts = [
  {
    id: '1',
    title: 'Introdução ao React',
    author: 'Prof. João Silva',
    content:
      'React é uma biblioteca JavaScript para construir interfaces de usuário. Neste post, vamos explorar os conceitos fundamentais do React, incluindo componentes, props, state e hooks.\n\nO React foi desenvolvido pelo Facebook e é amplamente utilizado na indústria para criar aplicações web modernas e responsivas.',
    createdAt: '2024-09-20T10:00:00Z',
    updatedAt: '2024-09-20T10:00:00Z',
    description:
      'React é uma biblioteca JavaScript para construir interfaces de usuário. Neste post, vamos explorar os conceitos fundamentais do React...',
  },
  {
    id: '2',
    title: 'Fundamentos de TypeScript',
    author: 'Prof. Maria Santos',
    content:
      'TypeScript é um superset do JavaScript que adiciona tipagem estática. Isso nos ajuda a escrever código mais seguro e maintível.\n\nVamos aprender sobre tipos básicos, interfaces, classes e como usar TypeScript em projetos React.',
    createdAt: '2024-09-19T14:30:00Z',
    updatedAt: '2024-09-19T14:30:00Z',
    description:
      'TypeScript é um superset do JavaScript que adiciona tipagem estática. Isso nos ajuda a escrever código mais seguro...',
  },
  {
    id: '3',
    title: 'Gerenciamento de Estado com Context API',
    author: 'Prof. Carlos Lima',
    content:
      'A Context API do React é uma ferramenta poderosa para gerenciar estado global em aplicações React. Ela permite compartilhar dados entre componentes sem precisar passar props manualmente.\n\nVamos ver como criar contexts, providers e consumers.',
    createdAt: '2024-09-18T09:15:00Z',
    updatedAt: '2024-09-18T09:15:00Z',
    description:
      'A Context API do React é uma ferramenta poderosa para gerenciar estado global em aplicações React...',
  },
  {
    id: '4',
    title: 'Testes em React com Jest e Testing Library',
    author: 'Prof. Ana Costa',
    content:
      'Testes são fundamentais para garantir a qualidade do código. Vamos aprender como testar componentes React usando Jest e React Testing Library.\n\nCobriremos testes unitários, testes de integração e boas práticas.',
    createdAt: '2024-09-17T16:45:00Z',
    updatedAt: '2024-09-17T16:45:00Z',
    description:
      'Testes são fundamentais para garantir a qualidade do código. Vamos aprender como testar componentes React...',
  },
  {
    id: '5',
    title: 'Deploy de Aplicações React',
    author: 'Prof. Roberto Oliveira',
    content:
      'Após desenvolver sua aplicação React, é importante saber como fazer o deploy. Vamos explorar diferentes opções de hospedagem como Vercel, Netlify e AWS.\n\nTambém veremos como otimizar a aplicação para produção.',
    createdAt: '2024-09-16T11:20:00Z',
    updatedAt: '2024-09-16T11:20:00Z',
    description:
      'Após desenvolver sua aplicação React, é importante saber como fazer o deploy. Vamos explorar diferentes opções...',
  },
];

export const mockUsers = [
  {
    id: 'admin-001',
    nome: 'Administrador',
    email: 'admin@edupost.com',
    role: 'admin',
  },
  {
    id: 'prof-001',
    nome: 'Prof. João Silva',
    email: 'professor@edupost.com',
    role: 'professor',
  },
];

// Simulate API delay
export const mockDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));
