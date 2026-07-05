import { useMemo } from 'react';
import { locales, resolveLocalized, translate } from '@/i18n';
import { useOsStore } from '@/store/os.store';
import type { LocalizedValue, TranslateVars, TranslationKey } from '@/types';

// Translation hook: `t` for keys, `tr` for localized values
export function useT() {
  const lang = useOsStore((s) => s.lang);
  return useMemo(
    () => ({
      lang,
      locale: locales[lang],
      t: (key: TranslationKey, vars?: TranslateVars) => translate(lang, key, vars),
      tr: (value: LocalizedValue) => resolveLocalized(lang, value),
    }),
    [lang],
  );
}
