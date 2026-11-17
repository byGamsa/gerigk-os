export type GuestbookStatus = 'pending' | 'approved' | 'rejected';

// An anonymous visitor file in the guestbook folder
export interface GuestbookEntry {
  id: string;
  createdAt: string;
  title: string;
  body: string;
  // Only visible to the admin
  status?: GuestbookStatus;
  moderationReason?: string | null;
}

export interface GuestbookDraft {
  title: string;
  body: string;
  // Honeypot – hidden field that only bots fill in
  website: string;
}

export type GuestbookSubmitError = 'rate_limited' | 'not_configured' | 'failed';

// The moderation result stays on the server – visitors only get the new id
export type GuestbookSubmitResult = { ok: true; id: string } | { ok: false; error: GuestbookSubmitError };

// A file this visitor saved – kept in the browser so it shows up right away, whatever the moderation says
export interface OwnGuestbookFile {
  id: string;
  // Database id once the edge function answered (deduplicates against the server list)
  serverId?: string;
  title: string;
  body: string;
  createdAt: string;
}
