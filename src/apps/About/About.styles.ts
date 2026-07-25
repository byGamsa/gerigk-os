import { tokens } from '@/styles/tokens';

export const aboutStyles = {
  root: `flex-1 select-text px-8 py-7 ${tokens.scroll}`,
  hero: 'flex items-center gap-5',
  avatar: 'grid size-[84px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ffbd73] to-[#ff5f8a] text-3xl font-semibold shadow-[0_10px_30px_rgba(255,95,138,.35)]',
  name: 'text-[26px] font-semibold leading-tight',
  role: 'mt-1 text-ink-dim',
  intro: 'mt-6 max-w-[60ch] leading-relaxed text-ink-soft',
  heading: 'mb-2.5 mt-7 text-xs font-semibold uppercase tracking-[.08em] text-ink-dim',
  chips: 'flex flex-wrap gap-2',
  chip: 'rounded-full bg-white/10 px-3 py-1.5 text-[12.5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]',
  links: 'flex flex-wrap gap-2',
  link: tokens.pill,
  note: 'mt-8 rounded-xl bg-accent/15 px-3.5 py-3 text-[12.5px] text-ink-soft',
} as const;
