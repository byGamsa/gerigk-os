import { FunctionsHttpError, type Session } from '@supabase/supabase-js';
import { legalConfig } from '@/config/legal.config';
import type { GuestbookDraft, GuestbookEntry, GuestbookStatus, GuestbookSubmitResult, Lang } from '@/types';
import { supabase } from '../supabase';

const TABLE = 'guestbook_entries';
const PUBLIC_COLUMNS = 'id, created_at, title, body';
const ADMIN_COLUMNS = `${PUBLIC_COLUMNS}, status, moderation_reason`;

interface EntryRow {
  id: string;
  created_at: string;
  title: string;
  body: string;
  status?: GuestbookStatus;
  moderation_reason?: string | null;
}

const toEntry = (row: EntryRow): GuestbookEntry => ({
  id: row.id,
  createdAt: row.created_at,
  title: row.title,
  body: row.body,
  status: row.status,
  moderationReason: row.moderation_reason,
});

export const guestbookEnabled = supabase !== null;

// UI only – the real permission check is the RLS policy in the database
export const isAdminSession = (session: Session | null) => session?.user.email?.toLowerCase() === legalConfig.email.toLowerCase();

// Approved entries for everyone, all entries (with moderation info) for the admin
export async function fetchEntries(admin: boolean): Promise<GuestbookEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select(admin ? ADMIN_COLUMNS : PUBLIC_COLUMNS)
    .order('created_at', { ascending: false })
    .limit(200)
    .overrideTypes<EntryRow[], { merge: false }>();
  if (error) throw error;
  return data.map(toEntry);
}

// Goes through the edge function, which filters and moderates before storing
export async function submitEntry(draft: GuestbookDraft, lang: Lang): Promise<GuestbookSubmitResult> {
  if (!supabase) return { ok: false, error: 'not_configured' };
  const { data, error } = await supabase.functions.invoke<{ id: string }>('guestbook-submit', {
    body: { ...draft, lang },
  });
  if (error) {
    if (error instanceof FunctionsHttpError && error.context instanceof Response && error.context.status === 429) {
      return { ok: false, error: 'rate_limited' };
    }
    return { ok: false, error: 'failed' };
  }
  return data?.id ? { ok: true, id: data.id } : { ok: false, error: 'failed' };
}

export async function setEntryStatus(id: string, status: GuestbookStatus): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteEntry(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

// Admin login via magic link (only the terminal calls this, with the owner's email; the first click creates the user)
export async function sendMagicLink(email: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut();
}

// Initial session + updates (magic link return, logout); returns an unsubscribe function
export function watchSession(onChange: (session: Session | null) => void): () => void {
  if (!supabase) return () => undefined;
  const { data } = supabase.auth.onAuthStateChange((_event, session) => onChange(session));
  return () => data.subscription.unsubscribe();
}
