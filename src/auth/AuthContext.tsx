import { ReactNode, createContext, useEffect, useMemo, useReducer } from 'react';
import {
  authReducer,
  initialAuthState,
  type AuthState,
  type AuthUser,
} from './authReducer';

export const AuthContext = createContext<{
  state: AuthState;
  login: (token: string, user: AuthUser | null) => void;
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
      login: (token: string, user: AuthUser | null) =>
        dispatch({ type: 'LOGIN', token, user }),
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
