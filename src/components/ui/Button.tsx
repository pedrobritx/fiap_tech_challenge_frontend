import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { Loader } from './Loader';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
};

export function Button({ variant = 'primary', loading = false, disabled, children, ...rest }: Props) {
  const className = [
    styles.button,
    variant === 'secondary' ? styles.secondary : '',
    variant === 'danger' ? styles.danger : '',
    (disabled || loading) ? styles.disabled : ''
  ].join(' ');
  return (
    <button className={className} disabled={disabled || loading} {...rest}>
      {loading && <Loader size={16} aria-label="Carregando" />}
      {children}
    </button>
  );
}

