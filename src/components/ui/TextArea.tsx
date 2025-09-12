import { TextareaHTMLAttributes, forwardRef } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { id, label, error, required, rows = 6, ...rest },
  ref,
) {
  const inputId =
    id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      {label && (
        <label htmlFor={inputId} style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
          {label}{' '}
          {required && (
            <span aria-hidden style={{ color: '#ef4444' }}>
              *
            </span>
          )}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        className="glass"
        style={{ padding: '0.6rem 0.75rem', width: '100%' }}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        required={required}
        rows={rows}
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
