import { tokens } from '@/styles/tokens';
import type { TransportSize } from './TransportControls.types';

export const transportStyles = {
  root: 'flex items-center justify-center',
  gap: { sm: 'gap-3', md: 'gap-4' } satisfies Record<TransportSize, string>,
  button: `${tokens.iconButton} relative rounded-full text-ink-soft hover:text-ink disabled:pointer-events-none disabled:opacity-40`,
  buttonSize: { sm: 'size-8', md: 'size-9' } satisfies Record<TransportSize, string>,
  icon: { sm: 'size-[18px]', md: 'size-5' } satisfies Record<TransportSize, string>,
  toggleActive: 'text-spotify hover:text-spotify after:absolute after:bottom-0.5 after:size-1 after:rounded-full after:bg-spotify',
  play: `grid place-items-center rounded-full bg-white text-black shadow-lg transition-transform duration-150 ease-spring hover:scale-105 active:scale-95 disabled:opacity-50 ${tokens.focusRing}`,
  playSize: { sm: 'size-10', md: 'size-11' } satisfies Record<TransportSize, string>,
  playIcon: { sm: 'size-5', md: 'size-[22px]' } satisfies Record<TransportSize, string>,
} as const;
