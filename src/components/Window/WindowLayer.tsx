import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/cn';
import { getDeskArea } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import { snapPreviewStyles as s } from './Window.styles';
import { Window } from './Window';

// Renders all open windows and the snap preview
export function WindowLayer() {
  const ids = useOsStore(useShallow((st) => Object.keys(st.windows)));
  const snapPreview = useOsStore((st) => st.snapPreview);
  const area = snapPreview ? getDeskArea() : null;

  return (
    <>
      <div
        aria-hidden
        className={cn(s.root, snapPreview ? s.visible : s.hidden)}
        style={area ? { left: area.x, top: area.y, width: area.width, height: area.height } : { inset: 40 }}
      />
      <div className="pointer-events-none absolute inset-0 z-windows">
        {ids.map((id) => (
          <Window key={id} id={id} />
        ))}
      </div>
    </>
  );
}
