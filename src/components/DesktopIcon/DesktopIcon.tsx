import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { desktopIconStyles as s } from './DesktopIcon.styles';
import type { DesktopIconProps } from './DesktopIcon.types';
import { useDesktopIcon } from './useDesktopIcon';

export function DesktopIcon(props: DesktopIconProps) {
  const { label, position, dragging, handlers } = useDesktopIcon(props);

  return (
    <button
      type="button"
      data-desktop-icon={props.app.id}
      aria-selected={props.selected}
      style={{ left: position.x, top: position.y }}
      className={cn(s.root, props.selected && s.selected, dragging && s.dragging)}
      {...handlers}
    >
      <Icon name={props.app.icon} className={cn(s.image, dragging && s.imageDragging)} />
      <span className={s.label}>{label}</span>
    </button>
  );
}
