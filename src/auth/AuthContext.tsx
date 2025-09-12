import { ReactNode, createContext, useEffect, useMemo, useReducer } from 'react';
import { authReducer, initialAuthState, type AuthState } from './authReducer';

export const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, userEmail: string | null) => void;
  logout: () => void;
}>({
  state: initialAuthState,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const value = useMemo(
    () => ({
      state,
      login: (token: string, userEmail: string | null) => dispatch({ type: 'LOGIN', token, userEmail }),
      logout: () => dispatch({ type: 'LOGOUT' })
    }),
    [state]
  );

  useEffect(() => {
    const onUnauthorized = () => dispatch({ type: 'LOGOUT' });
    window.addEventListener('edupost:unauthorized', onUnauthorized);
    return () => window.removeEventListener('edupost:unauthorized', onUnauthorized);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

