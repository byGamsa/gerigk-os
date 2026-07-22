export const bootStyles = {
  root: 'fixed inset-0 z-boot grid place-items-center bg-[#0d0a0a] transition-[opacity,visibility] duration-700 ease-out',
  visible: 'visible opacity-100',
  hidden: 'invisible opacity-0',
  inner: 'flex flex-col items-center gap-8',
  logo: 'size-16 drop-shadow-[0_0_30px_rgba(90,169,255,.45)]',
  track: 'h-[3px] w-28 overflow-hidden rounded-full bg-white/10',
  bar: 'h-full w-2/5 animate-boot-bar rounded-full bg-gradient-to-r from-transparent via-accent to-transparent',
} as const;
