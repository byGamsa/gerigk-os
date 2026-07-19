// Layout constants – single source of truth for tailwind.config.ts and window/desktop geometry
export const layout = {
  // Distance of the top bar from the screen edge
  barGap: 6,
  topbarHeight: 34,
  taskbarHeight: 56,
  // Distance of the taskbar from the bottom edge
  taskbarOffset: 12,
  // Gap between maximized windows and bars/edges
  windowGap: 8,
  grid: {
    cellWidth: 96,
    cellHeight: 108,
    padding: 12,
    iconWidth: 88,
  },
  window: {
    defaultWidth: 760,
    defaultHeight: 500,
    minWidth: 320,
    minHeight: 200,
    cascadeStep: 28,
  },
  mobileBreakpoint: 720,
} as const;

export const deskInsets = {
  top: layout.barGap * 2 + layout.topbarHeight,
  bottom: layout.taskbarHeight + layout.taskbarOffset * 2,
} as const;
