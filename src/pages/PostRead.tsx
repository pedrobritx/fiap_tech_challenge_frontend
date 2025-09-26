import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postsService } from '../services/adaptivePosts';
import type { Post } from '../services/apiClient';
import { Loader } from '../components/ui/Loader';
import { Card } from '../components/ui/Card';
import { BackButton } from '../components/ui/BackButton';
import { formatDate } from '../utils/format';
import { marked } from 'marked';

const COMMENTS_ENABLED = false;

export default function PostRead() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const p = await postsService.getById(id);
        if (mounted) setPost(p);
      } catch (e: any) {
        if (mounted) setError(e.message || 'Erro ao carregar');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div style={{ display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <Loader size={28} />
      </div>
    );
  if (error)
    return (
      <Card title="Erro">
        <p role="alert">{error}</p>
      </Card>
    );
  if (!post) return null;

  return (
    <div>
      <BackButton />
      <article className="glass" style={{ padding: '1rem' }}>
        <header>
          <h1 style={{ marginTop: 0 }}>{post.title}</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            por {post.author} • {formatDate(post.createdAt)}
          </p>
        </header>
        <section
          aria-label="Conteúdo do post"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.content || '') }}
        />

        {COMMENTS_ENABLED && (
          <section aria-label="Comentários" style={{ marginTop: '2rem' }}>
            <h2>Comentários</h2>
            <p style={{ color: 'var(--text-muted)' }}>Em breve.</p>
          </section>
        )}
      </article>
    </div>
  );
}
