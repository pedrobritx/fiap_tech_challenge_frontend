import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BackButton({
  to,
  label = '← Voltar',
  className = '',
  style = {},
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant="secondary"
      className={className}
      style={{
        marginBottom: '1rem',
        ...style,
      }}
      aria-label={label}
    >
      {label}
    </Button>
  );
}
