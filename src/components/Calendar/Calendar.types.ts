export interface CalendarDay {
  date: Date;
  // YYYY-MM-DD
  key: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export type MonthDirection = -1 | 0 | 1;
