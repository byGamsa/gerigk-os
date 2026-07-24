import { locales } from '@/i18n';
import type { Lang } from '@/types';

const cache = new Map<string, Intl.DateTimeFormat>();

function dtf(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = locale + JSON.stringify(options);
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
}

interface TimeOptions {
  seconds?: boolean;
  // Show AM/PM (only relevant for 12h languages)
  period?: boolean;
}

export function formatTime(date: Date, lang: Lang, { seconds = false, period = true }: TimeOptions = {}): string {
  const l = locales[lang];
  const parts = dtf(l.time, {
    hour: l.hour12 ? 'numeric' : '2-digit',
    minute: '2-digit',
    ...(seconds ? { second: '2-digit' } : {}),
    hour12: l.hour12,
  }).formatToParts(date);
  return parts
    .filter((p) => period || p.type !== 'dayPeriod')
    .map((p) => p.value)
    .join('')
    .trim();
}

// e.g. "Tuesday, May 26, 2026"
export const formatLongDate = (date: Date, lang: Lang) =>
  dtf(locales[lang].date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date);

// e.g. "Tuesday, May 26"
export const formatDayHeading = (date: Date, lang: Lang) =>
  dtf(locales[lang].date, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);

// "26.05.2026" or "5/26/2026"
export const formatShortDate = (date: Date, lang: Lang) =>
  dtf(
    locales[lang].time,
    lang === 'de' ? { day: '2-digit', month: '2-digit', year: 'numeric' } : { month: 'numeric', day: 'numeric', year: 'numeric' },
  ).format(date);

export const formatWeekdayShort = (date: Date, lang: Lang) => dtf(locales[lang].time, { weekday: 'short' }).format(date);

export const formatMonthYear = (date: Date, lang: Lang) =>
  dtf(locales[lang].date, { month: 'long', year: 'numeric' }).format(date);

export const formatDateTime = (date: Date, lang: Lang) =>
  dtf(locales[lang].date, { dateStyle: 'short', timeStyle: 'short' }).format(date);

// Two-letter weekdays, starting at the language's week start
export function weekdayLabels(lang: Lang): string[] {
  const { weekStart } = locales[lang];
  // Jan 7, 2024 was a Sunday
  return Array.from({ length: 7 }, (_, i) =>
    dtf(locales[lang].date, { weekday: 'short' })
      .format(new Date(2024, 0, 7 + weekStart + i))
      .replace('.', '')
      .slice(0, 2),
  );
}

export function formatFileSize(bytes: number): string {
  return `${Math.max(1, Math.ceil(bytes / 1024))} KB`;
}
