import { useState, type FormEvent } from 'react';
import { browserConfig } from '@/config/browser.config';
import { useT } from '@/hooks/useT';
import type { NewTabPageProps } from './NewTabPage.types';

export function useNewTabPage({ onSearch }: NewTabPageProps) {
  const { t } = useT();
  const [query, setQuery] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
    setQuery('');
  };

  return { t, query, setQuery, submit, bookmarks: browserConfig.bookmarks };
}
