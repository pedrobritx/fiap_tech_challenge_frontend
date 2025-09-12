import { InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { id, label, error, required, ...rest },
  ref
) {
  const inputId = id || rest.name || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label htmlFor={inputId} style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
        {label} {required && <span aria-hidden style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        id={inputId}
        ref={ref}
        className="glass"
        style={{ padding: '0.6rem 0.75rem', width: '100%' }}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        required={required}
        {...rest}
      />
      {error && (
        <div id={`${inputId}-error`} role="alert" style={{ color: '#b91c1c', marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
});

