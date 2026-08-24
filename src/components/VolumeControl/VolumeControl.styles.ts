import { tokens } from '@/styles/tokens';
import type { VolumeControlSize } from './VolumeControl.types';

export const volumeControlStyles = {
  root: 'group flex items-center gap-2',
  button: `${tokens.iconButton} shrink-0 rounded-full text-ink-soft hover:text-ink`,
  buttonSize: { sm: 'size-7', md: 'size-8' } satisfies Record<VolumeControlSize, string>,
  icon: { sm: 'size-4', md: 'size-[18px]' } satisfies Record<VolumeControlSize, string>,
  track: 'relative h-1 flex-1 rounded-full bg-white/20 transition-[height] duration-150 group-hover:h-1.5',
  fill: 'absolute inset-y-0 left-0 rounded-full bg-white transition-colors group-hover:bg-accent',
  knob: 'absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100',
  input: 'absolute -inset-y-2 inset-x-0 w-full cursor-pointer opacity-0',
  value: 'tabular w-8 shrink-0 text-right text-[11px] text-ink-dim',
} as const;
