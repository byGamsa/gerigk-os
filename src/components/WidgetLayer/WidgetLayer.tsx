import { cn } from '@/lib/cn';
import { widgetLayerStyles as s } from './WidgetLayer.styles';
import { useWidgetLayer } from './useWidgetLayer';

// Shows app widgets (e.g. the Spotify mini player) while their window is minimized
export function WidgetLayer() {
  const widgets = useWidgetLayer();

  return (
    <div className={s.root}>
      {widgets.map(({ key, item, phase, Widget }) =>
        Widget ? (
          <div key={key} className={cn(s.item, phase !== 'present' && s.hidden)}>
            <Widget windowId={item.windowId} />
          </div>
        ) : null,
      )}
    </div>
  );
}
