import { tokens } from '@/styles/tokens';

export const toolbarStyles = {
  root: 'flex items-center gap-1 border-b border-white/[.06] bg-white/[.1] px-2 py-1.5',
  button: `${tokens.iconButton} size-8 shrink-0 rounded-lg disabled:pointer-events-none disabled:opacity-35`,
  icon: 'size-[17px]',
  form: 'mx-1 flex h-8 min-w-0 flex-1 items-center gap-2 rounded-full bg-black/30 px-3 text-[13px] shadow-field focus-within:ring-2 focus-within:ring-[#fb542b]/60',
  lock: 'size-3.5 shrink-0 text-ink-dim',
  input: tokens.input,
} as const;
