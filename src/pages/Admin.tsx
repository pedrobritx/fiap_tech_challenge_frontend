import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postsService } from '../services/adaptivePosts';
import type { Post } from '../services/apiClient';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { EmptyState } from '../components/ui/EmptyState';
import { Loader } from '../components/ui/Loader';
import { Toast } from '../components/ui/Toast';
import { formatDate } from '../utils/format';

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Post | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await postsService.list();
      setPosts(data);
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const columns = [
    { key: 'title', header: 'Título' },
    { key: 'author', header: 'Autor', width: '20%' },
    { key: 'createdAt', header: 'Criado em', width: '15%' },
  ];

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}
      >
        <h1 className="page-title">Gerenciar Posts</h1>
        <Button onClick={() => navigate('/admin/posts/new')} aria-label="Criar novo post">
          + Novo
        </Button>
      </div>

      {loading && (
        <div style={{ display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <Loader size={28} />
        </div>
      )}

      {error && (
        <p role="alert" style={{ color: '#b91c1c' }}>
          {error}
        </p>
      )}

      {!loading && posts.length === 0 && (
        <EmptyState
          title="Sem posts ainda"
          description="Crie seu primeiro post para começar."
          action={<Button onClick={() => navigate('/admin/posts/new')}>Criar post</Button>}
        />
      )}

      {!loading && posts.length > 0 && (
        <Table
          columns={columns}
          data={posts.map((p) => ({ ...p, createdAt: formatDate(p.createdAt) }))}
          renderActions={(row) => (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link
                to={`/admin/posts/${row.id}/edit`}
                className="btn-primary"
                aria-label={`Editar ${row.title}`}
              >
                Editar
              </Link>
              <Button
                variant="danger"
                onClick={() => setToDelete(row as Post)}
                aria-label={`Excluir ${row.title}`}
              >
                Excluir
              </Button>
            </div>
          )}
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Excluir post?"
        description={
          <span>
            Essa ação não poderá ser desfeita.
            <br />
            Deseja continuar?
          </span>
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (!toDelete) return;
          try {
            await postsService.remove(toDelete.id);
            setToast('Post excluído com sucesso!');
            setToDelete(null);
            await load();
          } catch (e: any) {
            setToast(e.message || 'Erro ao excluir');
            setToDelete(null);
          }
        }}
      />

      <Toast message={toast || ''} open={!!toast} onClose={() => setToast(null)} />
    </div>
  );
}
