export const trayStyles = {
  root: 'flex shrink-0 items-center gap-0.5',
  button:
    'inline-flex h-11 min-w-8 items-center justify-center gap-2 rounded-[10px] px-2 text-[12.5px] outline-none transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active focus-visible:ring-2 focus-visible:ring-accent/70',
  open: 'bg-surface-hover',
  muted: 'text-ink-dim',
  icon: 'size-[17px]',
  status: 'gap-2.5 px-2.5 max-sm:hidden',
  lang: 'min-w-11 font-semibold tracking-wider text-xs',
  langSwitch: 'inline-block animate-fade-up',
  clock: 'flex-col items-end gap-px px-2.5 text-xs leading-tight',
  hideMobile: 'max-sm:hidden',
} as const;
