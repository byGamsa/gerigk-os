export const progressBarStyles = {
  root: 'group flex items-center gap-2.5 text-[11px] text-ink-dim',
  time: 'tabular w-9 shrink-0',
  timeEnd: 'text-right',
  track: 'relative h-1 flex-1 rounded-full bg-white/20 transition-[height] duration-150 group-hover:h-1.5',
  fill: 'absolute inset-y-0 left-0 rounded-full bg-white transition-colors group-hover:bg-spotify',
  fillAnimated: 'transition-[width] duration-500 ease-linear',
  knob: 'absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100',
  input: 'absolute -inset-y-2 inset-x-0 w-full cursor-pointer opacity-0 disabled:cursor-default',
} as const;
