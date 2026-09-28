import { parseFlags } from '../parser';
import type { Command, Line, Segment, ShellContext } from '../shell.types';
import { FsError, type FsNode } from '../vfs';

const fail = (ctx: ShellContext, message: string) => {
  ctx.print([{ text: `${ctx.name}: ${message}`, tone: 'red' }]);
  return 1;
};

const withFsErrors = (ctx: ShellContext, path: string, fn: () => void): number => {
  try {
    fn();
    return 0;
  } catch (error) {
    if (error instanceof FsError) return fail(ctx, `${path}: ${error.message}`);
    throw error;
  }
};

const nodeSegment = (node: FsNode): Segment => {
  if (node.kind === 'dir') return { text: `${node.name}/`, tone: 'blue' };
  if (node.appId) return { text: node.name, tone: 'green' };
  return { text: node.name };
};

const pad = (text: string, width: number) => text + ' '.repeat(Math.max(1, width - text.length));

const formatDate = (d: Date) =>
  `${d.toLocaleString('en-US', { month: 'short' })} ${String(d.getDate()).padStart(2)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export const coreCommands: Command[] = [
  {
    name: 'help',
    summary: { de: 'Alle Befehle anzeigen', en: 'List all commands' },
    usage: 'help [command]',
    run: (ctx) => {
      const [topic] = ctx.args;
      if (topic) return manPage(ctx, topic);
      ctx.print(
        [
          { text: 'gsh – Gerigk Shell', tone: 'bold' },
          {
            text: ctx.t({
              de: '  ·  Tab ergänzt, ↑/↓ blättert, Ctrl+C bricht ab, Ctrl+L leert',
              en: '  ·  Tab completes, ↑/↓ browses history, Ctrl+C cancels, Ctrl+L clears',
            }),
            tone: 'dim',
          },
        ],
        '',
      );
      const visible = ctx.commands.filter((c) => !c.hidden);
      const width = Math.max(...visible.map((c) => c.name.length)) + 3;
      visible.forEach((c) => ctx.print([{ text: pad(c.name, width), tone: 'green' }, { text: ctx.t(c.summary) }]));
    },
  },
  {
    name: 'man',
    summary: { de: 'Hilfe zu einem Befehl', en: 'Manual for a command' },
    usage: 'man <command>',
    run: (ctx) => (ctx.args[0] ? manPage(ctx, ctx.args[0]) : fail(ctx, 'What manual page do you want?')),
  },
  {
    name: 'ls',
    aliases: ['ll', 'dir'],
    summary: { de: 'Dateien auflisten (-a versteckte, -l Details)', en: 'List files (-a hidden, -l details)' },
    usage: 'ls [-la] [path]',
    run: (ctx) => {
      const { flags, rest } = parseFlags(ctx.args);
      const long = flags.has('l') || ctx.name === 'll';
      const all = flags.has('a') || ctx.name === 'll';
      const target = rest[0] ?? '.';
      const abs = ctx.fs.resolve(ctx.cwd, target);
      let nodes: FsNode[] = [];
      const code = withFsErrors(ctx, target, () => {
        nodes = ctx.fs.list(abs).filter((n) => all || !n.name.startsWith('.'));
      });
      if (code) return code;
      if (!nodes.length) return;
      if (long) {
        ctx.print([{ text: `total ${nodes.length}`, tone: 'dim' }]);
        nodes.forEach((n) => {
          const perms = `${n.kind === 'dir' ? 'd' : '-'}${n.readonly ? 'r--r--r--' : 'rw-r--r--'}`;
          const size = n.kind === 'dir' ? 4096 : safeSize(n);
          ctx.print([
            { text: `${perms}  1 ${ctx.user} ${ctx.user} ${String(size).padStart(6)} ${formatDate(n.modifiedAt)} `, tone: 'dim' },
            nodeSegment(n),
          ]);
        });
        return;
      }
      const segments: Segment[] = [];
      nodes.forEach((n, i) => {
        segments.push(nodeSegment(n));
        if (i < nodes.length - 1) segments.push({ text: '   ' });
      });
      ctx.print(segments);
    },
  },
  {
    name: 'cd',
    summary: { de: 'Verzeichnis wechseln', en: 'Change directory' },
    usage: 'cd [path]',
    run: (ctx) => {
      const target = ctx.args[0] ?? '~';
      const abs = ctx.fs.resolve(ctx.cwd, target);
      const node = ctx.fs.get(abs);
      if (!node) return fail(ctx, `${target}: No such file or directory`);
      if (node.kind !== 'dir') return fail(ctx, `${target}: Not a directory`);
      ctx.setCwd(abs);
    },
  },
  {
    name: 'pwd',
    summary: { de: 'Aktuelles Verzeichnis anzeigen', en: 'Print working directory' },
    run: (ctx) => ctx.print(ctx.cwd),
  },
  {
    name: 'cat',
    summary: { de: 'Dateiinhalt ausgeben', en: 'Print file contents' },
    usage: 'cat <file…>',
    run: (ctx) => {
      if (!ctx.args.length) return fail(ctx, 'missing file operand');
      let code = 0;
      ctx.args.forEach((path) => {
        code ||= withFsErrors(ctx, path, () => {
          const text = ctx.fs.read(ctx.fs.resolve(ctx.cwd, path));
          text.replace(/\n$/, '').split('\n').forEach((line) => ctx.print(line));
        });
      });
      return code;
    },
  },
  {
    name: 'echo',
    summary: { de: 'Text ausgeben (auch > datei)', en: 'Print text (also > file)' },
    usage: 'echo [text] [> file]',
    run: (ctx) => ctx.print(ctx.args.join(' ')),
  },
  {
    name: 'touch',
    summary: { de: 'Leere Datei anlegen', en: 'Create an empty file' },
    usage: 'touch <file>',
    run: (ctx) => {
      if (!ctx.args.length) return fail(ctx, 'missing file operand');
      let code = 0;
      ctx.args.forEach((p) => (code ||= withFsErrors(ctx, p, () => ctx.fs.touch(ctx.fs.resolve(ctx.cwd, p)))));
      return code;
    },
  },
  {
    name: 'mkdir',
    summary: { de: 'Verzeichnis anlegen (-p mit Eltern)', en: 'Create a directory (-p with parents)' },
    usage: 'mkdir [-p] <path>',
    run: (ctx) => {
      const { flags, rest } = parseFlags(ctx.args);
      if (!rest.length) return fail(ctx, 'missing operand');
      let code = 0;
      rest.forEach((p) => (code ||= withFsErrors(ctx, p, () => ctx.fs.mkdir(ctx.fs.resolve(ctx.cwd, p), flags.has('p')))));
      return code;
    },
  },
  {
    name: 'rm',
    summary: { de: 'Dateien löschen (-r für Ordner)', en: 'Remove files (-r for directories)' },
    usage: 'rm [-rf] <path>',
    run: async (ctx) => {
      const { flags, rest } = parseFlags(ctx.args);
      if (!rest.length) return fail(ctx, 'missing operand');
      if (flags.has('r') && rest.some((p) => ctx.fs.resolve(ctx.cwd, p) === '/')) return fakeRmRf(ctx);
      let code = 0;
      rest.forEach((p) => (code ||= withFsErrors(ctx, p, () => ctx.fs.remove(ctx.fs.resolve(ctx.cwd, p), flags.has('r')))));
      return code;
    },
  },
  {
    name: 'open',
    aliases: ['start', 'xdg-open'],
    summary: { de: 'App oder Datei öffnen (z. B. open spotify)', en: 'Open an app or file (e.g. open spotify)' },
    usage: 'open <app|file>',
    run: (ctx) => {
      const [target] = ctx.args;
      if (!target) return fail(ctx, 'usage: open <app|file>');
      const node = ctx.fs.get(ctx.fs.resolve(ctx.cwd, target));
      if (node?.fileId) return ctx.os.launch('notepad', { fileId: node.fileId }) ? 0 : 1;
      if (node?.appId) return ctx.os.launch(node.appId) ? 0 : 1;
      if (node?.kind === 'dir') return ctx.os.launch('explorer') ? 0 : 1;
      if (ctx.os.launch(target.toLowerCase())) return;
      return fail(
        ctx,
        `${target}: ${ctx.t({ de: 'Keine App oder Datei gefunden', en: 'No app or file found' })}. Apps: explorer, brave, spotify, notepad, about, system, terminal`,
      );
    },
  },
  {
    name: 'clear',
    aliases: ['cls'],
    summary: { de: 'Bildschirm leeren', en: 'Clear the screen' },
    run: (ctx) => ctx.clear(),
  },
  {
    name: 'history',
    summary: { de: 'Befehlsverlauf', en: 'Command history' },
    run: (ctx) => ctx.history.forEach((h, i) => ctx.print([{ text: String(i + 1).padStart(4) + '  ', tone: 'dim' }, { text: h }])),
  },
  {
    name: 'whoami',
    summary: { de: 'Aktueller Benutzer', en: 'Current user' },
    run: (ctx) => ctx.print(ctx.user),
  },
  {
    name: 'hostname',
    summary: { de: 'Name des Rechners', en: 'Name of this machine' },
    run: (ctx) => ctx.print(ctx.host),
  },
  {
    name: 'date',
    summary: { de: 'Datum und Uhrzeit', en: 'Date and time' },
    run: (ctx) => ctx.print(new Date().toString()),
  },
  {
    name: 'exit',
    aliases: ['logout'],
    summary: { de: 'Terminal schließen', en: 'Close the terminal' },
    run: async (ctx) => {
      ctx.print('logout');
      await ctx.sleep(250);
      ctx.os.closeTerminal();
    },
  },
];

function safeSize(node: FsNode): number {
  try {
    return new Blob([node.content?.() ?? '']).size;
  } catch {
    return 0;
  }
}

function manPage(ctx: ShellContext, topic: string) {
  const cmd = ctx.commands.find((c) => c.name === topic || c.aliases?.includes(topic));
  if (!cmd) return fail(ctx, `No manual entry for ${topic}`);
  const lines: Line[] = [
    [{ text: 'NAME', tone: 'bold' }],
    `       ${cmd.name} – ${ctx.t(cmd.summary)}`,
    '',
    [{ text: 'SYNOPSIS', tone: 'bold' }],
    `       ${cmd.usage ?? cmd.name}`,
  ];
  if (cmd.aliases?.length) lines.push('', [{ text: 'ALIASES', tone: 'bold' }], `       ${cmd.aliases.join(', ')}`);
  ctx.print(...lines);
}

// rm -rf / – "deletes" everything, panics and reboots the whole OS
async function fakeRmRf(ctx: ShellContext) {
  const home = ctx.fs.home;
  const victims = ['/bin', '/etc', `${home}/Documents`, `${home}/Pictures`, `${home}/.secret`, '/boot/vmlinuz', '/sys/kernel', '/dev/null'];
  for (const v of victims) {
    ctx.print([{ text: `removed '${v}'`, tone: 'red' }]);
    await ctx.sleep(180);
  }
  await ctx.sleep(500);
  ctx.print('', [{ text: 'Kernel panic – not syncing: Attempted to kill init!', tone: 'red' }]);
  await ctx.sleep(1600);
  ctx.os.restart();
}
