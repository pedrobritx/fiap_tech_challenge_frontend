export function Loader({ size = 20 }: { size?: number }) {
  const border = Math.max(2, Math.round(size / 8));
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        borderRadius: '50%',
        border: `${border}px solid rgba(16,185,129,0.3)`,
        borderTopColor: 'var(--brand-500)',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
}

const style = document.createElement('style');
style.innerHTML = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(style);
