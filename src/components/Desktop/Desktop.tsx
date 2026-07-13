import { DesktopIcon } from '../DesktopIcon/DesktopIcon';
import { WindowLayer } from '../Window/WindowLayer';
import { desktopStyles as s } from './Desktop.styles';
import { useDesktop } from './useDesktop';

export function Desktop() {
  const d = useDesktop();

  return (
    <main className={s.root}>
      <div
        ref={d.layerRef}
        className={s.iconLayer}
        onPointerDown={d.onBackgroundPointerDown}
        onContextMenu={d.onBackgroundContextMenu}
      >
        {d.apps.map((app) => {
          const cell = d.cells[app.id];
          if (!cell) return null;
          return (
            <DesktopIcon
              key={app.id}
              app={app}
              cell={cell}
              dims={d.dims}
              occupied={d.occupiedFor(app.id)}
              selected={d.selected.has(app.id)}
              onSelect={d.selectIcon}
            />
          );
        })}
      </div>

      <WindowLayer />
    </main>
  );
}
