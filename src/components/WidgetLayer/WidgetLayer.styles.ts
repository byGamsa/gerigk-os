export const widgetLayerStyles = {
  root: 'pointer-events-none absolute bottom-desk-bottom left-3 z-widgets flex flex-col-reverse gap-3',
  item: 'pointer-events-auto origin-bottom-left transition-[opacity,transform] duration-500 ease-out',
  hidden: 'pointer-events-none translate-y-6 scale-90 opacity-0 duration-300',
} as const;
