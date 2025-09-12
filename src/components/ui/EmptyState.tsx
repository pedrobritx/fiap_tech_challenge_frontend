import { ReactNode } from 'react';

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="glass" style={{ padding: '2rem', textAlign: 'center' }} role="status" aria-live="polite">
      <div style={{ fontSize: 28, marginBottom: 8 }}>🦉</div>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{title}</h3>
      {description && <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>{description}</p>}
      {action}
    </div>
  );
}

