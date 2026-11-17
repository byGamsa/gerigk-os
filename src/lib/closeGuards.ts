// Windows that want to confirm before closing (e.g. unsaved editor files); a guard returns true when it took over
const guards = new Map<string, () => boolean>();

export const closeGuards = {
  set: (windowId: string, guard: () => boolean) => guards.set(windowId, guard),
  delete: (windowId: string) => guards.delete(windowId),
  intercept: (windowId: string) => guards.get(windowId)?.() ?? false,
};
