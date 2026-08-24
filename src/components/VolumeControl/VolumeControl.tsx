import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { volumeControlStyles as s } from './VolumeControl.styles';
import type { VolumeControlProps } from './VolumeControl.types';
import { useVolumeControl } from './useVolumeControl';

// Mute button + volume slider, bound to the OS volume
export function VolumeControl({ size = 'md', showValue = false, className }: VolumeControlProps) {
  const v = useVolumeControl();

  return (
    <div className={cn(s.root, className)}>
      <button
        type="button"
        className={cn(s.button, s.buttonSize[size])}
        onClick={v.toggleMute}
        aria-pressed={v.muted}
        aria-label={v.muteLabel}
        title={v.muteLabel}
      >
        <Icon name={v.icon} className={s.icon[size]} />
      </button>
      <div className={s.track}>
        <div className={s.fill} style={{ width: `${v.value}%` }} />
        <div className={s.knob} style={{ left: `${v.value}%` }} />
        <input type="range" min={0} max={100} step={1} value={v.value} onChange={v.onChange} aria-label={v.label} className={s.input} />
      </div>
      {showValue && <span className={s.value}>{v.value}</span>}
    </div>
  );
}
