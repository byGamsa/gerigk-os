import { cn } from '@/lib/cn';
import { equalizerStyles as s } from './Equalizer.styles';

// Animated bars for the playing song
export function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className={s.root} aria-hidden>
      {s.delays.map((delay) => (
        <span key={delay} className={cn(s.bar, delay, playing ? s.playing : s.paused)} />
      ))}
    </span>
  );
}
