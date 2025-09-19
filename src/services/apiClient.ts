const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(path: string, method: HttpMethod, body?: any, auth = true): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('edupost_token');
  if (auth && token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 204) return undefined as unknown as T;

  let data: any = null;
  const ct = res.headers.get('content-type');
  if (ct && ct.includes('application/json')) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }

  if (!res.ok) {
    if (res.status === 401) {
      window.dispatchEvent(new Event('edupost:unauthorized'));
      if (location.pathname !== '/login') location.assign('/login');
    }
    const message = data?.message || data || `Erro ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export const apiClient = {
  get: <T>(path: string, auth = false) => request<T>(path, 'GET', undefined, auth),
  post: <T>(path: string, body?: any, auth = true) => request<T>(path, 'POST', body, auth),
  put: <T>(path: string, body?: any, auth = true) => request<T>(path, 'PUT', body, auth),
  delete: <T>(path: string, auth = true) => request<T>(path, 'DELETE', undefined, auth)
};

export type ApiPostListItem = {
  id: string;
  titulo: string;
  autor: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiPostDetail = ApiPostListItem & {
  conteudo: string;
};

export type ApiLoginResponse = {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
  };
};

export type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};
