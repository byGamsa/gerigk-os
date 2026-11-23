import { tokens } from '@/styles/tokens';

export const aboutStyles = {
  root: `flex-1 select-text px-6 pb-10 pt-6 @[560px]:px-8 @[560px]:pb-12 @[560px]:pt-7 ${tokens.scroll}`,

  hero: 'flex items-center gap-5',
  photo:
    'size-[88px] shrink-0 rounded-full object-cover ring-2 ring-white/25 shadow-[0_12px_32px_rgba(0,0,0,.35)] @[560px]:size-[112px]',
  avatar: 'grid size-[72px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffbd73] to-[#ff5f8a] text-[26px] font-semibold shadow-[0_10px_30px_rgba(255,95,138,.35)] @[560px]:size-[84px] @[560px]:text-3xl',
  name: 'text-[24px] font-semibold leading-tight @[560px]:text-[26px]',
  role: 'mt-1 text-ink-soft',
  location: 'mt-0.5 text-[12.5px] text-ink-dim',
  intro: 'mt-6 max-w-[68ch] leading-relaxed text-ink-soft',
  links: 'mt-5 flex flex-wrap gap-2',
  link: tokens.pill,

  heading: 'mb-3 mt-8 text-xs font-semibold uppercase tracking-[.08em] text-ink-dim',

  highlights: 'grid gap-2.5 @[640px]:grid-cols-3',
  highlight: 'flex flex-col items-start rounded-xl bg-white/[.07] p-3.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]',
  highlightTitle: 'font-semibold',
  highlightMeta: 'mt-0.5 text-[11.5px] font-medium text-accent',
  highlightText: 'mt-2 text-[12.5px] leading-relaxed text-ink-dim',
  highlightLink: `mt-2.5 inline-flex items-center gap-1.5 rounded-md text-[12.5px] font-medium text-accent hover:underline ${tokens.focusRing}`,
  highlightLinkIcon: 'size-3.5',

  timeline: 'flex flex-col gap-4 border-l border-surface-line pl-4',
  entry: 'relative grid gap-0.5 @[560px]:grid-cols-[150px_minmax(0,1fr)] @[560px]:gap-4',
  dot: 'absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-accent shadow-glow',
  period: 'text-[12px] font-medium text-ink-dim tabular @[560px]:pt-px',
  entryTitle: 'font-medium',
  entryOrg: 'text-[12.5px] text-ink-soft',
  entryText: 'mt-1 text-[12.5px] leading-relaxed text-ink-dim',

  skills: 'grid gap-3 @[560px]:grid-cols-[150px_minmax(0,1fr)] @[560px]:gap-x-4',
  skillLabel: 'text-[12px] font-medium text-ink-dim @[560px]:pt-1.5',
  chips: 'flex flex-wrap gap-2',
  chip: 'rounded-full bg-white/10 px-3 py-1.5 text-[12.5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]',
} as const;
