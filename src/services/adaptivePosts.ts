import { apiClient, type Post } from './apiClient';
import { postsService as realPostsService } from './posts';
import { mockPosts, mockDelay } from './mockData';

// Check if backend is available
let backendAvailable: boolean | null = null;

const checkBackendAvailability = async (): Promise<boolean> => {
  if (backendAvailable !== null) {
    return backendAvailable;
  }

  try {
    // Try to make a simple request to check if backend is up
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    const response = await fetch(
      `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000'}/posts`,
      {
        method: 'GET',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    clearTimeout(timeoutId);
    backendAvailable = response.ok || response.status < 500;
    return backendAvailable;
  } catch (error) {
    console.warn('Backend not available, using mock data:', error);
    backendAvailable = false;
    return false;
  }
};

// Mock posts service
const mockPostsService = {
  list: async (): Promise<Post[]> => {
    await mockDelay(300);
    return [...mockPosts];
  },

  getById: async (id: string): Promise<Post> => {
    await mockDelay(200);
    const post = mockPosts.find((p) => p.id === id);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    return { ...post };
  },

  search: async (q: string): Promise<Post[]> => {
    await mockDelay(400);
    const query = q.toLowerCase();
    return mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query),
    );
  },

  create: async ({
    title,
    content,
    userId,
  }: {
    title: string;
    content: string;
    userId: string;
  }): Promise<void> => {
    await mockDelay(500);

    const newPost = {
      id: String(mockPosts.length + 1),
      title,
      content,
      author: 'Usuário Atual',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: content.slice(0, 140) + (content.length > 140 ? '...' : ''),
    };

    mockPosts.unshift(newPost); // Add to beginning
    console.log('Mock: Post created', newPost);
  },

  update: async (
    id: string,
    { title, content }: { title?: string; content?: string },
  ): Promise<void> => {
    await mockDelay(400);

    const postIndex = mockPosts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }

    const updatedPost = {
      ...mockPosts[postIndex],
      ...(title !== undefined && { title }),
      ...(content !== undefined && {
        content,
        description: content.slice(0, 140) + (content.length > 140 ? '...' : ''),
      }),
      updatedAt: new Date().toISOString(),
    } as (typeof mockPosts)[0];

    mockPosts[postIndex] = updatedPost;
    console.log('Mock: Post updated', updatedPost);
  },

  remove: async (id: string): Promise<void> => {
    await mockDelay(300);

    const postIndex = mockPosts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }

    const removedPost = mockPosts.splice(postIndex, 1)[0];
    console.log('Mock: Post removed', removedPost);
  },
};

// Adaptive posts service that uses real API if available, otherwise mock
const adaptivePostsService = {
  list: async (): Promise<Post[]> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.list();
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false; // Cache that backend is not working
        return await mockPostsService.list();
      }
    } else {
      return await mockPostsService.list();
    }
  },

  getById: async (id: string): Promise<Post> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.getById(id);
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false;
        return await mockPostsService.getById(id);
      }
    } else {
      return await mockPostsService.getById(id);
    }
  },

  search: async (q: string): Promise<Post[]> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.search(q);
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false;
        return await mockPostsService.search(q);
      }
    } else {
      return await mockPostsService.search(q);
    }
  },

  create: async (data: { title: string; content: string; userId: string }): Promise<void> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.create(data);
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false;
        return await mockPostsService.create(data);
      }
    } else {
      return await mockPostsService.create(data);
    }
  },

  update: async (id: string, data: { title?: string; content?: string }): Promise<void> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.update(id, data);
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false;
        return await mockPostsService.update(id, data);
      }
    } else {
      return await mockPostsService.update(id, data);
    }
  },

  remove: async (id: string): Promise<void> => {
    const isBackendAvailable = await checkBackendAvailability();

    if (isBackendAvailable) {
      try {
        return await realPostsService.remove(id);
      } catch (error) {
        console.warn('Real API failed, falling back to mock:', error);
        backendAvailable = false;
        return await mockPostsService.remove(id);
      }
    } else {
      return await mockPostsService.remove(id);
    }
  },
};

export { adaptivePostsService as postsService };
export default adaptivePostsService;
