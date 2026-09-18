import { tokens } from '@/styles/tokens';

export const previewPageStyles = {
  root: 'flex flex-1 items-center justify-center overflow-auto bg-[#141418] p-6',
  card: 'flex w-full max-w-[520px] flex-col items-center rounded-3xl bg-white/[.04] px-8 py-10 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]',
  icon: 'size-20 rounded-full object-cover shadow-[0_10px_30px_rgba(0,0,0,.45)]',
  iconFallback: 'size-16 text-ink-dim',
  host: 'mt-5 text-[12.5px] font-medium uppercase tracking-[.1em] text-ink-dim',
  title: 'mt-2 text-[22px] font-semibold leading-snug',
  description: 'mt-3 text-[14px] leading-relaxed text-ink-dim',
  button: `mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#fb542b] px-6 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(251,84,43,.35)] transition-transform duration-150 ease-spring hover:scale-[1.03] active:scale-95 ${tokens.focusRing}`,
  buttonIcon: 'size-4',
  note: 'mt-5 max-w-[42ch] text-[12px] leading-relaxed text-ink-faint',
} as const;
