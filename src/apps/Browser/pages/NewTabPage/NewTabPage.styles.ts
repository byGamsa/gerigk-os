import { tokens } from '@/styles/tokens';

export const newTabPageStyles = {
  // Soft gradient like the default Brave background
  root: 'relative flex flex-1 flex-col items-center overflow-auto bg-[linear-gradient(170deg,#a58cc4_0%,#c79bb4_45%,#e6aa98_100%)] px-6 pb-10 pt-12 @[640px]:pt-24',
  bookmarks: 'flex flex-wrap justify-center gap-5',
  bookmark: `group flex w-[76px] flex-col items-center gap-2 rounded-xl ${tokens.focusRing}`,
  bookmarkTile:
    'grid size-[70px] place-items-center rounded-2xl bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_18px_rgba(80,40,90,.15)] backdrop-blur-md transition-transform duration-200 ease-spring group-hover:-translate-y-0.5 group-hover:bg-white/45',
  bookmarkIcon: 'size-10 rounded-full object-cover',
  bookmarkLabel: 'w-full truncate text-center text-[12.5px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,.35)]',

  search: 'mt-12 flex h-[58px] w-full max-w-[520px] items-center gap-3 rounded-2xl bg-[#1c1b22] px-5 shadow-[0_12px_32px_rgba(40,20,50,.35)] focus-within:ring-2 focus-within:ring-[#fb542b]/60',
  searchLogo: 'size-5 shrink-0',
  searchInput: 'w-full min-w-0 bg-transparent text-[15px] text-white outline-none placeholder:text-white/45',
  hint: 'mt-3 text-[12px] text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,.25)]',
} as const;
