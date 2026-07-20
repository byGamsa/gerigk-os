import { tokens } from '@/styles/tokens';

export const contextMenuStyles = {
  panel: 'min-w-[220px] max-w-[300px] rounded-[14px] p-1.5',
  item: `flex h-[34px] w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] ${tokens.hover} ${tokens.focusRing} disabled:pointer-events-none disabled:opacity-40`,
  icon: 'size-4 shrink-0',
  label: 'truncate px-2.5 py-2 text-xs font-semibold text-ink-dim',
  separator: 'mx-1.5 my-1 h-px bg-surface-line',
} as const;
