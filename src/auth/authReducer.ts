export type AuthState = {
  token: string | null;
  userEmail: string | null;
};

export type AuthAction =
  | { type: 'LOGIN'; token: string; userEmail: string | null }
  | { type: 'LOGOUT' };

export const initialAuthState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('edupost_token') : null,
  userEmail: typeof window !== 'undefined' ? localStorage.getItem('edupost_user') : null
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('edupost_token', action.token);
      if (action.userEmail) localStorage.setItem('edupost_user', action.userEmail);
      return { token: action.token, userEmail: action.userEmail };
    case 'LOGOUT':
      localStorage.removeItem('edupost_token');
      localStorage.removeItem('edupost_user');
      return { token: null, userEmail: null };
    default:
      return state;
  }
}

