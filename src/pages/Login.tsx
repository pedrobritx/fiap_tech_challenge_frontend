import { FormEvent, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';
import { apiClient, type ApiLoginResponse } from '../services/apiClient';
import { Card } from '../components/ui/Card';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiClient.post<ApiLoginResponse>('/login', { email, senha: password }, false);
      login(res.token, {
        id: res.usuario.id,
        name: res.usuario.nome,
        email: res.usuario.email,
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Falha ao autenticar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <Card title="Entrar no EduPost">
        <form onSubmit={onSubmit} aria-label="Formulário de login">
          <TextField label="E-mail ou usuário" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Senha" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && (
            <div role="alert" style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>{error}</div>
          )}
          <Button type="submit" loading={loading} aria-label="Entrar">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
