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

// Glass recycle bin with recycling arrows
function Trash(p: IconSvgProps) {
  const body = useSvgId('tb');
  const arrow = useSvgId('ta');
  const shine = useSvgId('ts');
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".92" />
          <stop offset=".55" stopColor="#dcebff" stopOpacity=".55" />
          <stop offset="1" stopColor="#b9d6ff" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id={arrow} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6cc0ff" />
          <stop offset="1" stopColor="#1e6fe0" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M13.5 19h37l-3.3 36.4A5 5 0 0 1 42.2 60H21.8a5 5 0 0 1-5-4.6z"
        fill={`url(#${body})`}
        stroke="#fff"
        strokeOpacity=".95"
        strokeWidth="1.2"
      />
      <path d="M18 22h3l2.6 33h-3z" fill={`url(#${shine})`} opacity=".7" />
      <rect x="10.5" y="12" width="43" height="7.5" rx="3.75" fill="#fff" fillOpacity=".95" />
      <rect x="25.5" y="7.5" width="13" height="5.5" rx="2.2" fill="none" stroke="#fff" strokeWidth="2" />
      <g fill="none" stroke={`url(#${arrow})`} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24.5 41a8 8 0 0 1 11.7-9.2" />
        <path d="m36.6 28.2.1 4-3.9.7" />
        <path d="M39.5 37a8 8 0 0 1-11.7 9.2" />
        <path d="m27.4 49.8-.1-4 3.9-.7" />
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

function Notepad(p: IconSvgProps) {
  return (
    <Tile gradient={['#86d4ff', '#2d6be6']} {...p}>
      <rect x="17" y="13" width="30" height="38" rx="4.5" fill="#fff" fillOpacity=".96" />
      <path d="M23 23h18M23 30h18M23 37h11" stroke="#2d6be6" strokeWidth="3" strokeLinecap="round" />
    </Tile>
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

function TextFile(p: IconSvgProps) {
  return (
    <svg viewBox="0 0 48 48" {...p}>
      <path d="M12 4h17l11 11v27a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="#f4f7fb" />
      <path d="M29 4v8a3 3 0 0 0 3 3h8z" fill="#c9d4e2" />
      <path d="M15 22h18M15 28h18M15 34h12" stroke="#8a9bb2" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function Folder(p: IconSvgProps) {
  const g = useSvgId('fd');
  return (
    <svg viewBox="0 0 48 48" {...p}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd86b" />
          <stop offset="1" stopColor="#f5a524" />
        </linearGradient>
      </defs>
      <path d="M5 12a3 3 0 0 1 3-3h10l4 4h18a3 3 0 0 1 3 3v2H5z" fill="#e59a1c" />
      <rect x="5" y="16" width="38" height="24" rx="3.5" fill={`url(#${g})`} />
    </svg>
  );
}

// Spotify logo (for the link to my own playlist)
function Spotify(p: IconSvgProps) {
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <circle cx="32" cy="32" r="27" fill="#1ed760" />
      <g fill="none" stroke="#121212" strokeLinecap="round">
        <path d="M17.5 24.5c9.8-3 21.2-2.2 29.8 2.6" strokeWidth="4.4" />
        <path d="M19.5 33c8-2.3 17.3-1.6 24.4 2.3" strokeWidth="3.6" />
        <path d="M21.5 40.8c6.4-1.7 13.4-1.2 19 1.8" strokeWidth="3" />
      </g>
    </svg>
  );
}

// Settings/System – gear on a tile
function System(p: IconSvgProps) {
  return (
    <Tile gradient={['#9aa6b8', '#4b5563']} {...p}>
      <g fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round">
        <circle cx="32" cy="32" r="6.5" />
        <path d="M32 14.5v5M32 44.5v5M14.5 32h5M44.5 32h5M19.6 19.6l3.5 3.5M40.9 40.9l3.5 3.5M19.6 44.4l3.5-3.5M40.9 23.1l3.5-3.5" />
      </g>
    </Tile>
  );
}

// Brave browser: orange lion shield (simplified)
function Brave(p: IconSvgProps) {
  const g = useSvgId('brave');
  return (
    <svg viewBox="0 0 64 64" {...p}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6a3d" />
          <stop offset="1" stopColor="#f1391e" />
        </linearGradient>
      </defs>
      <path d="M20 6h24l5 6 6-1-3 9 1.5 5L48 48l-16 10-16-10-5.5-23L12 20 9 11l6 1z" fill={`url(#${g})`} />
      <path
        d="M32 22c-3 0-5.5-1.8-8-1.8-2.8 0-4.8 2.5-4.2 5l1.8 6.8c.4 1.6 1.4 2.8 2.8 3.6l4 2.4-2.6 3.2L32 47l6.2-5.8-2.6-3.2 4-2.4c1.4-.8 2.4-2 2.8-3.6l1.8-6.8c.6-2.5-1.4-5-4.2-5-2.5 0-5 1.8-8 1.8z"
        fill="#fff"
      />
      <path d="M26.5 30.5 30 32M37.5 30.5 34 32" stroke="#f1391e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Terminal: dark tile with prompt
function Terminal(p: IconSvgProps) {
  return (
    <Tile gradient={['#3f3f46', '#111114']} {...p}>
      <path d="M18 24l9 8-9 8" fill="none" stroke="#5af78e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 41h14" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </Tile>
  );
}

export const appIcons = {
  terminal: Terminal,
  brave: Brave,
  system: System,
  spotify: Spotify,
  logo: Logo,
  trash: Trash,
  notepad: Notepad,
  about: About,
  textFile: TextFile,
  folder: Folder,
} satisfies Record<string, IconComponent>;
