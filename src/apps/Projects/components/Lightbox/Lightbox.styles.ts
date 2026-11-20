import { tokens } from '@/styles/tokens';

const roundButton = `grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors hover:bg-white/25 active:bg-white/30 ${tokens.focusRing}`;

export const lightboxStyles = {
  root: 'absolute inset-0 z-10 flex animate-fade-up flex-col bg-black/75 outline-none backdrop-blur-md',
  bar: 'flex items-center justify-between gap-3 px-3 py-2.5',
  position: 'text-xs tabular text-ink-dim',
  close: roundButton,
  stage: 'relative flex min-h-0 flex-1 items-center justify-center px-3 @[560px]:px-14',
  image: 'max-h-full max-w-full select-none rounded-lg object-contain shadow-panel',
  prev: `${roundButton} absolute left-3`,
  next: `${roundButton} absolute right-3`,
  icon: 'size-4',
  caption: 'px-4 pb-4 pt-3 text-center text-[13px] text-ink-soft',
} as const;
