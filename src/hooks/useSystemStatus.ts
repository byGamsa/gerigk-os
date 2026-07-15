import { useEffect, useState } from 'react';
import type { BatteryManagerLike, BatteryStatus, SystemStatus } from '@/types';

type NavigatorWithBattery = Navigator & { getBattery?: () => Promise<BatteryManagerLike> };

// Real online status and battery level (if the browser offers the Battery API)
export function useSystemStatus(): SystemStatus {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [battery, setBattery] = useState<BatteryStatus>({ supported: false, level: 1, charging: false });

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return;
    let manager: BatteryManagerLike | null = null;
    const update = () => manager && setBattery({ supported: true, level: manager.level, charging: manager.charging });
    nav.getBattery().then((m) => {
      manager = m;
      update();
      m.addEventListener('levelchange', update);
      m.addEventListener('chargingchange', update);
    }).catch(() => undefined);
    return () => {
      manager?.removeEventListener('levelchange', update);
      manager?.removeEventListener('chargingchange', update);
    };
  }, []);

  return { online, battery };
}
