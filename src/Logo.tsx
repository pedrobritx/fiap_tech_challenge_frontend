import React from 'react';
import { EdupostIcon } from './components/icons/EdupostIcon';

type Props = {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Logo({ width = 40, height = 40, alt = 'EduPost', className, style }: Props) {
  // Resolve asset at runtime; works with Vite and Vitest
  let src: string | null = null;
  try {
    src = new URL('./assets/edupost-logo.png', import.meta.url).href;
  } catch (e) {
    src = null;
  }

  if (!src) return <EdupostIcon width={width} height={height} />;

  return (
    <img src={src} alt={alt} width={width} height={height} className={className} style={style} />
  );
}

export default Logo;
``