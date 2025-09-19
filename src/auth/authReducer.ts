export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

export type AuthAction =
  | { type: 'LOGIN'; token: string; user: AuthUser | null }
  | { type: 'LOGOUT' };

const parseStoredUser = (raw: string | null): AuthUser | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.id === 'string' &&
      typeof parsed.email === 'string'
    ) {
      const name =
        typeof parsed.name === 'string'
          ? parsed.name
          : typeof parsed.nome === 'string'
            ? parsed.nome
            : null;
      if (name) {
        return { id: parsed.id, name, email: parsed.email };
      }
    }
  } catch (error) {
    console.warn('Falha ao ler usuário armazenado, limpando sessão.', error);
  }
  return null;
};

const storedToken =
  typeof window !== 'undefined' ? localStorage.getItem('edupost_token') : null;
const storedUser =
  typeof window !== 'undefined' ? parseStoredUser(localStorage.getItem('edupost_user')) : null;

export const initialAuthState: AuthState = {
  token: storedUser ? storedToken : null,
  user: storedUser,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('edupost_token', action.token);
      if (action.user) {
        localStorage.setItem('edupost_user', JSON.stringify(action.user));
      } else {
        localStorage.removeItem('edupost_user');
      }
      return { token: action.token, user: action.user };
    case 'LOGOUT':
      localStorage.removeItem('edupost_token');
      localStorage.removeItem('edupost_user');
      return { token: null, user: null };
    default:
      return state;
  }
}
