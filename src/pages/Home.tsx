import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { postsService } from '../services/adaptivePosts';
import type { Post } from '../services/apiClient';
import { Card } from '../components/ui/Card';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';

const PAGE_SIZE = 10;

export default function Home() {
  const [params, setParams] = useSearchParams();
  const qParam = params.get('q') || '';
  const pageParam = Number(params.get('page') || '1');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = qParam ? await postsService.search(qParam) : await postsService.list();
        if (!mounted) return;
        setPosts(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e.message || 'Erro ao carregar');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [qParam]);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, pageParam), totalPages);
  const paginated = useMemo(
    () => posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [posts, page],
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (v) next.set('q', v);
      else next.delete('q');
      next.delete('page');
      return next;
    });
  };

  return (
    <div>
      <h1 className="page-title">Publicações</h1>
      <div className="glass" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Buscar"
          placeholder="Digite palavras-chave..."
          onChange={onSearchChange}
          defaultValue={qParam}
          aria-label="Buscar por título ou conteúdo"
        />
      </div>

      {loading && (
        <div style={{ display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <Loader size={28} />
        </div>
      )}

      {error && (
        <Card title="Erro">
          <p role="alert">{error}</p>
        </Card>
      )}

      {!loading && !error && paginated.length === 0 && (
        <EmptyState
          title="Nada por aqui"
          description="Nenhum post encontrado. Tente outra busca."
        />
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {paginated.map((p) => (
          <Card
            key={p.id}
            title={p.title}
            actions={
              <Link to={`/posts/${p.id}`} className="btn-primary">
                Ler
              </Link>
            }
          >
            <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)' }}>por {p.author}</p>
            {p.description && <p style={{ margin: 0 }}>{p.description}</p>}
          </Card>
        ))}
      </div>

      {!loading && paginated.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '1rem' }}>
          <Button
            variant="secondary"
            onClick={() =>
              setParams((prev) => {
                const n = new URLSearchParams(prev);
                n.set('page', String(Math.max(1, page - 1)));
                return n;
              })
            }
            disabled={page <= 1}
            aria-label="Página anterior"
          >
            Anterior
          </Button>
          <span aria-live="polite" style={{ padding: '0.6rem' }}>
            Página {page} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() =>
              setParams((prev) => {
                const n = new URLSearchParams(prev);
                n.set('page', String(Math.min(totalPages, page + 1)));
                return n;
              })
            }
            disabled={page >= totalPages}
            aria-label="Próxima página"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
