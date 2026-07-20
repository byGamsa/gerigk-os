import { useCallback } from 'react';
import { cn } from '@/lib/cn';
import { taskbarRegistry } from '@/lib/domRegistry';
import { Icon } from '../Icon/Icon';
import { taskbarStyles as s } from './Taskbar.styles';
import type { TaskbarButtonProps } from './Taskbar.types';

export function TaskbarButton({ item, label, onActivate, onContextMenu }: TaskbarButtonProps) {
  const { app, phase, running, active } = item;
  const register = useCallback(
    (el: HTMLButtonElement | null) => {
      if (phase !== 'exit') taskbarRegistry.set(app.id, el);
    },
    [app.id, phase],
  );

  return (
    <button
      ref={register}
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(s.button, active && s.buttonActive, phase !== 'present' && s.buttonHidden)}
      onClick={(e) => onActivate(app.id, e.currentTarget)}
      onContextMenu={(e) => onContextMenu(app.id, e)}
    >
      <Icon name={app.icon} className={s.icon} />
      <span className={cn(s.indicator, active ? s.indicatorActive : running ? s.indicatorRunning : s.indicatorIdle)} />
    </button>
  );
}
