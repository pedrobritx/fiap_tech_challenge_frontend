import { ReactNode, useContext } from 'react';
import { Header } from './Header';
import styles from './AppShell.module.css';
import { AuthContext } from '../../auth/AuthContext';

export function AppShell({ children }: { children: ReactNode }) {
  const { state } = useContext(AuthContext);
  return (
    <div className={styles.root}>
      <Header />
      <main className="container">
        {children}
        <footer className={styles.footer} aria-label="Rodapé">
          <p>EduPost — aprendizagem em foco • {new Date().getFullYear()}</p>
          {state.userEmail && <p>Logado como: {state.userEmail}</p>}
        </footer>
      </main>
    </div>
  );
}

