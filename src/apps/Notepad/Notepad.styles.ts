import { tokens } from '@/styles/tokens';

export const notepadStyles = {
  root: 'flex min-h-0 flex-1 flex-col',
  menu: 'flex gap-0.5 px-2 pb-1.5 text-[13px]',
  menuItem: `rounded-md px-2.5 py-1 ${tokens.hover}`,
  editor: `flex-1 resize-none select-text border-t border-surface-line bg-surface-well px-5 py-4 font-mono text-sm leading-relaxed text-[#f3eee9] outline-none selection:bg-accent/40 ${tokens.scroll}`,
} as const;
