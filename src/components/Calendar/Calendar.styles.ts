import { tokens } from '@/styles/tokens';

export const calendarStyles = {
  panel: 'w-[340px] max-w-[calc(100vw-16px)] overflow-hidden',
  header: 'border-b border-surface-line px-5 pb-3.5 pt-4',
  time: 'tabular text-[34px] font-light leading-tight',
  heading: 'text-[13px] font-medium text-ink-dim',
  nav: 'flex items-center justify-between py-3 pl-5 pr-3',
  month: 'text-sm font-semibold',
  navButtons: 'flex gap-1',
  navButton: `${tokens.iconButton} size-8`,
  navIcon: 'size-4',
  grid: 'grid grid-cols-7 gap-0.5 px-3.5 pb-3',
  gridAnimate: {
    '-1': 'animate-cal-prev',
    '0': 'animate-fade-in [animation-duration:.25s]',
    '1': 'animate-cal-next',
  },
  weekday: 'py-1.5 text-center text-[11px] font-semibold text-ink-dim',
  day: 'grid aspect-square place-items-center rounded-full text-[13px] outline-none transition-[background-color,transform] duration-150 hover:bg-surface-hover active:scale-90 focus-visible:ring-2 focus-visible:ring-accent/70',
  dayOther: 'text-ink-faint',
  dayToday: 'bg-accent font-semibold text-white shadow-glow hover:bg-accent-strong',
  daySelected: 'shadow-[inset_0_0_0_1.5px_theme(colors.accent.DEFAULT)]',
  footer: 'flex items-center justify-between gap-3 border-t border-surface-line px-4 py-3',
  footerText: 'min-w-0',
  footerDate: 'truncate text-[13px] font-medium',
  footerHint: 'text-xs text-ink-dim',
  todayButton: tokens.pill,
} as const;
