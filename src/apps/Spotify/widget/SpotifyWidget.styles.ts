import { tokens } from '@/styles/tokens';

export const spotifyWidgetStyles = {
  root: 'glass-strong relative flex w-[min(360px,calc(100vw-24px))] flex-col gap-3 overflow-hidden rounded-[26px] p-4',
  glow: 'pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-cover bg-center opacity-50 blur-3xl saturate-150',
  header: 'relative flex items-center gap-3.5',
  cover: 'size-[60px] shrink-0 rounded-xl object-cover shadow-[0_8px_20px_rgba(0,0,0,.4)]',
  coverFallback: 'grid size-[60px] shrink-0 place-items-center rounded-xl bg-white/10',
  coverFallbackIcon: 'size-6 text-ink-dim',
  text: 'min-w-0 flex-1',
  title: 'truncate text-[15px] font-semibold',
  artist: 'truncate text-[13px] text-ink-dim',
  actions: 'flex shrink-0 items-center gap-0.5 self-start',
  action: `${tokens.iconButton} size-8 rounded-full text-ink-dim hover:text-ink`,
  actionIcon: 'size-4',
  brand: 'size-5',
} as const;
