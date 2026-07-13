export const desktopIconStyles = {
  root: 'absolute flex w-icon-w touch-none flex-col items-center gap-1.5 rounded-xl px-1 pb-1.5 pt-2 outline-none transition-[left,top,background-color] duration-300 ease-out hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-accent/70',
  selected: 'bg-surface-active shadow-[inset_0_0_0_1px_rgba(255,255,255,.35)] hover:bg-surface-active',
  dragging: 'z-selection !transition-none opacity-90',
  image: 'size-[54px] drop-shadow-[0_4px_10px_rgba(0,0,0,.3)] transition-transform duration-200 ease-spring',
  imageDragging: 'scale-110',
  label: 'text-shadow break-words text-center text-[12.5px] leading-tight',
} as const;
