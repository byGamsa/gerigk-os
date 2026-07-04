import type {
  Dictionary,
  Lang,
  LocaleSettings,
  Localized,
  LocalizedValue,
  TranslateVars,
  TranslationKey,
} from '@/types';
import { de } from './de';
import { en } from './en';

export const languages: readonly Lang[] = ['de', 'en'];

export const dictionaries: Record<Lang, Dictionary> = { de, en };

export const locales: Record<Lang, LocaleSettings> = {
  de: { date: 'de-DE', time: 'de-DE', hour12: false, weekStart: 1, short: 'DEU' },
  en: { date: 'en-GB', time: 'en-US', hour12: true, weekStart: 0, short: 'ENG' },
};

export function translate(lang: Lang, key: TranslationKey, vars?: TranslateVars): string {
  const text = dictionaries[lang][key] ?? dictionaries.de[key] ?? key;
  return vars ? text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? '')) : text;
}

export function resolveLocalized(lang: Lang, value: LocalizedValue): string {
  return typeof value === 'string' ? value : value[lang];
}

// Turns a key into a language-independent value (e.g. for toasts in the store)
export function localize(key: TranslationKey, vars?: TranslateVars): Localized {
  return { de: translate('de', key, vars), en: translate('en', key, vars) };
}

export function nextLang(lang: Lang): Lang {
  return languages[(languages.indexOf(lang) + 1) % languages.length] ?? 'de';
}
