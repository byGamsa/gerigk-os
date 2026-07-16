import { tokens } from '@/styles/tokens';

export const startMenuStyles = {
  panel: 'flex max-h-[calc(100dvh-140px)] w-[580px] max-w-[calc(100vw-16px)] flex-col gap-4 overflow-hidden px-6 pt-6',
  search: 'flex h-10 shrink-0 items-center gap-2.5 rounded-full bg-surface-well px-4 shadow-field',
  searchIcon: 'size-4 shrink-0 text-ink-dim',
  searchInput: tokens.input,
  sectionTitle: 'px-1.5 text-[13px] font-semibold',
  grid: `grid min-h-[120px] grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-1.5 ${tokens.scroll}`,
  app: `flex flex-col items-center gap-2 rounded-xl px-1 py-3 text-center text-xs ${tokens.hover} ${tokens.focusRing}`,
  appIcon: 'size-10 transition-transform duration-200 ease-spring',
  empty: 'col-span-full py-8 text-center text-[13px] text-ink-dim',
  footer: '-mx-6 mt-auto flex shrink-0 items-center justify-between border-t border-surface-line bg-black/10 px-6 py-3',
  user: `-ml-2 flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left ${tokens.hover} ${tokens.focusRing}`,
  userText: 'flex flex-col leading-tight',
  userName: 'text-[13px] font-medium',
  userHint: 'text-[11px] text-ink-dim',
  avatar: 'grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#ffbd73] to-[#ff5f8a] text-[13px] font-semibold shadow-md',
  power: `${tokens.iconButton} size-9`,
  powerIcon: 'size-[18px]',
} as const;
