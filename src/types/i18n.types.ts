import type { de } from '@/i18n/de';

export type Lang = 'de' | 'en';

// One value per language
export type Localized<T = string> = Record<Lang, T>;

// Either a fixed string or one value per language
export type LocalizedValue = string | Localized;

export type TranslationKey = keyof typeof de;

export type Dictionary = Record<TranslationKey, string>;

export type TranslateVars = Record<string, string | number>;

export interface LocaleSettings {
  // Locale for dates
  date: string;
  // Locale for times and short dates
  time: string;
  hour12: boolean;
  // 0 = Sunday, 1 = Monday
  weekStart: 0 | 1;
  // Short label for the language button in the taskbar
  short: string;
}
