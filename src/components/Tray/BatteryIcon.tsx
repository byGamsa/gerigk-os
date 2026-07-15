import { cn } from '@/lib/cn';
import type { IconSvgProps } from '../Icon/Icon.types';

interface BatteryIconProps extends IconSvgProps {
  level: number;
  charging: boolean;
}

// Battery icon with the real charge level
export function BatteryIcon({ level, charging, className, ...props }: BatteryIconProps) {
  const fill = charging ? 'fill-success' : level <= 0.2 ? 'fill-danger' : 'fill-current';
  return (
    <svg viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={cn('w-[22px]', className)} {...props}>
      <rect x="2" y="6.5" width="21" height="11" rx="3.2" />
      <path d="M25.5 10.2v3.6" strokeLinecap="round" />
      <rect x="4" y="8.5" width={Math.max(1.5, 17 * level)} height="7" rx="1.6" stroke="none" className={fill} />
    </svg>
  );
}
