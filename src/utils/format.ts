export function formatDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  } catch {
    return iso;
  }
}

