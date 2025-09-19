import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../components/ui/TextField';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { postsService } from '../services/posts';
import { AuthContext } from '../auth/AuthContext';

export default function PostCreate() {
  const { state } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(state.user?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthor(state.user?.name || '');
  }, [state.user]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !content.trim()) {
      setError('Preencha os campos obrigatórios.');
      return;
    }
    if (!state.user?.id) {
      setError('Sessão expirada. Faça login novamente.');
      return;
    }
    setLoading(true);
    try {
      await postsService.create({ title, content, userId: state.user.id });
      navigate('/admin');
    } catch (e: any) {
      setError(e.message || 'Erro ao criar post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <Card title="Criar Post">
        <form onSubmit={onSubmit} noValidate>
          <TextField
            label="Título"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Autor"
            name="author"
            value={author}
            readOnly
          />
          <TextArea
            label="Conteúdo (Markdown)"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
          />
          {error && (
            <div role="alert" style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>
              {error}
            </div>
          )}
          <Button type="submit" loading={loading}>
            Publicar
          </Button>
        </form>
      </Card>
    </div>
  );
}
