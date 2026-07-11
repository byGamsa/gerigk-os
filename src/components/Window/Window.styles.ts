import type { ResizeDirection, WindowStatus } from '@/types';

export const windowStyles = {
  root: 'glass-window pointer-events-auto absolute flex flex-col overflow-hidden rounded-window text-ink',
  transition: 'transition-[transform,opacity,box-shadow] duration-[450ms] ease-out',
  geometry: 'transition-[left,top,width,height,transform,opacity,border-radius] duration-[380ms] ease-out',
  active: 'shadow-window',
  inactive: 'shadow-window-inactive',
  maximized: 'rounded-xl',
  status: {
    opening: 'scale-[.45] opacity-0',
    normal: 'scale-100 opacity-100',
    minimized: 'pointer-events-none scale-[.06] opacity-0 !ease-minimize',
    closing: 'pointer-events-none scale-[.94] opacity-0 !duration-200 !ease-in',
  } satisfies Record<WindowStatus, string>,

  titlebar: 'flex h-[42px] shrink-0 touch-none items-center justify-between pl-3.5',
  titlebarInactive: 'opacity-70',
  title: 'flex min-w-0 items-center gap-2.5 text-[13px] font-medium',
  titleIcon: 'size-[18px] shrink-0',
  titleText: 'truncate',
  controls: 'flex h-full shrink-0 gap-0.5 p-1.5',
  control: 'grid w-10 place-items-center rounded-lg transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
  controlClose: 'hover:!bg-danger active:!bg-danger/80',
  controlIcon: 'size-3.5',

  body: 'relative flex min-h-0 flex-1 flex-col @container',

  handle: 'absolute z-10',
} as const;

// Invisible handles on edges and corners
export const resizeHandleStyles: Record<ResizeDirection, string> = {
  n: 'top-0 left-3 right-3 h-1.5 cursor-ns-resize',
  s: 'bottom-0 left-3 right-3 h-1.5 cursor-ns-resize',
  e: 'right-0 top-3 bottom-3 w-1.5 cursor-ew-resize',
  w: 'left-0 top-3 bottom-3 w-1.5 cursor-ew-resize',
  ne: 'right-0 top-0 size-3 cursor-nesw-resize',
  nw: 'left-0 top-0 size-3 cursor-nwse-resize',
  se: 'right-0 bottom-0 size-3 cursor-nwse-resize',
  sw: 'left-0 bottom-0 size-3 cursor-nesw-resize',
};

export const snapPreviewStyles = {
  root: 'glass pointer-events-none fixed z-snap rounded-xl transition-all duration-300 ease-out',
  visible: 'opacity-100 scale-100',
  hidden: 'opacity-0 scale-[.96]',
} as const;
