import { Boot } from './components/Boot/Boot';
import { Calendar } from './components/Calendar/Calendar';
import { ContextMenu } from './components/ContextMenu/ContextMenu';
import { Desktop } from './components/Desktop/Desktop';
import { QuickSettings } from './components/QuickSettings/QuickSettings';
import { StartMenu } from './components/StartMenu/StartMenu';
import { Taskbar } from './components/Taskbar/Taskbar';
import { Toasts } from './components/Toasts/Toasts';
import { useGlobalListeners } from './hooks/useGlobalListeners';

export function App() {
  useGlobalListeners();

  return (
    <>
      <Desktop />
      <Taskbar />

      <StartMenu />
      <Calendar />
      <QuickSettings />
      <ContextMenu />
      <Toasts />

      <Boot />
    </>
  );
}
