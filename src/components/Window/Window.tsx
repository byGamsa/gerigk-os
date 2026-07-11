import type { ResizeDirection } from '@/types';
import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { resizeHandleStyles, windowStyles as s } from './Window.styles';
import type { WindowProps } from './Window.types';
import { useWindow } from './useWindow';

const RESIZE_DIRECTIONS = Object.keys(resizeHandleStyles) as ResizeDirection[];

export function Window({ id }: WindowProps) {
  const w = useWindow(id);
  if (!w.win || !w.app) return null;
  const { win, app } = w;
  const AppComponent = app.component;

  return (
    <section
      ref={w.ref}
      role="dialog"
      aria-label={w.title}
      style={w.style}
      onPointerDownCapture={w.focus}
      className={cn(
        s.root,
        win.animateGeometry ? s.geometry : s.transition,
        w.isActive ? s.active : s.inactive,
        win.maximized && s.maximized,
        s.status[win.status],
      )}
    >
      <header
        className={cn(s.titlebar, !w.isActive && s.titlebarInactive)}
        onPointerDown={w.onTitlebarPointerDown}
        onDoubleClick={w.onTitlebarDoubleClick}
        onContextMenu={w.onTitlebarContextMenu}
      >
        <div className={s.title}>
          <Icon name={app.icon} className={s.titleIcon} />
          <span className={s.titleText}>{w.title}</span>
        </div>
        <div className={s.controls} data-window-control>
          <button type="button" className={s.control} onClick={w.minimize} aria-label={w.t('win.minimize')} title={w.t('win.minimize')}>
            <Icon name="minimize" className={s.controlIcon} />
          </button>
          <button
            type="button"
            className={s.control}
            onClick={w.toggleMaximize}
            aria-label={w.t(win.maximized ? 'win.restore' : 'win.maximize')}
            title={w.t(win.maximized ? 'win.restore' : 'win.maximize')}
          >
            <Icon name={win.maximized ? 'restore' : 'maximize'} className={s.controlIcon} />
          </button>
          <button type="button" className={cn(s.control, s.controlClose)} onClick={w.close} aria-label={w.t('win.close')} title={w.t('win.close')}>
            <Icon name="close" className={s.controlIcon} />
          </button>
        </div>
      </header>

      <div className={s.body}>
        <AppComponent windowId={win.id} args={win.args} />
      </div>

      {!win.maximized &&
        RESIZE_DIRECTIONS.map((dir) => (
          <div
            key={dir}
            className={cn(s.handle, resizeHandleStyles[dir])}
            onPointerDown={(e) => w.onResizePointerDown(e, dir)}
          />
        ))}
    </section>
  );
}
