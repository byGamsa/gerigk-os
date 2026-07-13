import type { GridDims } from '@/lib/grid';
import type { AnyAppDefinition, GridCell } from '@/types';

export interface DesktopIconProps {
  app: AnyAppDefinition;
  cell: GridCell;
  dims: GridDims;
  // Occupied cells of all other icons
  occupied: ReadonlySet<string>;
  selected: boolean;
  onSelect: (appId: string, additive: boolean) => void;
}
