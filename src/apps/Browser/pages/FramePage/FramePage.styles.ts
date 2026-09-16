import { tokens } from '@/styles/tokens';

export const framePageStyles = {
  root: 'relative flex min-h-0 flex-1 flex-col bg-white',
  frame: 'min-h-0 flex-1 border-0 bg-white',
  hint: 'flex shrink-0 items-center justify-center gap-2 bg-[#1c1b22] px-3 py-1.5 text-[11.5px] text-ink-dim',
  hintButton: `rounded text-[#ff7a50] hover:underline ${tokens.focusRing}`,
} as const;
