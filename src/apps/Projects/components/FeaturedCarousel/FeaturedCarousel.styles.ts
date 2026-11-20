import { tokens } from '@/styles/tokens';

const arrow = `absolute top-1/2 z-[1] grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white shadow-glass backdrop-blur-md transition-[background-color,opacity] hover:bg-black/65 active:bg-black/75 ${tokens.focusRing}`;

export const featuredCarouselStyles = {
  root: 'flex flex-col gap-2.5',
  viewport: 'relative',

  // 1 card + peek on narrow windows, then exactly 2 / 3 cards per view; the next card only peeks into the side padding
  track: 'flex cursor-grab gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] @[560px]:px-6 [&::-webkit-scrollbar]:hidden',
  trackSnap: 'snap-x snap-mandatory scroll-px-4 @[560px]:scroll-px-6',
  trackDragging: 'cursor-grabbing select-none',

  card: `group relative aspect-[16/10] w-[86%] shrink-0 snap-start overflow-hidden rounded-xl text-left @[620px]:aspect-[16/9] @[620px]:w-[calc((100%-12px)/2)] @[1000px]:w-[calc((100%-24px)/3)] ${tokens.focusRing}`,
  art: 'absolute inset-0 size-full rounded-[inherit] transition-transform duration-500 ease-out group-hover:scale-[1.03]',
  image: 'size-full',
  shade: 'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent',
  body: 'absolute inset-x-0 bottom-0 flex items-end gap-3 p-3.5',
  text: 'min-w-0 flex-1',
  eyebrow: 'block text-[10.5px] font-semibold uppercase tracking-[.08em] text-white/70',
  title: 'block truncate text-[17px] font-semibold leading-tight text-shadow',
  tagline: 'block truncate text-[12.5px] text-white/80',
  cta: 'shrink-0 rounded-full bg-white/90 px-3.5 py-1 text-[12px] font-semibold text-black/80 transition-colors group-hover:bg-white',

  prev: `${arrow} left-1.5 @[560px]:left-2.5`,
  next: `${arrow} right-1.5 @[560px]:right-2.5`,
  arrowIcon: 'size-4',

  dots: 'flex justify-center gap-1.5',
  dot: `h-1.5 rounded-full transition-[width,background-color] duration-300 ${tokens.focusRing}`,
  dotIdle: 'w-1.5 bg-white/30 hover:bg-white/55',
  dotActive: 'w-4 bg-white/90',
} as const;
