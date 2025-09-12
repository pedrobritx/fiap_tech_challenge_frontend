import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PostCreate from '../pages/PostCreate';
import { AuthProvider } from '../auth/AuthContext';

const API = 'http://localhost:3000';

describe('Posts', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Home renders list and search', async () => {
    const posts = [
      { id: '1', title: 'Alpha', author: 'A', description: 'd', content: 'c' },
      { id: '2', title: 'Beta', author: 'B', description: 'd', content: 'c' }
    ];

    const fetchMock = vi.spyOn(globalThis as any, 'fetch' as any).mockImplementation((url: any) => {
      if (String(url).endsWith('/posts')) {
        return Promise.resolve(new Response(JSON.stringify(posts), { status: 200, headers: { 'content-type': 'application/json' } })) as any;
      }
      if (String(url).includes('/posts/search?q=')) {
        const q = decodeURIComponent(String(url).split('q=')[1] || '').toLowerCase();
        const filtered = posts.filter((p) => p.title.toLowerCase().includes(q));
        return Promise.resolve(new Response(JSON.stringify(filtered), { status: 200, headers: { 'content-type': 'application/json' } })) as any;
      }
      throw new Error('Unexpected URL ' + url);
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '' }] as any}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    const input = screen.getByLabelText('Buscar por título ou conteúdo');
    fireEvent.change(input, { target: { value: 'alp' } });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(`${API}/posts/search?q=alp`, expect.anything());
    });
  });

  it('PostCreate validates and calls POST /posts', async () => {
    const postsResponse = new Response(JSON.stringify([]), { status: 200, headers: { 'content-type': 'application/json' } });
    const postResponse = new Response(JSON.stringify({ id: '1' }), { status: 200, headers: { 'content-type': 'application/json' } });
    const fetchMock = vi.spyOn(globalThis as any, 'fetch' as any).mockImplementation((url: any, init: any) => {
      if (String(url).endsWith('/posts')) {
        if (init?.method === 'POST') {
          return Promise.resolve(postResponse) as any;
        }
        return Promise.resolve(postsResponse) as any;
      }
      return Promise.resolve(postsResponse) as any;
    });

    // Seed token to pass PrivateRoute in create page context if needed
    localStorage.setItem('edupost_token', 'fake');
    localStorage.setItem('edupost_user', 'teacher@school');

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ pathname: '/admin/posts/new' }] as any}>
          <Routes>
            <Route path="/admin/posts/new" element={<PostCreate />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    const publish = await screen.findByRole('button', { name: /publicar/i });
    fireEvent.click(publish);
    expect(await screen.findByRole('alert')).toHaveTextContent(/preencha os campos/i);

    // fill in
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'My Post' } });
    fireEvent.change(screen.getByLabelText(/conteúdo/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Teacher' } });
    fireEvent.click(screen.getByRole('button', { name: /publicar/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(`${API}/posts`, expect.objectContaining({ method: 'POST' }));
    });
  });
});
