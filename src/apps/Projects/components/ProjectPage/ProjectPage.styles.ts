import { tokens } from '@/styles/tokens';

export const projectPageStyles = {
  root: 'flex animate-fade-up flex-col gap-6 px-4 pb-10 @[560px]:px-6',

  header: 'flex items-start gap-4 @[560px]:gap-5',
  icon: 'size-[84px] @[560px]:size-[112px]',
  headText: 'flex min-w-0 flex-1 flex-col self-stretch',
  title: 'text-[21px] font-semibold leading-tight @[560px]:text-[26px]',
  tagline: 'mt-0.5 text-ink-soft',
  owner: 'mt-0.5 text-[12.5px] text-ink-dim',
  actions: 'mt-auto flex flex-wrap items-center gap-2 pt-3',
  primary: `inline-flex h-8 items-center gap-1.5 rounded-full bg-accent px-4 text-[13px] font-semibold text-white shadow-glow transition-colors hover:bg-accent-strong ${tokens.focusRing}`,
  primaryIcon: 'size-3.5',
  privateBadge: 'inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-[12.5px] text-ink-dim',
  privateIcon: 'size-3.5',

  // App-store style info strip
  info: 'grid grid-cols-2 gap-y-3 rounded-xl bg-white/[.05] py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)] @[560px]:grid-cols-4',
  infoCell: 'flex min-w-0 flex-col items-center gap-0.5 border-surface-line px-2 text-center @[560px]:border-l @[560px]:first:border-l-0',
  infoLabel: 'text-[10.5px] font-semibold uppercase tracking-[.08em] text-ink-faint',
  infoValue: 'max-w-full truncate text-[13px] font-medium',

  gallery: '-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] @[560px]:-mx-6 @[560px]:scroll-px-6 @[560px]:px-6',
  shot: `group relative h-40 shrink-0 snap-start overflow-hidden rounded-xl bg-black/30 shadow-glass @[560px]:h-56 ${tokens.focusRing}`,
  shotImage: 'h-full w-auto max-w-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]',
  shotEdge: 'pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]',

  heading: 'mb-2 text-[15px] font-semibold',
  text: 'max-w-[70ch] select-text leading-relaxed text-ink-soft',
  bullets: 'flex max-w-[70ch] select-text flex-col gap-1.5 text-ink-soft',
  bullet: 'relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[.6em] before:size-1.5 before:rounded-full before:bg-accent',

  tags: 'flex flex-wrap gap-1.5',
  tag: 'rounded-full bg-white/10 px-3 py-1 text-[12px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]',

  links: 'flex flex-col overflow-hidden rounded-xl bg-white/[.05] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]',
  link: `flex items-center gap-3 border-b border-surface-line px-3.5 py-2.5 text-left last:border-b-0 ${tokens.hover} ${tokens.focusRing}`,
  linkIcon: 'size-[18px] shrink-0 text-accent',
  linkText: 'min-w-0 flex-1',
  linkLabel: 'block truncate text-[13px] font-medium',
  linkHost: 'block truncate text-[11.5px] text-ink-dim',
  linkArrow: 'size-3.5 shrink-0 text-ink-faint',
} as const;
