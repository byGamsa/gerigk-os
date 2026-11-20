import { tokens } from '@/styles/tokens';

export const projectsStyles = {
  root: 'relative flex min-h-0 flex-1 flex-col',

  toolbar: 'flex items-center gap-2 px-3 pb-2.5',
  back: `${tokens.iconButton} size-[30px] disabled:pointer-events-none disabled:opacity-35`,
  backIcon: 'size-4',
  brand: 'flex min-w-0 flex-1 items-center gap-2',
  brandIcon: 'size-5 shrink-0',
  brandName: 'truncate text-[13px] font-semibold',
  search: `${tokens.field} w-36 @[560px]:w-60`,
  searchIcon: 'size-3.5 shrink-0 text-ink-dim',
  searchInput: tokens.input,

  scroll: `min-h-0 flex-1 border-t border-surface-line pt-5 ${tokens.scroll}`,
} as const;
