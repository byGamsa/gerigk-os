import type { AnyAppDefinition, AppDefinition } from '@/types';

// Typed helper for app definitions: checks component and `instanceKey` against the same args type
export function defineApp<TArgs = unknown>(app: AppDefinition<TArgs>): AnyAppDefinition {
  return app;
}
