import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/cn';
import { useOsStore } from '@/store/os.store';
import { snapPreviewStyles as s } from './Window.styles';
import { Window } from './Window';
import { useSnapPreview } from './useSnapPreview';

// Renders all open windows and the snap preview
export function WindowLayer() {
  const ids = useOsStore(useShallow((st) => Object.keys(st.windows)));
  const preview = useSnapPreview();

  return (
    <>
      <div
        aria-hidden
        className={cn(s.root, preview.moving ? s.move : s.fade, preview.visible ? s.visible : s.hidden)}
        style={{ left: preview.rect.x, top: preview.rect.y, width: preview.rect.width, height: preview.rect.height }}
      />
      <div className="pointer-events-none absolute inset-0 z-windows">
        {ids.map((id) => (
          <Window key={id} id={id} />
        ))}
      </div>
    </>
  );
}
