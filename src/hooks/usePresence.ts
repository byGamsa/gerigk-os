import { useEffect, useState } from 'react';

export type PresencePhase = 'enter' | 'present' | 'exit';

export interface PresenceEntry<T> {
  key: string;
  item: T;
  phase: PresencePhase;
}

// Keeps removed entries in the DOM for their exit animation and flags new ones for the enter animation
export function usePresence<T>(items: readonly T[], getKey: (item: T) => string, exitMs = 300): PresenceEntry<T>[] {
  const [entries, setEntries] = useState<PresenceEntry<T>[]>(() =>
    items.map((item) => ({ key: getKey(item), item, phase: 'present' })),
  );
  const signature = items.map(getKey).join('|');

  useEffect(() => {
    setEntries((prev) => {
      const nextKeys = new Set(items.map(getKey));
      const prevByKey = new Map(prev.map((e) => [e.key, e]));
      const merged: PresenceEntry<T>[] = items.map((item) => {
        const key = getKey(item);
        const old = prevByKey.get(key);
        return { key, item, phase: old && old.phase !== 'exit' ? old.phase : 'enter' };
      });
      prev.forEach((entry, index) => {
        if (!nextKeys.has(entry.key)) merged.splice(Math.min(index, merged.length), 0, { ...entry, phase: 'exit' });
      });
      return merged;
    });
    // The signature is enough as a dependency
  }, [signature]);

  useEffect(() => {
    if (!entries.some((e) => e.phase === 'enter')) return;
    let cancelled = false;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!cancelled) setEntries((p) => p.map((e) => (e.phase === 'enter' ? { ...e, phase: 'present' } : e)));
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [entries]);

  useEffect(() => {
    if (!entries.some((e) => e.phase === 'exit')) return;
    const timer = window.setTimeout(() => setEntries((p) => p.filter((e) => e.phase !== 'exit')), exitMs);
    return () => window.clearTimeout(timer);
  }, [entries, exitMs]);

  return entries;
}
