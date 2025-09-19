import { apiClient, type Post } from './apiClient';

const base = '/posts';

const posts = {
  list: async (): Promise<Post[]> => apiClient.get<Post[]>(base),
  getById: async (id: string): Promise<Post> => apiClient.get<Post>(`${base}/${id}`),
  search: async (q: string): Promise<Post[]> =>
    apiClient.get<Post[]>(`${base}/search?q=${encodeURIComponent(q)}`),
  create: async (input: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> =>
    apiClient.post<Post>(base, input, true),
  update: async (id: string, input: Partial<Omit<Post, 'id'>>): Promise<Post> =>
    apiClient.put<Post>(`${base}/${id}`, input, true),
  remove: async (id: string): Promise<void> => apiClient.delete<void>(`${base}/${id}`, true),
};

export default posts;
export { posts };
export const postsService = posts;
