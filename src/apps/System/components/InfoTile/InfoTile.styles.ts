export const infoTileStyles = {
  root: 'flex min-h-[150px] min-w-0 flex-col rounded-xl bg-white/[.06] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]',
  label: 'flex items-center gap-2 text-[13px] text-ink-soft',
  icon: 'size-4 shrink-0 opacity-80',
  value: 'mt-3 break-words text-[17px] font-semibold leading-snug',
  detail: 'mt-auto truncate pt-4 text-[12.5px] text-ink-soft',
  placeholder: 'text-amber-300/90',
} as const;
