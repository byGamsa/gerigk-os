import { useId } from 'react';
import type { IconComponent, IconSvgProps } from '../Icon.types';

// SVG-safe unique ID (useId returns special characters)
function useSvgId(prefix: string) {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}

function Logo(p: IconSvgProps) {
  const g = useSvgId('logo');
  return (
    <svg viewBox="0 0 48 48" {...p}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9bd8ff" />
          <stop offset="1" stopColor="#2b7bf3" />
        </linearGradient>
      </defs>
      <g fill={`url(#${g})`}>
        <rect x="5" y="5" width="18" height="18" rx="3.5" />
        <rect x="25" y="5" width="18" height="18" rx="3.5" />
        <rect x="5" y="25" width="18" height="18" rx="3.5" />
        <rect x="25" y="25" width="18" height="18" rx="3.5" />
      </g>
      <g fill="#fff" opacity=".28">
        <rect x="5" y="5" width="18" height="6" rx="3" />
        <rect x="25" y="5" width="18" height="6" rx="3" />
      </g>
    </svg>
  );
}

export const appIcons = {
  logo: Logo,
} satisfies Record<string, IconComponent>;
