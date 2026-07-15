import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { Tray } from '../Tray/Tray';
import { taskbarStyles as s } from './Taskbar.styles';
import { TaskbarButton } from './TaskbarButton';
import { useTaskbar } from './useTaskbar';

export function Taskbar() {
  const { items, t, tr, onActivate, toggleStart } = useTaskbar();

  return (
    <div className={s.root}>
      <nav className={cn(s.bar, s.enter)} data-bar aria-label="Taskbar">
        <button
          type="button"
          data-flyout-trigger="start"
          title={t('os.start')}
          aria-label={t('os.start')}
          className={s.button}
          onClick={(e) => toggleStart(e.currentTarget)}
        >
          <Icon name="logo" className={s.icon} />
        </button>

        <div className={s.apps}>
          {items.map((item) => (
            <TaskbarButton
              key={item.app.id}
              item={item}
              label={tr(item.app.title)}
              onActivate={onActivate}
            />
          ))}
        </div>

        <div className={s.separator} />
        <Tray />
      </nav>
    </div>
  );
}
