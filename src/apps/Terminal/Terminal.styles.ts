import type { Tone } from './shell/shell.types';

export const terminalStyles = {
  root: 'flex min-h-0 flex-1 flex-col bg-[#0b0b0f]/[.88] font-mono text-[13.5px] leading-[1.5] text-[#e4e4e7] outline-none',
  scroll: 'min-h-0 flex-1 cursor-text select-text overflow-y-auto px-4 pb-4 pt-3 scrollbar-thin',
  line: 'min-h-[1.5em] whitespace-pre-wrap break-words',
  inputRow: 'flex min-h-[1.5em] items-baseline whitespace-pre',
  input: 'min-w-0 flex-1 bg-transparent p-0 text-inherit caret-[#e4e4e7] outline-none',
  tone: {
    default: '',
    dim: 'text-[#8b8b95]',
    bold: 'font-bold text-white',
    green: 'font-semibold text-[#5af78e]',
    red: 'text-[#ff6b6b]',
    yellow: 'text-[#f4f99d]',
    blue: 'font-semibold text-[#57c7ff]',
    magenta: 'text-[#ff6ac1]',
    cyan: 'text-[#9aedfe]',
  } satisfies Record<Tone, string>,
} as const;
