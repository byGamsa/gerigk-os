import type { IconComponent, IconSvgProps } from '../Icon.types';

// Base for monochrome line icons (inherit `currentColor`)
function Stroke({ children, ...props }: IconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export const systemIcons = {
  logoMono: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="3" y="3" width="8.4" height="8.4" rx="1.6" />
      <rect x="12.6" y="3" width="8.4" height="8.4" rx="1.6" />
      <rect x="3" y="12.6" width="8.4" height="8.4" rx="1.6" />
      <rect x="12.6" y="12.6" width="8.4" height="8.4" rx="1.6" />
    </svg>
  ),
  search: (p) => (
    <Stroke {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Stroke>
  ),
  chevronUp: (p) => (
    <Stroke {...p}>
      <path d="m6 15 6-6 6 6" />
    </Stroke>
  ),
  chevronLeft: (p) => (
    <Stroke {...p}>
      <path d="m15 6-6 6 6 6" />
    </Stroke>
  ),
  chevronRight: (p) => (
    <Stroke {...p}>
      <path d="m9 6 6 6-6 6" />
    </Stroke>
  ),
  wifi: (p) => (
    <Stroke {...p}>
      <path d="M2.5 8.8a14 14 0 0 1 19 0" />
      <path d="M5.6 12.2a9.5 9.5 0 0 1 12.8 0" />
      <path d="M8.8 15.6a5 5 0 0 1 6.4 0" />
      <circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" />
    </Stroke>
  ),
  wifiOff: (p) => (
    <Stroke {...p}>
      <path d="M2.5 8.8a14 14 0 0 1 19 0" opacity=".35" />
      <path d="M5.6 12.2a9.5 9.5 0 0 1 12.8 0" opacity=".35" />
      <path d="M8.8 15.6a5 5 0 0 1 6.4 0" opacity=".35" />
      <path d="m3 3 18 18" />
    </Stroke>
  ),
  volume: (p) => (
    <Stroke {...p}>
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M18.3 6.8a7.5 7.5 0 0 1 0 10.4" />
    </Stroke>
  ),
  volumeLow: (p) => (
    <Stroke {...p}>
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
    </Stroke>
  ),
  volumeMute: (p) => (
    <Stroke {...p}>
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" />
      <path d="m16 9.5 5 5m0-5-5 5" />
    </Stroke>
  ),
  download: (p) => (
    <Stroke {...p}>
      <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />
    </Stroke>
  ),
  dots: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="5.5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18.5" cy="12" r="1.6" />
    </svg>
  ),
  minimize: (p) => (
    <Stroke {...p} strokeWidth={1.4}>
      <path d="M5 12h14" />
    </Stroke>
  ),
  maximize: (p) => (
    <Stroke {...p} strokeWidth={1.4}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
    </Stroke>
  ),
  restore: (p) => (
    <Stroke {...p} strokeWidth={1.4}>
      <rect x="5" y="8" width="11" height="11" rx="2.2" />
      <path d="M8.5 5.2h8a2.3 2.3 0 0 1 2.3 2.3v8" />
    </Stroke>
  ),
  close: (p) => (
    <Stroke {...p} strokeWidth={1.4}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Stroke>
  ),
  power: (p) => (
    <Stroke {...p}>
      <path d="M12 3.5v8" />
      <path d="M6.6 6.6a7.6 7.6 0 1 0 10.8 0" />
    </Stroke>
  ),
  fullscreen: (p) => (
    <Stroke {...p}>
      <path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9m6 0h3.5A1.5 1.5 0 0 1 20 5.5V9m0 6v3.5a1.5 1.5 0 0 1-1.5 1.5H15m-6 0H5.5A1.5 1.5 0 0 1 4 18.5V15" />
    </Stroke>
  ),
  globe: (p) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
    </Stroke>
  ),
  grid: (p) => (
    <Stroke {...p}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </Stroke>
  ),
  refresh: (p) => (
    <Stroke {...p}>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 4.5v4h-4" />
    </Stroke>
  ),
} satisfies Record<string, IconComponent>;
