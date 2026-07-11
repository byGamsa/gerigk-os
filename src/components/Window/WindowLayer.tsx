import { useShallow } from 'zustand/react/shallow';
import { useOsStore } from '@/store/os.store';
import { Window } from './Window';

// Renders all open windows
export function WindowLayer() {
  const ids = useOsStore(useShallow((st) => Object.keys(st.windows)));

  return (
    <div className="pointer-events-none absolute inset-0 z-windows">
      {ids.map((id) => (
        <Window key={id} id={id} />
      ))}
    </div>
  );
}
