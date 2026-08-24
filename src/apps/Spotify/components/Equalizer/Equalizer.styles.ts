export const equalizerStyles = {
  root: 'flex h-3.5 items-end gap-[2px]',
  bar: 'w-[3px] origin-bottom rounded-full bg-spotify',
  playing: 'animate-equalizer',
  paused: 'scale-y-[.35]',
  delays: ['[animation-delay:-.2s] h-full', '[animation-delay:-.6s] h-4/5', '[animation-delay:-.4s] h-full'],
} as const;
