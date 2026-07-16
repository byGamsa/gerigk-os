import { Desktop } from './components/Desktop/Desktop';
import { StartMenu } from './components/StartMenu/StartMenu';
import { Taskbar } from './components/Taskbar/Taskbar';
import { useGlobalListeners } from './hooks/useGlobalListeners';

export function App() {
  useGlobalListeners();

  return (
    <>
      <Desktop />
      <Taskbar />

      <StartMenu />
    </>
  );
}
