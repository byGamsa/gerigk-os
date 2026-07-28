import { tokens } from '@/styles/tokens';

// Narrow windows: name + size · wide windows: all four columns
const columns =
  'grid grid-cols-[minmax(0,1fr)_64px] @[560px]:grid-cols-[minmax(150px,2fr)_minmax(120px,1.6fr)_minmax(100px,1.2fr)_64px]';

export const explorerStyles = {
  root: 'flex min-h-0 flex-1 flex-col',

  toolbar: 'flex items-center gap-2 px-3 pb-2.5',
  navButton: `${tokens.iconButton} size-[30px] disabled:pointer-events-none disabled:opacity-35`,
  navIcon: 'size-4',
  path: `${tokens.field} min-w-0 flex-1`,
  pathIcon: 'size-4 shrink-0',
  pathRoot: 'hidden shrink-0 text-ink-dim @[420px]:inline',
  pathSeparator: 'hidden size-3 shrink-0 text-ink-faint @[420px]:block',
  pathCurrent: 'truncate',

  main: 'flex min-h-0 flex-1 border-t border-surface-line',
  sidebar: `hidden w-44 shrink-0 flex-col gap-0.5 border-r border-surface-line p-2 ${tokens.scroll} @[560px]:flex`,
  sideItem: `flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] ${tokens.hover} ${tokens.focusRing}`,
  sideItemActive: 'bg-surface-active hover:bg-surface-active',
  sideIcon: 'size-[18px] shrink-0 opacity-90',

  list: `min-w-0 flex-1 p-2 ${tokens.scroll}`,
  head: `${columns} mx-2.5 mb-1 gap-3 border-b border-white/[.06] pb-2 pt-1 text-[11px] font-medium uppercase tracking-[.08em] text-ink-faint`,
  row: `${columns} h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-[13px] ${tokens.hover} ${tokens.focusRing}`,
  rowSelected: 'bg-surface-select shadow-[inset_0_0_0_1px_rgba(90,169,255,.5)] hover:bg-surface-select',
  cell: 'truncate',
  cellWide: 'hidden truncate text-ink-dim @[560px]:block',
  cellSize: 'truncate text-right text-ink-dim',
  headRight: 'text-right',
  name: 'flex min-w-0 items-center gap-2.5',
  fileIcon: 'size-5 shrink-0',

  empty: 'flex flex-col items-center gap-3 py-14 text-center text-[13px] text-ink-dim',
  emptyIcon: 'size-10 opacity-40',

  status: 'flex h-[30px] shrink-0 items-center border-t border-surface-line px-3.5 text-xs text-ink-dim',
} as const;
