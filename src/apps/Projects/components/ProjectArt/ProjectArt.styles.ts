export const projectArtStyles = {
  root: 'relative grid shrink-0 place-items-center overflow-hidden',
  icon: 'rounded-[22%] shadow-[0_6px_18px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,255,255,.18)]',
  // Banner radius comes from the parent (`rounded-[inherit]` keeps the edge aligned)
  banner: 'rounded-[inherit]',
  image: 'absolute inset-0 size-full object-cover',
  // Glass edge on top of the image
  edge: 'pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,.16)]',
  // Logo centered on the gradient (banner without cover)
  logo: 'relative size-[42%] max-h-28 max-w-28 rounded-full object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,.45)]',
  fallbackIcon: 'relative size-[62%] drop-shadow-[0_4px_12px_rgba(0,0,0,.3)]',
} as const;
