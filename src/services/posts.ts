import {
  apiClient,
  type ApiPostDetail,
  type ApiPostListItem,
  type Post,
} from './apiClient';

const base = '/posts';

const excerpt = (text?: string) =>
  text ? text.replace(/\s+/g, ' ').trim().slice(0, 140).concat(text.length > 140 ? '…' : '') : undefined;

const mapListItem = (item: ApiPostListItem): Post => ({
  id: item.id,
  title: item.titulo,
  author: item.autor,
  content: '',
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

const mapDetail = (item: ApiPostDetail): Post => ({
  id: item.id,
  title: item.titulo,
  author: item.autor,
  content: item.conteudo,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  description: excerpt(item.conteudo),
});

type CreatePostInput = {
  title: string;
  content: string;
  userId: string;
};

type UpdatePostInput = {
  title?: string;
  content?: string;
};

const posts = {
  list: async (): Promise<Post[]> => {
    const data = await apiClient.get<ApiPostListItem[]>(base);
    return data.map(mapListItem);
  },
  getById: async (id: string): Promise<Post> => {
    const data = await apiClient.get<ApiPostDetail>(`${base}/${id}`);
    return mapDetail(data);
  },
  search: async (q: string): Promise<Post[]> => {
    const data = await apiClient.get<ApiPostListItem[]>(`${base}/search?q=${encodeURIComponent(q)}`);
    return data.map(mapListItem);
  },
  create: async ({ title, content, userId }: CreatePostInput): Promise<void> => {
    const body = { titulo: title, conteudo: content, usuarioId: userId };
    await apiClient.post(base, body, true);
  },
  update: async (id: string, { title, content }: UpdatePostInput): Promise<void> => {
    const body: Record<string, string> = {};
    if (title !== undefined) body.titulo = title;
    if (content !== undefined) body.conteudo = content;
    await apiClient.put(`${base}/${id}`, body, true);
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete<void>(`${base}/${id}`, true);
  },
};

export default posts;
export { posts };
export const postsService = posts;
