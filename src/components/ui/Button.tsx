import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { Loader } from './Loader';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
};

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: Props) {
  const buttonClassName = [
    styles.button,
    variant === 'secondary' ? styles.secondary : '',
    variant === 'danger' ? styles.danger : '',
    disabled || loading ? styles.disabled : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={buttonClassName} disabled={disabled || loading} {...rest}>
      {loading && <Loader size={16} aria-label="Carregando" />}
      {children}
    </button>
  );
}
