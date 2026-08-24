export interface ProgressBarProps {
  // Milliseconds
  position: number;
  // Milliseconds
  duration: number;
  onSeek: (ms: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}
