import { tokens } from '@/styles/tokens';

const columns = 'grid grid-cols-[28px_minmax(0,1fr)_48px] @[640px]:grid-cols-[28px_minmax(0,1fr)_56px]';

export const spotifyStyles = {
  root: 'flex min-h-0 flex-1 flex-col',
  scroll: `relative min-h-0 flex-1 ${tokens.scroll}`,

  // Color glow from the cover, fading softly into the track list (no hard edge)
  ambient: 'pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent)]',
  ambientImage: 'absolute inset-0 scale-125 bg-cover bg-center opacity-40 blur-3xl saturate-150',
  hero: 'relative flex flex-col gap-5 px-6 pb-4 pt-4 @[520px]:flex-row @[520px]:items-end',
  // Minimum height of 200 px per YouTube API guidelines
  video: 'relative aspect-video w-full max-w-[356px] shrink-0 overflow-hidden rounded-xl bg-black shadow-[0_18px_40px_rgba(0,0,0,.45)] @[520px]:w-[356px]',
  videoPoster: 'absolute inset-0 size-full object-cover opacity-60',
  // YouTube player (must be visible per YouTube guidelines) – filled by services/music/player.ts
  videoHost: 'absolute inset-0 [&_iframe]:size-full',
  heroText: 'relative min-w-0',
  label: 'text-xs font-semibold text-ink-soft',
  name: 'mt-1 truncate text-[clamp(22px,4cqw,38px)] font-bold leading-tight tracking-tight',
  meta: 'mt-2 text-[13px] text-ink-dim',
  actions: 'relative mt-4 flex items-center gap-3',
  bigPlay: `grid size-12 place-items-center rounded-full bg-spotify text-black shadow-[0_8px_24px_rgba(30,215,96,.35)] transition-transform duration-150 ease-spring hover:scale-105 active:scale-95 disabled:opacity-50 ${tokens.focusRing}`,
  bigPlayIcon: 'size-6',
  iconAction: `${tokens.iconButton} size-10 rounded-full text-ink-soft hover:text-ink`,
  iconActionActive: 'text-spotify hover:text-spotify',
  iconActionIcon: 'size-[22px]',
  source: 'mt-3 text-[11.5px] text-ink-dim',

  list: 'relative px-3 pb-4 pt-2',
  head: `${columns} mx-3 mb-2 items-center gap-3 border-b border-white/[.06] pb-2 text-[11px] font-medium uppercase tracking-[.08em] text-ink-faint`,
  headIndex: 'text-center',
  headDuration: 'flex justify-end',
  headIcon: 'size-3.5',
  row: `${columns} group w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left ${tokens.hover} ${tokens.focusRing}`,
  rowCurrent: 'bg-white/[.07]',
  index: 'grid place-items-center text-[13px] text-ink-dim tabular',
  indexNumber: 'group-hover:hidden',
  indexPlay: 'hidden size-3.5 group-hover:block',
  trackInfo: 'flex min-w-0 items-center gap-3',
  trackCover: 'size-10 shrink-0 rounded-md bg-white/10 object-cover',
  trackText: 'min-w-0',
  trackTitle: 'truncate text-[13.5px]',
  trackTitleCurrent: 'text-spotify',
  trackArtist: 'flex min-w-0 items-center gap-1.5 text-xs text-ink-dim',
  explicit: 'shrink-0 rounded-[3px] bg-white/60 px-1 text-[9px] font-bold leading-[14px] text-black',
  duration: 'text-right text-[13px] text-ink-dim tabular',

  footer: 'relative grid shrink-0 grid-cols-1 items-center gap-2 border-t border-surface-line bg-black/25 px-4 py-3 @[720px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] @[720px]:gap-5',
  nowPlaying: 'hidden min-w-0 items-center gap-3 @[720px]:flex',
  nowCover: 'size-12 shrink-0 rounded-md bg-white/10 object-cover',
  nowTitle: 'truncate text-[13.5px] font-medium',
  nowArtist: 'truncate text-xs text-ink-dim',
  controls: 'flex min-w-0 flex-col gap-1.5',
  volume: 'w-full max-w-[200px] justify-self-center @[720px]:justify-self-end',
} as const;
