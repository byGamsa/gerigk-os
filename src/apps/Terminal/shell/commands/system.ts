import { apps } from '@/apps/registry';
import { osConfig } from '@/config/os.config';
import { parseFlags } from '../parser';
import type { Command, Segment, ShellContext } from '../shell.types';

const fail = (ctx: ShellContext, message: string) => {
  ctx.print([{ text: `${ctx.name}: ${message}`, tone: 'red' }]);
  return 1;
};

function formatUptime(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}h ${m}m` : m ? `${m} min` : `${s} s`;
}

// Rough browser + OS detection from the user agent
function detectHost(ctx: ShellContext) {
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  const os = /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'macOS' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Linux/.test(ua) ? 'Linux' : '?';
  return `${browser} ${ctx.t({ de: 'auf', en: 'on' })} ${os}`;
}

// Gerigk OS logo made of blocks
const LOGO = ['███████  ███████', '███████  ███████', '███████  ███████', '', '███████  ███████', '███████  ███████', '███████  ███████'];

export const systemCommands: Command[] = [
  {
    name: 'neofetch',
    aliases: ['fastfetch'],
    summary: { de: 'Systeminfos mit Logo', en: 'System info with logo' },
    run: (ctx) => {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const title = `${ctx.user}@${ctx.host}`;
      const info: Segment[][] = [
        [{ text: title, tone: 'cyan' }],
        [{ text: '─'.repeat(title.length), tone: 'dim' }],
        ...(
          [
            ['OS', `${osConfig.name} ${__APP_VERSION__} (Liquid Glass)`],
            ['Host', detectHost(ctx)],
            ['Kernel', 'React 19 · TypeScript'],
            ['Uptime', formatUptime(Date.now() - ctx.startedAt)],
            ['Packages', `${apps.length} (apps)`],
            ['Shell', 'gsh 1.0'],
            ['Resolution', `${window.screen.width}x${window.screen.height}`],
            ['Theme', 'Liquid Glass [Dark]'],
            ['CPU', `${navigator.hardwareConcurrency || '?'} ${ctx.t({ de: 'Kerne', en: 'cores' })}`],
            ['Memory', nav.deviceMemory ? `≈ ${nav.deviceMemory} GB` : '?'],
          ] as const
        ).map(([k, v]) => [{ text: `${k}: `, tone: 'cyan' as const }, { text: v }]),
        [],
        ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'].map((tone) => ({ text: '███', tone: tone as Segment['tone'] })),
      ];
      const rows = Math.max(LOGO.length, info.length);
      for (let i = 0; i < rows; i++) {
        ctx.print([{ text: (LOGO[i] ?? '').padEnd(20), tone: 'blue' }, ...(info[i] ?? [])]);
      }
    },
  },
  {
    name: 'uname',
    summary: { de: 'Systemname (-a alles)', en: 'System name (-a everything)' },
    run: (ctx) => {
      const { flags } = parseFlags(ctx.args);
      ctx.print(flags.has('a') ? `GerigkOS ${ctx.host} ${__APP_VERSION__} #1 SMP ${new Date(__APP_BUILD__).toUTCString()} web gsh` : 'GerigkOS');
    },
  },
  {
    name: 'uptime',
    summary: { de: 'Wie lange läuft das System schon?', en: 'How long the system has been running' },
    run: (ctx) => ctx.print(`up ${formatUptime(Date.now() - ctx.startedAt)}, 1 user, load average: 0.42, 0.13, 0.37`),
  },
  {
    name: 'ps',
    summary: { de: 'Laufende Prozesse (= offene Fenster)', en: 'Running processes (= open windows)' },
    run: (ctx) => {
      ctx.print([{ text: '  PID  STATUS      COMMAND', tone: 'bold' }]);
      ctx.print('    1  running     init');
      ctx.os.windows().forEach((w) => ctx.print(`${String(w.pid).padStart(5)}  ${w.status.padEnd(10)}  ${w.appId} – ${w.title}`));
    },
  },
  {
    name: 'kill',
    summary: { de: 'Prozess beenden (schließt das Fenster)', en: 'Kill a process (closes the window)' },
    usage: 'kill <pid>',
    run: (ctx) => {
      const pid = Number(ctx.args.find((a) => !a.startsWith('-')));
      if (pid === 1) return fail(ctx, '(1) – Operation not permitted');
      const win = ctx.os.windows().find((w) => w.pid === pid);
      if (!win) return fail(ctx, `(${ctx.args.join(' ') || '?'}) – No such process`);
      ctx.os.killWindow(win.id);
    },
  },
  {
    name: 'ping',
    summary: { de: 'Host anpingen', en: 'Ping a host' },
    usage: 'ping <host>',
    run: async (ctx) => {
      const host = ctx.args.find((a) => !a.startsWith('-')) ?? 'localhost';
      const local = /^(localhost|127\.0\.0\.1|::1)$/.test(host);
      ctx.print(`PING ${host} (${local ? '127.0.0.1' : `93.184.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`}): 56 data bytes`);
      const times: number[] = [];
      for (let seq = 0; seq < 4; seq++) {
        await ctx.sleep(700);
        const t = local ? 0.04 + Math.random() * 0.05 : 12 + Math.random() * 25;
        times.push(t);
        ctx.print(`64 bytes from ${host}: icmp_seq=${seq} ttl=${local ? 64 : 56} time=${t.toFixed(3)} ms`);
      }
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      ctx.print('', `--- ${host} ping statistics ---`, `4 packets transmitted, 4 packets received, 0.0% packet loss`, `round-trip avg = ${avg.toFixed(3)} ms`);
    },
  },
  {
    name: 'cal',
    summary: { de: 'Kalender des aktuellen Monats', en: 'Calendar of the current month' },
    run: (ctx) => {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const title = first.toLocaleString(ctx.os.lang() === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' });
      ctx.print(title.padStart(Math.floor((20 + title.length) / 2)));
      ctx.print(ctx.t({ de: 'Mo Di Mi Do Fr Sa So', en: 'Mo Tu We Th Fr Sa Su' }));
      let row: Segment[] = [{ text: '   '.repeat((first.getDay() + 6) % 7) }];
      for (let d = 1; d <= days; d++) {
        const today = d === now.getDate();
        row.push({ text: String(d).padStart(2), tone: today ? 'green' : 'default' }, { text: ' ' });
        if ((first.getDay() + 6 + d) % 7 === 0 || d === days) {
          ctx.print(row);
          row = [];
        }
      }
    },
  },
  {
    name: 'calc',
    aliases: ['bc', 'expr'],
    summary: { de: 'Rechnen, z. B. calc (2+3)*4', en: 'Calculate, e.g. calc (2+3)*4' },
    usage: 'calc <expression>',
    run: (ctx) => {
      const expr = ctx.args.join(' ');
      // Only numbers, operators and parentheses – safe to evaluate after that
      if (!expr || !/^[\d\s+\-*/%.()^]+$/.test(expr)) {
        return fail(ctx, ctx.t({ de: 'nur Zahlen und + - * / % ^ ( ) erlaubt', en: 'only numbers and + - * / % ^ ( ) allowed' }));
      }
      try {
        const result = Function(`"use strict"; return (${expr.replace(/\^/g, '**')});`)() as number;
        if (!Number.isFinite(result)) return fail(ctx, Number.isNaN(result) ? 'NaN' : 'division by zero');
        ctx.print(String(Math.round(result * 1e10) / 1e10));
      } catch {
        return fail(ctx, 'syntax error');
      }
    },
  },
  {
    name: 'lang',
    summary: { de: 'Sprache des Systems wechseln (de|en)', en: 'Switch the system language (de|en)' },
    usage: 'lang <de|en>',
    run: (ctx) => {
      const target = ctx.args[0];
      if (target !== 'de' && target !== 'en') return ctx.print(`current: ${ctx.os.lang()} · usage: lang <de|en>`);
      ctx.os.setLang(target);
      ctx.print(target === 'de' ? 'Sprache: Deutsch 🇩🇪' : 'Language: English 🇬🇧');
    },
  },
  {
    name: 'wallpaper',
    summary: { de: 'Neuen Hintergrund laden', en: 'Load a new wallpaper' },
    run: (ctx) => {
      ctx.os.nextWallpaper();
      ctx.print(ctx.t({ de: 'Neuer Hintergrund wird geladen … 🏞️', en: 'Loading a new wallpaper … 🏞️' }));
    },
  },
  {
    name: 'music',
    summary: { de: 'Musik steuern (play|pause|next|prev|status)', en: 'Control music (play|pause|next|prev|status)' },
    usage: 'music <play|pause|next|prev|status>',
    run: (ctx) => {
      const action = ctx.args[0] ?? 'status';
      if (!ctx.os.music.isReady()) {
        ctx.print(ctx.t({ de: 'Musik-App ist nicht geöffnet – starte sie …', en: 'Music app is not open – starting it …' }));
        ctx.os.launch('spotify');
        return;
      }
      if (action === 'play' || action === 'pause' || action === 'toggle') ctx.os.music.togglePlay();
      else if (action === 'next') ctx.os.music.next();
      else if (action === 'prev') ctx.os.music.previous();
      else if (action !== 'status') return fail(ctx, `${ctx.t({ de: 'unbekannte Aktion', en: 'unknown action' })}: ${action}`);
      const now = ctx.os.music.nowPlaying();
      ctx.print(now ? `♪ ${now}` : '♪ –');
    },
  },
  {
    name: 'shutdown',
    aliases: ['reboot', 'restart'],
    summary: { de: 'System neu starten', en: 'Restart the system' },
    run: async (ctx) => {
      ctx.print([{ text: `Broadcast message from ${ctx.user}@${ctx.host}: The system is going down NOW!`, tone: 'yellow' }]);
      await ctx.sleep(900);
      ctx.os.restart();
    },
  },
];
