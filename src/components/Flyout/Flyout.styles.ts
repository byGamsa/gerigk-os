export const flyoutStyles = {
  root: 'glass-strong fixed z-flyout rounded-panel text-ink transition-[opacity,transform,visibility]',
  open: 'visible opacity-100 scale-100 translate-y-0 duration-300 ease-out',
  closed: 'invisible pointer-events-none opacity-0 scale-[.97] duration-150 ease-in',
  closedFromBottom: 'translate-y-3',
  closedFromTop: '-translate-y-2',
} as const;
