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

// iOS-like tile icon with gradient
function Tile({ gradient: [from, to], children, ...p }: IconSvgProps & { gradient: readonly [string, string] }) {
  const g = useSvgId('tile');
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="15" fill={`url(#${g})`} />
      <rect x="4.5" y="4.5" width="55" height="55" rx="14.5" fill="none" stroke="#fff" strokeOpacity=".35" />
      {children}
    </svg>
  );
}

function About(p: IconSvgProps) {
  return (
    <Tile gradient={['#ffbd73', '#ff5f8a']} {...p}>
      <circle cx="32" cy="26" r="8.5" fill="#fff" />
      <path d="M16.5 49c1.8-8 8.2-12.5 15.5-12.5S45.7 41 47.5 49" fill="#fff" />
    </Tile>
  );
}

export const appIcons = {
  logo: Logo,
  about: About,
} satisfies Record<string, IconComponent>;
