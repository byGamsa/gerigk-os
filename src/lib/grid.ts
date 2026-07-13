import { layout } from "@/config/layout";
import type { GridCell, Point } from "@/types";
import { clamp } from "./math";

const { cellWidth, cellHeight, padding, iconWidth } = layout.grid;

export interface GridDims {
  cols: number;
  rows: number;
}

export interface IconLayoutEntry {
  id: string;
  // Position saved by the user
  saved?: GridCell;
  // Start position from the app definition
  preferred?: GridCell;
}

export const cellKey = (cell: GridCell) => `${cell.col}:${cell.row}`;

export function measureGrid(width: number, height: number): GridDims {
  return {
    cols: Math.max(1, Math.floor((width - padding * 2) / cellWidth)),
    rows: Math.max(1, Math.floor((height - padding * 2) / cellHeight)),
  };
}

// Negative values count from the end; result is always inside the grid
export function normalizeCell(cell: GridCell, dims: GridDims): GridCell {
  const col = cell.col < 0 ? dims.cols + cell.col : cell.col;
  const row = cell.row < 0 ? dims.rows + cell.row : cell.row;
  return { col: clamp(col, 0, dims.cols - 1), row: clamp(row, 0, dims.rows - 1) };
}

export function cellToPoint(cell: GridCell): Point {
  return {
    x: padding + cell.col * cellWidth + (cellWidth - iconWidth) / 2,
    y: padding + cell.row * cellHeight,
  };
}

export function pointToCell(point: Point, dims: GridDims): GridCell {
  return normalizeCell(
    {
      col: Math.round((point.x - padding - (cellWidth - iconWidth) / 2) / cellWidth),
      row: Math.round((point.y - padding) / cellHeight),
    },
    dims,
  );
}

// Nearest free cell to the target cell
export function findFreeCell(target: GridCell, occupied: ReadonlySet<string>, dims: GridDims): GridCell {
  if (!occupied.has(cellKey(target))) return target;
  let best: GridCell | null = null;
  let bestDist = Infinity;
  for (let col = 0; col < dims.cols; col++) {
    for (let row = 0; row < dims.rows; row++) {
      const cell = { col, row };
      if (occupied.has(cellKey(cell))) continue;
      const dist = (col - target.col) ** 2 + (row - target.row) ** 2;
      if (dist < bestDist) {
        best = cell;
        bestDist = dist;
      }
    }
  }
  return best ?? target;
}

// First free cell, column by column from the top left (like Windows)
function firstFreeCell(occupied: ReadonlySet<string>, dims: GridDims): GridCell {
  for (let col = 0; col < dims.cols; col++) {
    for (let row = 0; row < dims.rows; row++) {
      if (!occupied.has(cellKey({ col, row }))) return { col, row };
    }
  }
  return { col: 0, row: 0 };
}

// Resolves all desktop icon positions without collisions (saved → app default → auto)
export function resolveIconLayout(entries: readonly IconLayoutEntry[], dims: GridDims): Record<string, GridCell> {
  const occupied = new Set<string>();
  const result: Record<string, GridCell> = {};
  const place = (id: string, cell: GridCell) => {
    const free = findFreeCell(normalizeCell(cell, dims), occupied, dims);
    occupied.add(cellKey(free));
    result[id] = free;
  };

  entries.forEach((e) => e.saved && place(e.id, e.saved));
  entries.forEach((e) => !e.saved && e.preferred && place(e.id, e.preferred));
  entries.forEach((e) => !e.saved && !e.preferred && place(e.id, firstFreeCell(occupied, dims)));
  return result;
}
