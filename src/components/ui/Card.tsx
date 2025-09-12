import { ReactNode } from 'react';
import styles from './Card.module.css';

export function Card({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className={`glass ${styles.card}`}>
      {title && (
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
      )}
      <div>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </section>
  );
}

