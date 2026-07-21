export const toastStyles = {
  stack: 'pointer-events-none fixed right-3 top-desk-top z-toast mt-1.5 flex w-[330px] max-w-[calc(100vw-24px)] flex-col gap-2.5',
  toast: 'glass-strong pointer-events-auto relative flex cursor-default items-start gap-3 rounded-2xl p-3.5 text-left',
  enter: 'animate-toast-in',
  exit: 'animate-toast-out',
  icon: 'size-6 shrink-0',
  title: 'text-[13px] font-semibold',
  text: 'mt-0.5 text-[13px] leading-snug text-ink-soft',
} as const;
