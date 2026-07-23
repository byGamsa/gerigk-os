import { useNow } from '@/hooks/useNow';
import { useT } from '@/hooks/useT';
import { formatLongDate, formatTime } from '@/lib/format';
import { desktopClockStyles as s } from './DesktopClock.styles';

export function DesktopClock() {
  const now = useNow();
  const { lang } = useT();

  return (
    <div className={s.root} aria-live="off">
      <time className={s.time} dateTime={now.toISOString()}>
        {formatTime(now, lang, { period: false })}
      </time>
      <div className={s.date}>{formatLongDate(now, lang)}</div>
    </div>
  );
}
