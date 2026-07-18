import type { CalendarDay } from './Calendar.types';

export const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export const addMonths = (d: Date, delta: number) => new Date(d.getFullYear(), d.getMonth() + delta, 1);

// 6 weeks × 7 days, starting at the language's week start
export function buildMonthGrid(month: Date, weekStart: 0 | 1, today: Date, selected: Date): CalendarDay[] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStart + 7) % 7;
  const todayKey = toDateKey(today);
  const selectedKey = toDateKey(selected);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(first.getFullYear(), first.getMonth(), 1 - offset + i);
    const key = toDateKey(date);
    return {
      date,
      key,
      day: date.getDate(),
      inMonth: date.getMonth() === first.getMonth(),
      isToday: key === todayKey,
      isSelected: key === selectedKey,
    };
  });
}
