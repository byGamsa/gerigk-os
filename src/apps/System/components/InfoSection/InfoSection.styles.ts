import { tokens } from '@/styles/tokens';

export const infoSectionStyles = {
  root: 'overflow-hidden rounded-xl bg-white/[.05] shadow-[inset_0_0_0_1px_rgba(255,255,255,.05)]',
  header: 'flex min-h-[64px] items-center gap-4 px-5 py-3',
  headerIcon: 'size-6 shrink-0 opacity-90',
  title: 'min-w-0 flex-1 truncate text-[15px]',
  toggle: `${tokens.iconButton} size-9 shrink-0`,
  toggleIcon: 'size-4 transition-transform duration-200',
  toggleIconClosed: 'rotate-180',

  body: 'border-t border-white/[.06] px-5 py-4 @[560px]:pl-[76px]',
  rows: 'grid gap-x-8 gap-y-2.5 text-[14px] @[560px]:grid-cols-[minmax(160px,220px)_minmax(0,1fr)]',
  rowLabel: 'text-ink-soft',
  rowValue: 'select-text text-ink-dim [overflow-wrap:anywhere] mb-1.5 @[560px]:mb-0',
  rowLink: 'text-accent hover:underline',
  placeholder: 'text-amber-300/90',

  paragraphs: 'flex max-w-[72ch] flex-col gap-4 [&:not(:first-child)]:mt-6',
  paragraphHeading: 'text-[14px] font-medium',
  paragraphText: 'mt-1 select-text text-[13.5px] leading-relaxed text-ink-dim',

  links: 'flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[.06] px-5 py-4',
  linksLabel: 'text-[14px] font-semibold',
  link: `rounded text-[14px] text-accent hover:underline ${tokens.focusRing}`,
} as const;
