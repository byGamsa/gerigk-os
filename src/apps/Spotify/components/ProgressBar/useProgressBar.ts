import { useCallback, useState, type ChangeEvent } from 'react';
import { formatDuration } from '@/services/music/playlist';
import type { ProgressBarProps } from './ProgressBar.types';

// Show locally while dragging, seek only on release
export function useProgressBar({ position, duration, onSeek }: ProgressBarProps) {
  const [dragValue, setDragValue] = useState<number | null>(null);
  const value = dragValue ?? position;
  const percent = duration > 0 ? Math.min(100, (value / duration) * 100) : 0;

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setDragValue(Number(e.target.value)), []);

  const commit = useCallback(() => {
    if (dragValue !== null) onSeek(dragValue);
    setDragValue(null);
  }, [dragValue, onSeek]);

  return {
    value,
    percent,
    elapsed: formatDuration(value),
    total: formatDuration(duration),
    dragging: dragValue !== null,
    onChange,
    commit,
  };
}
