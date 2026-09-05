import { tokens } from '@/styles/tokens';

export const systemStyles = {
  // Narrow: tabs on top, content below · wide: sidebar on the left
  root: 'flex min-h-0 flex-1 flex-col @[720px]:flex-row',
  content: `min-w-0 flex-1 px-6 pb-8 pt-2 @[720px]:pl-4 @[720px]:pr-8 @[720px]:pt-3 ${tokens.scroll}`,

  breadcrumb: 'flex items-center gap-3 text-[26px] font-semibold tracking-tight @[640px]:text-[30px]',
  breadcrumbParent: 'text-ink-dim',
  breadcrumbIcon: 'size-5 text-ink-dim',

  warning: 'mt-5 flex items-start gap-3 rounded-xl bg-amber-400/15 px-4 py-3 text-[13px] shadow-[inset_0_0_0_1px_rgba(251,191,36,.35)]',
  warningIcon: 'mt-0.5 size-5 shrink-0 text-amber-300',
  warningTitle: 'font-semibold text-amber-200',
  warningText: 'mt-0.5 text-ink-soft',

  tiles: 'mt-6 grid grid-cols-1 gap-3 @[480px]:grid-cols-3',

  device: 'mt-8 flex items-center justify-between gap-4 rounded-xl bg-white/[.05] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,.05)]',
  deviceName: 'truncate text-[15px] font-medium',
  deviceSubtitle: 'truncate text-[12.5px] text-ink-dim',
  deviceButton: `inline-flex h-9 shrink-0 items-center rounded-lg bg-white/[.08] px-4 text-[13.5px] transition-colors hover:bg-white/[.13] ${tokens.focusRing}`,

  intro: 'mt-4 max-w-[72ch] text-[13.5px] leading-relaxed text-ink-dim',
  sections: 'mt-1.5 flex flex-col gap-1.5',
  sectionsSpaced: 'mt-6 flex flex-col gap-1.5',
} as const;
