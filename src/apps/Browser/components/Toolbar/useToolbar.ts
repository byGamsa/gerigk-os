import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useT } from '@/hooks/useT';
import { displayUrl, isNewTab } from '../../browser.utils';
import type { ToolbarProps } from './Toolbar.types';

// Address bar: shows the current URL unless the user is typing
export function useToolbar({ url, onSubmit }: ToolbarProps) {
  const { t } = useT();
  const [draft, setDraft] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // New tab → allow typing into the address bar right away
  useEffect(() => {
    setDraft(null);
    if (isNewTab(url) && window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus();
  }, [url]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (draft !== null) onSubmit(draft);
    setDraft(null);
    inputRef.current?.blur();
  };

  return {
    t,
    inputRef,
    value: draft ?? displayUrl(url),
    secure: url.startsWith('https://'),
    showExternal: !isNewTab(url),
    onChange: (value: string) => setDraft(value),
    onFocus: () => inputRef.current?.select(),
    onBlur: () => setDraft(null),
    submit,
  };
}
