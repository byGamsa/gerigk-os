import { useSyncExternalStore } from 'react';
import { osConfig } from '@/config/os.config';
import type { GuestbookDraft, GuestbookEntry, Lang, OwnGuestbookFile } from '@/types';
import { fetchEntries, guestbookEnabled, isAdminSession, submitEntry, watchSession } from './guestbookService';

interface GuestbookState {
  entries: readonly GuestbookEntry[];
  // Files this visitor saved (browser only)
  own: readonly OwnGuestbookFile[];
  loading: boolean;
  failed: boolean;
  // Signed in as the site owner (sees and moderates all entries)
  admin: boolean;
  email: string | null;
}

const OWN_KEY = `${osConfig.storageKey}:guestbook-own`;

function readOwn(): OwnGuestbookFile[] {
  try {
    return JSON.parse(localStorage.getItem(OWN_KEY) ?? '[]') as OwnGuestbookFile[];
  } catch {
    return [];
  }
}

function writeOwn(own: readonly OwnGuestbookFile[]) {
  try {
    localStorage.setItem(OWN_KEY, JSON.stringify(own));
  } catch {
    // storage full/blocked – the file stays until reload
  }
}

let state: GuestbookState = { entries: [], own: readOwn(), loading: false, failed: false, admin: false, email: null };
const listeners = new Set<() => void>();

const emit = (patch: Partial<GuestbookState>) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

export const getGuestbookState = () => state;

// Loads the folder contents: all entries for the admin, approved ones for everyone else
export async function refreshGuestbook(): Promise<void> {
  if (!guestbookEnabled) return;
  emit({ loading: true });
  try {
    emit({ entries: await fetchEntries(state.admin), failed: false });
  } catch {
    emit({ failed: true });
  } finally {
    emit({ loading: false });
  }
}

const updateOwn = (own: OwnGuestbookFile[]) => {
  writeOwn(own);
  emit({ own });
};

// Saves right away in the browser and submits in the background – the visitor never sees the moderation
export function saveGuestbookFile(draft: GuestbookDraft, lang: Lang): string {
  const file: OwnGuestbookFile = { id: `own-${crypto.randomUUID()}`, title: draft.title, body: draft.body, createdAt: new Date().toISOString() };
  updateOwn([file, ...state.own]);
  void submitEntry(draft, lang).then((result) => {
    if (!result.ok) return;
    updateOwn(state.own.map((f) => (f.id === file.id ? { ...f, serverId: result.id } : f)));
    void refreshGuestbook();
  });
  return file.id;
}

// Database id behind an entry id (own files map to their server copy)
export const serverIdOf = (id: string) => (id.startsWith('own-') ? state.own.find((f) => f.id === id)?.serverId : id) ?? null;

let started = false;
let markReady: () => void = () => undefined;
const ready = new Promise<void>((resolve) => (markReady = resolve));

// Tracks the session once (also picks up the magic link return) and reloads on every change
function start() {
  if (started || !guestbookEnabled) return;
  started = true;
  watchSession((session) => {
    emit({ admin: isAdminSession(session), email: session?.user.email ?? null });
    markReady();
    void refreshGuestbook();
  });
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Shared guestbook state for explorer, notepad and terminal
export function useGuestbookState(): GuestbookState {
  return useSyncExternalStore(subscribe, getGuestbookState);
}

// Resolves once the session is known (the terminal needs it before checking admin rights)
export async function guestbookReady(): Promise<void> {
  if (!guestbookEnabled) return;
  start();
  await ready;
}
