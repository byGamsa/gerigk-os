import { getApp } from '@/apps/registry';
import { resolveLocalized } from '@/i18n';
import { musicPlayer } from '@/services/music/player';
import { findTrack } from '@/services/music/playlist';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import type { ShellOs } from './shell.types';

// Stable process IDs per window (starting at 100)
const pids = new Map<string, number>();
let nextPid = 100;
const pidFor = (windowId: string) => {
  if (!pids.has(windowId)) pids.set(windowId, nextPid++);
  return pids.get(windowId)!;
};

// Connects the shell to the window manager, settings and music player
export function createShellOs(terminalWindowId: string): ShellOs {
  const store = useOsStore.getState;
  return {
    launch: (appId, args) => (getApp(appId) ? launchApp(appId, args) !== null : false),
    closeTerminal: () => store().closeWindow(terminalWindowId),
    lang: () => store().lang,
    setLang: (lang) => store().setLang(lang),
    windows: () =>
      Object.values(store().windows)
        .filter((w) => w.status !== 'closing')
        .sort((a, b) => a.openedAt - b.openedAt)
        .map((w) => ({
          pid: pidFor(w.id),
          id: w.id,
          appId: w.appId,
          title: resolveLocalized(store().lang, w.title),
          status: w.status === 'minimized' ? 'sleeping' : w.id === store().activeId ? 'running' : 'idle',
        })),
    killWindow: (id) => store().closeWindow(id),
    nextWallpaper: () => store().nextWallpaper(),
    restart: () => store().restart(),
    music: {
      isReady: () => store().playback.ready,
      togglePlay: () => musicPlayer.togglePlay(),
      next: () => musicPlayer.next(),
      previous: () => musicPlayer.previous(),
      nowPlaying: () => {
        const track = findTrack(store().playback.uri);
        return track ? `${track.artist} – ${track.title}` : null;
      },
    },
  };
}
