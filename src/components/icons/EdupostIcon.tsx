import React from 'react';

export function EdupostIcon({
  className,
  width = 40,
  height = 40,
  title = 'EduPost',
}: {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      role="img"
    >
      <title>{title}</title>
      <rect width="64" height="64" rx="12" fill="var(--brand-500, #2563eb)" />
      <path
        d="M20 36c0-6 6-10 12-10s12 4 12 10c0 6-6 12-12 12S20 42 20 36z"
        fill="white"
        opacity="0.98"
      />
      <path d="M26 34a2 2 0 11-.001-4.001A2 2 0 0126 34z" fill="#0f172a" />
      <path d="M42 34a2 2 0 11-.001-4.001A2 2 0 0142 34z" fill="#0f172a" />
      <path
        d="M24 44c3-1 7-2 12-2s9 1 12 2"
        stroke="rgba(15,23,42,0.12)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default EdupostIcon;
