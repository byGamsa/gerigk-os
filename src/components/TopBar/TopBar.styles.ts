export const topBarStyles = {
  root: 'glass fixed inset-x-bar-gap top-bar-gap z-bar flex h-topbar animate-slide-down items-center justify-between rounded-xl px-2 text-[13px] [animation-delay:.2s]',
  group: 'flex min-w-0 items-center gap-0.5',
  button:
    'inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-lg px-2.5 outline-none transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active focus-visible:ring-2 focus-visible:ring-accent/70',
  static: 'inline-flex h-[26px] shrink-0 items-center gap-1.5 px-2 max-md:hidden',
  open: 'bg-surface-hover',
  icon: 'size-4',
  logo: 'size-[17px]',
  divider: 'mx-1.5 h-4 w-px bg-white/30 max-md:hidden',
  hideMobile: 'max-md:hidden',
  clock: 'tabular',
} as const;
