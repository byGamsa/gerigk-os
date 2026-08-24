import { cn } from '@/lib/cn';
import { progressBarStyles as s } from './ProgressBar.styles';
import type { ProgressBarProps } from './ProgressBar.types';
import { useProgressBar } from './useProgressBar';

export function ProgressBar(props: ProgressBarProps) {
  const bar = useProgressBar(props);

  return (
    <div className={cn(s.root, props.className)}>
      <span className={s.time}>{bar.elapsed}</span>
      <div className={s.track}>
        <div className={cn(s.fill, !bar.dragging && s.fillAnimated)} style={{ width: `${bar.percent}%` }} />
        <div className={s.knob} style={{ left: `${bar.percent}%` }} />
        <input
          type="range"
          min={0}
          max={Math.max(1, props.duration)}
          step={250}
          value={bar.value}
          disabled={props.disabled}
          aria-label={props.label}
          className={s.input}
          onChange={bar.onChange}
          onPointerUp={bar.commit}
          onKeyUp={bar.commit}
        />
      </div>
      <span className={cn(s.time, s.timeEnd)}>{bar.total}</span>
    </div>
  );
}
