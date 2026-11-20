import type { AnyAppDefinition, AppId } from '@/types';
import { aboutApp } from './About';
import { browserApp } from './Browser';
import { notepadApp } from './Notepad';
import { projectsApp } from './Projects';
import { explorerApp, guestbookApp, recycleBinApp } from './Explorer';
import { spotifyApp } from './Spotify';
import { systemApp } from './System';
import { terminalApp } from './Terminal';

// All installed apps – new apps: create a folder in `src/apps/`, use `defineApp` and register here
export const apps: readonly AnyAppDefinition[] = [recycleBinApp, guestbookApp, explorerApp, browserApp, terminalApp, aboutApp, projectsApp, spotifyApp, notepadApp, systemApp];

const byId = new Map(apps.map((app) => [app.id, app]));

export const getApp = (id: AppId): AnyAppDefinition | undefined => byId.get(id);

export const pinnedApps = apps.filter((app) => app.pinned);

export const desktopApps = apps.filter((app) => app.desktop);

export const autostartApps = apps.filter((app) => app.autostart);
