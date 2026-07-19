import { tokens } from '@/styles/tokens';

export const quickSettingsStyles = {
  panel: 'w-[320px] max-w-[calc(100vw-16px)] p-4',
  grid: 'grid grid-cols-2 gap-2.5',
  tile: `flex h-[74px] flex-col justify-between rounded-2xl p-3 text-left transition-colors duration-200 ${tokens.focusRing}`,
  tileIdle: 'bg-white/10 hover:bg-white/[.16]',
  tileActive: 'bg-accent text-white shadow-glow hover:bg-accent-strong',
  tileIcon: 'size-5',
  tileLabel: 'text-[13px] font-semibold leading-tight',
  tileValue: 'text-[11.5px] opacity-75',
  volume: 'mt-4 rounded-2xl bg-white/10 px-2 py-2',
} as const;
