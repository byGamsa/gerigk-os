export const widgetLayerStyles = {
  root: 'pointer-events-none absolute bottom-desk-bottom left-3 z-widgets flex flex-col-reverse gap-3',
  // Opacity sits on the widget itself: an ancestor with opacity < 1 would disable its backdrop blur
  item: 'pointer-events-auto origin-bottom-left transition-transform duration-500 ease-out [&>*]:transition-opacity [&>*]:duration-500 [&>*]:ease-out',
  hidden: 'pointer-events-none translate-y-6 scale-90 duration-300 [&>*]:opacity-0 [&>*]:duration-300',
} as const;
