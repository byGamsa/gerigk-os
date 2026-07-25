import type { AnyAppDefinition, AppId } from '@/types';
import { aboutApp } from './About';

// All installed apps – new apps: create a folder in `src/apps/`, use `defineApp` and register here
export const apps: readonly AnyAppDefinition[] = [aboutApp];

const byId = new Map(apps.map((app) => [app.id, app]));

export const getApp = (id: AppId): AnyAppDefinition | undefined => byId.get(id);

export const pinnedApps = apps.filter((app) => app.pinned);

export const desktopApps = apps.filter((app) => app.desktop);
