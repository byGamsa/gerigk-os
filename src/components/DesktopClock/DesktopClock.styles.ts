export const desktopClockStyles = {
  root: 'text-shadow-soft pointer-events-none absolute left-1/2 top-1/2 z-clock -translate-x-1/2 -translate-y-1/2 animate-fade-in text-center [animation-delay:.5s]',
  time: 'tabular text-[clamp(64px,9vw,128px)] font-light leading-none tracking-tight',
  date: 'mt-2 text-[clamp(15px,1.4vw,20px)] opacity-95',
} as const;
