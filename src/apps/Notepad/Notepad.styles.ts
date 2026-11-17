import { tokens } from '@/styles/tokens';

const dialogButton = `inline-flex h-8 items-center justify-center rounded-lg px-4 text-[13px] ${tokens.focusRing}`;

export const notepadStyles = {
  root: 'relative flex min-h-0 flex-1 flex-col',
  menu: 'flex items-center gap-0.5 px-2 pb-1.5 text-[13px]',
  menuItem: `rounded-md px-2.5 py-1 ${tokens.hover} ${tokens.focusRing}`,
  fileName: 'ml-auto flex min-w-0 max-w-[50%] items-center gap-1.5 truncate rounded-md px-2.5 py-1 text-ink-dim',
  fileNameEditable: `cursor-text ${tokens.hover}`,
  fileNameInput: `ml-auto w-48 min-w-0 rounded-md bg-surface-well px-2.5 py-1 text-ink shadow-field ${tokens.focusRing}`,
  unsavedDot: 'size-1.5 shrink-0 rounded-full bg-ink-soft',
  editor: `flex-1 resize-none select-text border-t border-surface-line bg-surface-well px-5 py-4 font-mono text-sm leading-relaxed text-[#f3eee9] outline-none selection:bg-accent/40 ${tokens.scroll}`,
  status: 'flex h-7 shrink-0 items-center justify-end gap-5 border-t border-surface-line px-3.5 text-xs text-ink-dim',
  position: 'mr-auto tabular',
  hideNarrow: 'hidden @[480px]:inline',
  // Honeypot: hidden from people, visible to naive bots
  honeypot: 'absolute -left-[9999px] size-px overflow-hidden opacity-0',

  // "Save changes?" before closing
  dialogBackdrop: 'absolute inset-0 z-10 grid place-items-center bg-black/40 p-4',
  dialog: 'glass-strong relative w-full max-w-sm rounded-panel p-5',
  dialogText: 'text-[14px] leading-relaxed',
  dialogActions: 'mt-5 flex flex-wrap justify-end gap-2',
  dialogPrimary: `${dialogButton} bg-accent/90 font-medium text-white hover:bg-accent`,
  dialogButton: `${dialogButton} bg-white/[.08] hover:bg-white/[.13]`,
} as const;
