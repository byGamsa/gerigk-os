export interface BatteryStatus {
  supported: boolean;
  // 0 … 1
  level: number;
  charging: boolean;
}

export interface SystemStatus {
  online: boolean;
  battery: BatteryStatus;
}

// Minimal type for the (non-standard) Battery Status API
export interface BatteryManagerLike extends EventTarget {
  level: number;
  charging: boolean;
}
