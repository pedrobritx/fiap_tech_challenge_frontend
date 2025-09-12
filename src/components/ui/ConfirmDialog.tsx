import { ReactNode, useEffect } from 'react';

export function ConfirmDialog({
  open,
  title = 'Confirmar',
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel
}: {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="glass"
      style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.25)' }}
    >
      <div className="glass" style={{ padding: '1rem', maxWidth: 420, width: '90%' }}>
        <h3 id="confirm-title" style={{ marginTop: 0 }}>{title}</h3>
        {description && <div style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{description}</div>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onConfirm}>{confirmText}</button>
          <button onClick={onCancel} style={{ padding: '0.6rem 0.95rem', borderRadius: 12, border: '1px solid rgba(0,0,0,0.1)' }}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
}

