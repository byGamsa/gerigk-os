import { tokens } from '@/styles/tokens';

export const settingsNavStyles = {
  // Wide windows: sidebar · narrow windows: tabs on top
  root: 'flex shrink-0 flex-col gap-1 border-b border-white/[.06] px-3 pb-2 pt-1 @[720px]:w-64 @[720px]:border-b-0 @[720px]:px-3 @[720px]:pt-3',

  profile: 'mb-4 hidden items-center gap-3 px-2 @[720px]:flex',
  avatar: 'grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffbd73] to-[#ff5f8a] text-xl font-semibold shadow-[0_6px_18px_rgba(255,95,138,.3)]',
  profileText: 'min-w-0',
  profileName: 'truncate text-[15px] font-semibold',
  profileSubtitle: 'truncate text-[12.5px] text-ink-dim',

  list: 'flex gap-1 overflow-x-auto [scrollbar-width:none] @[720px]:flex-col @[720px]:overflow-visible',
  item: `relative flex h-9 shrink-0 items-center gap-3 rounded-lg px-3 text-left text-[14px] ${tokens.hover} ${tokens.focusRing} @[720px]:h-10`,
  itemActive: 'bg-white/[.09] hover:bg-white/[.12]',
  // Blue bar on the left like Windows 11
  indicator: 'absolute left-0 top-1/2 hidden h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent @[720px]:block',
  icon: 'size-[18px] shrink-0',
} as const;
