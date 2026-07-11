// Registers DOM elements needed by animations (e.g. taskbar buttons as minimize targets)
const taskbarButtons = new Map<string, HTMLElement>();

export const taskbarRegistry = {
  set(appId: string, el: HTMLElement | null) {
    if (el) taskbarButtons.set(appId, el);
    else taskbarButtons.delete(appId);
  },
  get(appId: string): HTMLElement | undefined {
    return taskbarButtons.get(appId);
  },
};
