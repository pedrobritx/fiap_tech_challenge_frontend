import { useEffect, useState } from 'react';

export function Toast({ message, open, duration = 3000, onClose }: { message: string; open: boolean; duration?: number; onClose?: () => void }) {
  const [visible, setVisible] = useState(open);
  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(id);
  }, [visible, duration, onClose]);

  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="glass"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        padding: '0.75rem 1rem',
        maxWidth: 400,
        zIndex: 100,
        background: 'var(--surface-strong)'
      }}
    >
      {message}
    </div>
  );
}

