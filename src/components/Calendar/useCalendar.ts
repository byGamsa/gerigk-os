import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNow } from '@/hooks/useNow';
import { useT } from '@/hooks/useT';
import { formatDayHeading, formatLongDate, formatMonthYear, formatTime, weekdayLabels } from '@/lib/format';
import { useOsStore } from '@/store/os.store';
import type { MonthDirection } from './Calendar.types';
import { addMonths, buildMonthGrid, startOfMonth, toDateKey } from './calendar.utils';

export function useCalendar() {
  const now = useNow();
  const { t, lang, locale } = useT();
  const openedAt = useOsStore((s) => (s.flyout?.id === 'calendar' ? s.flyout.openedAt : null));
  const [month, setMonth] = useState(() => startOfMonth(now));
  const [selected, setSelected] = useState(() => now);
  const [direction, setDirection] = useState<MonthDirection>(0);

  // Jump to today on every open
  useEffect(() => {
    if (openedAt === null) return;
    const today = new Date();
    setMonth(startOfMonth(today));
    setSelected(today);
    setDirection(0);
  }, [openedAt]);

  const todayKey = toDateKey(now);
  const days = useMemo(
    () => buildMonthGrid(month, locale.weekStart, now, selected),
    // `now` only via the day key – don't recompute every second
    [month, locale.weekStart, todayKey, selected],
  );

  const shift = useCallback((delta: -1 | 1) => {
    setDirection(delta);
    setMonth((m) => addMonths(m, delta));
  }, []);

  const goToday = useCallback(() => {
    const today = new Date();
    setDirection(0);
    setMonth(startOfMonth(today));
    setSelected(today);
  }, []);

  return {
    t,
    heading: formatDayHeading(now, lang),
    time: formatTime(now, lang, { seconds: true }),
    monthLabel: formatMonthYear(month, lang),
    monthKey: toDateKey(month),
    weekdays: weekdayLabels(lang),
    days,
    direction,
    selectedLabel: formatLongDate(selected, lang),
    select: setSelected,
    prev: () => shift(-1),
    next: () => shift(1),
    goToday,
    dayLabel: (d: Date) => formatLongDate(d, lang),
  };
}
