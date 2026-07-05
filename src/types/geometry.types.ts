export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

// Flyout anchor: either a bar element or a free point (context menu)
export interface AnchorRect extends Rect {
  kind: 'bar' | 'point';
  // Top/bottom edge of the bar containing the trigger
  barTop: number;
  barBottom: number;
}
