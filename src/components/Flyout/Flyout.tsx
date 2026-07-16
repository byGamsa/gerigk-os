import { cn } from '@/lib/cn';
import { flyoutStyles as s } from './Flyout.styles';
import type { FlyoutProps } from './Flyout.types';
import { useFlyoutPosition } from './useFlyoutPosition';

// Glass panel that appears at a trigger (bar button or mouse position)
export function Flyout({ id, children, className, align = 'anchor', ariaLabel }: FlyoutProps) {
  const { ref, open, style, side } = useFlyoutPosition(id, align);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={ariaLabel}
      aria-hidden={!open}
      inert={!open}
      data-flyout-root={id}
      style={style}
      className={cn(
        s.root,
        id === 'menu' && 'z-menu',
        open ? s.open : [s.closed, side === 'top' ? s.closedFromTop : s.closedFromBottom],
        className,
      )}
    >
      {children}
    </div>
  );
}
