// Reusable Tailwind recipes for a consistent design (component styles live in `*.styles.ts`)
export const tokens = {
  focusRing: 'outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
  hover: 'transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active',
  iconButton:
    'grid place-items-center rounded-lg transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
  pill: 'inline-flex h-8 items-center gap-2 rounded-full bg-white/15 px-4 text-[13px] font-medium transition-colors hover:bg-white/25 active:bg-white/30 outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
  field: 'flex h-8 items-center gap-2 rounded-[9px] bg-surface-well px-2.5 text-[13px] shadow-field',
  input: 'w-full min-w-0 bg-transparent outline-none placeholder:text-ink-dim',
  hairline: 'border-surface-line',
  caption: 'text-xs text-ink-dim',
  scroll: 'overflow-auto scrollbar-thin',
} as const;
