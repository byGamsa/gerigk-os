export const taskbarStyles = {
  root: 'pointer-events-none fixed inset-x-0 bottom-taskbar-offset z-bar flex justify-center px-2',
  bar: 'glass pointer-events-auto flex h-taskbar min-w-0 max-w-full items-center rounded-bar px-2',
  enter: 'animate-slide-up [animation-delay:.3s]',
  apps: 'flex min-w-0 items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none]',
  separator: 'mx-2 h-[30px] w-px shrink-0 bg-white/25 max-sm:hidden',

  button:
    'group relative mx-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-[13px] outline-none transition-[width,margin,opacity,transform,background-color] duration-300 ease-out hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-accent/70',
  buttonActive: 'bg-surface-active hover:bg-surface-active',
  buttonHidden: 'pointer-events-none !mx-0 !w-0 scale-50 opacity-0',
  icon: 'size-[34px] transition-transform duration-200 ease-spring group-hover:-translate-y-0.5 group-hover:scale-105 group-active:scale-90',
  indicator:
    'absolute bottom-0.5 left-1/2 h-1 -translate-x-1/2 rounded-full transition-all duration-300 ease-out',
  indicatorIdle: 'w-0 opacity-0',
  indicatorRunning: 'w-1.5 bg-white/70 opacity-100',
  indicatorActive: 'w-4 bg-accent opacity-100',
} as const;
