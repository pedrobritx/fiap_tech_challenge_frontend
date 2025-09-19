import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '../components/ui/TextField';
import { TextArea } from '../components/ui/TextArea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { postsService } from '../services/posts';
import type { Post } from '../services/apiClient';
import { Loader } from '../components/ui/Loader';

export default function PostEdit() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id || !post) return;
    setError(null);
    if (!post.title.trim() || !post.content.trim()) {
      setError('Preencha os campos obrigatórios.');
      return;
    }
    setSaving(true);
    try {
      await postsService.update(id, { title: post.title, content: post.content });
      navigate('/admin');
    } catch (e: any) {
      setError(e.message || 'Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (<div style={{ display: 'grid', placeItems: 'center', padding: '2rem' }}><Loader size={28} /></div>);
  if (error) return (<Card title="Erro"><p role="alert">{error}</p></Card>);
  if (!post) return null;

  return (
    <div className="container" style={{ maxWidth: 800 }}>
      <Card title="Editar Post">
        <form onSubmit={onSubmit}>
          <TextField label="Título" name="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} required />
          <TextField label="Autor" name="author" value={post.author} readOnly />
          <TextArea label="Conteúdo (Markdown)" name="content" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} required rows={10} />
          {error && <div role="alert" style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>{error}</div>}
          <Button type="submit" loading={saving}>Salvar</Button>
        </form>
      </Card>
    </div>
  );
}
