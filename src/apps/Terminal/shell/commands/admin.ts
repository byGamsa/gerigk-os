import { legalConfig } from '@/config/legal.config';
import { deleteEntry, guestbookEnabled, sendMagicLink, setEntryStatus, signOut } from '@/services/guestbook/guestbookService';
import { getGuestbookState, guestbookReady, refreshGuestbook } from '@/services/guestbook/guestbookStore';
import type { GuestbookEntry, GuestbookStatus } from '@/types';
import type { Command, Segment, ShellContext } from '../shell.types';

// Admin area of the guestbook – hidden, only reachable from the terminal

const fail = (ctx: ShellContext, message: string) => {
  ctx.print([{ text: `${ctx.name}: ${message}`, tone: 'red' }]);
  return 1;
};

const maskEmail = (email: string) => email.replace(/^(.)[^@]*(@.*)$/, '$1***$2');
const shortId = (id: string) => id.slice(0, 6);

const STATUS_TONE: Record<GuestbookStatus, Segment['tone']> = { approved: 'green', pending: 'yellow', rejected: 'red' };

function findEntry(ref: string | undefined): GuestbookEntry | undefined {
  if (!ref) return undefined;
  return getGuestbookState().entries.find((e) => e.id.startsWith(ref.toLowerCase()));
}

function printEntries(ctx: ShellContext, filter?: GuestbookStatus) {
  const entries = getGuestbookState().entries.filter((e) => !filter || e.status === filter);
  if (!entries.length) return ctx.print([{ text: ctx.t({ de: 'Keine Einträge.', en: 'No entries.' }), tone: 'dim' }]);
  entries.forEach((e) =>
    ctx.print([
      { text: `${shortId(e.id)}  `, tone: 'dim' },
      { text: (e.status ?? '?').padEnd(9), tone: e.status ? STATUS_TONE[e.status] : 'dim' },
      { text: ` ${e.title}.txt` },
      { text: e.moderationReason ? `  (${e.moderationReason})` : '', tone: 'dim' },
    ]),
  );
}

export const adminCommands: Command[] = [
  {
    name: 'admin',
    hidden: true,
    summary: { de: 'Gästebuch verwalten', en: 'Manage the guestbook' },
    usage: 'admin [login | logout | list [pending] | approve <id> | reject <id> | rm <id>]',
    run: async (ctx) => {
      if (!guestbookEnabled) return fail(ctx, 'guestbook not configured');
      const [sub = 'open', ref] = ctx.args;
      await guestbookReady();

      if (sub === 'login') {
        if (getGuestbookState().admin) return ctx.print(ctx.t({ de: 'Bereits angemeldet.', en: 'Already signed in.' }));
        try {
          await sendMagicLink(legalConfig.email);
          ctx.print(ctx.t({ de: `Login-Link an ${maskEmail(legalConfig.email)} geschickt.`, en: `Login link sent to ${maskEmail(legalConfig.email)}.` }));
        } catch {
          return fail(ctx, ctx.t({ de: 'Login-Link konnte nicht gesendet werden', en: 'could not send the login link' }));
        }
        return;
      }

      if (!getGuestbookState().admin) return fail(ctx, 'permission denied');

      if (sub === 'logout') {
        await signOut();
        return ctx.print('logout');
      }

      await refreshGuestbook();
      const entries = getGuestbookState().entries;

      if (sub === 'open') {
        const pending = entries.filter((e) => e.status === 'pending').length;
        ctx.print(
          ctx.t({
            de: `${entries.length} Einträge, davon ${pending} ausstehend. Öffne den Gästebuch-Ordner …`,
            en: `${entries.length} entries, ${pending} pending. Opening the guestbook folder …`,
          }),
        );
        ctx.os.launch('guestbook');
        return;
      }

      if (sub === 'list') return printEntries(ctx, ref === 'pending' || ref === 'approved' || ref === 'rejected' ? ref : undefined);

      if (sub === 'approve' || sub === 'reject' || sub === 'rm') {
        const entry = findEntry(ref);
        if (!entry) return fail(ctx, `${ref ?? ''}: no such entry (see admin list)`);
        try {
          if (sub === 'rm') await deleteEntry(entry.id);
          else await setEntryStatus(entry.id, sub === 'approve' ? 'approved' : 'rejected');
        } catch {
          return fail(ctx, 'action failed');
        }
        await refreshGuestbook();
        return ctx.print(`${sub === 'rm' ? 'removed' : sub === 'approve' ? 'approved' : 'rejected'} ${shortId(entry.id)}  ${entry.title}.txt`);
      }

      return fail(ctx, `usage: ${'admin [login | logout | list [pending] | approve <id> | reject <id> | rm <id>]'}`);
    },
  },
];
