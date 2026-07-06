import { useSyncExternalStore } from 'react';

// Shared, second-aligned clock – one timer for all components
let now = new Date();
let timer: number | undefined;
const listeners = new Set<() => void>();

function schedule() {
  timer = window.setTimeout(() => {
    now = new Date();
    listeners.forEach((l) => l());
    schedule();
  }, 1000 - new Date().getMilliseconds() + 5);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    now = new Date();
    schedule();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.clearTimeout(timer);
  };
}

export const useNow = (): Date => useSyncExternalStore(subscribe, () => now);
