import { tokens } from '@/styles/tokens';

export const storeHomeStyles = {
  root: 'flex flex-col gap-7 pb-8',

  section: 'flex flex-col gap-3 px-4 @[560px]:px-6',
  heading: 'text-[17px] font-semibold',

  chips: 'flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]',
  chip: `inline-flex h-7 shrink-0 items-center rounded-full bg-white/[.07] px-3 text-xs ${tokens.hover} ${tokens.focusRing}`,
  chipActive: 'bg-accent/80 text-white hover:bg-accent active:bg-accent-strong',

  grid: 'grid gap-x-5 gap-y-1 @[520px]:grid-cols-2 @[1000px]:grid-cols-3',
  row: `group flex w-full items-center gap-3 rounded-xl p-2 text-left ${tokens.hover} ${tokens.focusRing}`,
  rowArt: 'size-14',
  rowText: 'block min-w-0 flex-1 py-1',
  rowTitle: 'block truncate font-medium',
  rowTagline: 'block truncate text-[12.5px] text-ink-dim',
  rowMeta: 'block mt-0.5 truncate text-[11.5px] text-ink-faint',
  rowCta: 'shrink-0 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-accent transition-colors group-hover:bg-white/25',

  empty: 'rounded-xl bg-white/[.05] px-4 py-8 text-center text-ink-dim',
} as const;
