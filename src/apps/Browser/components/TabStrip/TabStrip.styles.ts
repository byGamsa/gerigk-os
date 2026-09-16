import { tokens } from '@/styles/tokens';

export const tabStripStyles = {
  root: 'flex min-w-0 items-end gap-1 overflow-x-auto px-2 pt-0.5 [scrollbar-width:none]',
  tab: `group relative flex h-9 w-52 min-w-[120px] shrink items-center gap-2 rounded-t-xl pl-3 pr-1.5 text-left text-[12.5px] text-ink-dim transition-colors hover:bg-white/[.06] hover:text-ink-soft ${tokens.focusRing}`,
  tabActive: 'bg-white/[.1] text-ink hover:bg-white/[.1] hover:text-ink',
  favicon: 'size-4 shrink-0 rounded-full object-cover',
  faviconFallback: 'size-4 shrink-0 text-ink-dim',
  title: 'min-w-0 flex-1 truncate',
  close: `${tokens.iconButton} size-6 shrink-0 rounded-md opacity-0 group-hover:opacity-100`,
  closeVisible: 'opacity-100',
  closeIcon: 'size-3',
  add: `${tokens.iconButton} mb-1 size-7 shrink-0 rounded-lg`,
  addIcon: 'size-4',
} as const;
