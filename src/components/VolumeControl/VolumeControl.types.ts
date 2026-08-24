export type VolumeControlSize = 'sm' | 'md';

export interface VolumeControlProps {
  size?: VolumeControlSize;
  // Show the percentage next to the slider
  showValue?: boolean;
  className?: string;
}
