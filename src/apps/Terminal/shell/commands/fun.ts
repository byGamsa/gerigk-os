import type { Command, Line, Segment, Tone } from '../shell.types';

// Easter eggs – intentionally hidden from `help` (hidden: true), hinted in ~/.secret

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)]!;

const FORTUNES = [
  'Es funktioniert auf meinem Rechner. Dann liefern wir eben meinen Rechner aus.',
  'Ein Bug ist nur ein Feature, das noch keinen Namen hat.',
  'Es gibt 10 Arten von Menschen: die, die Binär verstehen, und die anderen.',
  'Der schnellste Code ist der, der nie geschrieben wurde.',
  'Heute ist ein guter Tag, um git push --force zu vermeiden.',
  'Naming things ist schwer. Deshalb heißt diese Variable „data2_final“.',
  'CSS ist einfach. Bis man versucht, etwas zu zentrieren.',
  'Kaffee → Code → Bugs → mehr Kaffee. Ein stabiler Kreislauf.',
  'Das Deadline-Monster lauert hinter dem nächsten Commit.',
  '99 kleine Bugs im Code … einen gefixt, neu kompiliert … 127 kleine Bugs im Code.',
  'Wenn Debuggen das Entfernen von Bugs ist, ist Programmieren das Hinzufügen.',
  'Tipp: Der Papierkorb auf dem Desktop enthält mehr als nur Müll.',
];

// Speech bubble for cowsay
function bubble(text: string): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 36) {
      lines.push(line.trim());
      line = w;
    } else line += ` ${w}`;
  }
  if (line.trim()) lines.push(line.trim());
  const width = Math.max(...lines.map((l) => l.length));
  const border = (l: string, r: string) => `${l}${'-'.repeat(width + 2)}${r}`;
  return [
    border(' ', ' '),
    ...lines.map((l, i) => {
      const [a, b] = lines.length === 1 ? ['<', '>'] : i === 0 ? ['/', '\\'] : i === lines.length - 1 ? ['\\', '/'] : ['|', '|'];
      return `${a} ${l.padEnd(width)} ${b}`;
    }),
    border(' ', ' '),
  ];
}

// Hand-drawn cow 🐄
const COW = [
  '     \\',
  '      \\   _______',
  '         / o   o \\___',
  '        (     ^      )\\',
  '         \\  \\___/  /  \\',
  '          |  | |  |',
  '          |__|_|__|',
];

// Hand-drawn locomotive for `sl`
const TRAIN = [
  '      (  )   (   ) )',
  '     (    )  ( )',
  '       ___  (',
  '   ___|[]|_____________   ____________',
  '  |  _   _   _    ___  |_|  ________  |',
  '  |_(_)_(_)_(_)__|___|____|_(_)__(_)_|>',
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
];

const RAINBOW: Tone[] = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];

export const funCommands: Command[] = [
  {
    name: 'sudo',
    hidden: true,
    summary: 'Superuser werden (vielleicht)',
    run: async (ctx) => {
      const request = ctx.args.join(' ');
      if (request === 'make me a sandwich') {
        ctx.print('Okay. 🥪');
        return;
      }
      ctx.print(`[sudo] password for ${ctx.user}: `);
      await ctx.sleep(1200);
      ctx.print([{ text: `${ctx.user} is not in the sudoers file. This incident will be reported.`, tone: 'red' }]);
      await ctx.sleep(600);
      ctx.print([{ text: '… an den Papierkorb. Der erzählt es niemandem. 🤫', tone: 'dim' }]);
      return 1;
    },
  },
  {
    name: 'sl',
    hidden: true,
    summary: 'Dampflok (Tippfehler von ls?)',
    run: async (ctx) => {
      const width = 70;
      for (let offset = width; offset > -TRAIN[3]!.length; offset -= 2) {
        ctx.live(
          TRAIN.map((row) => {
            const padded = ' '.repeat(Math.max(0, offset)) + row.slice(Math.max(0, -offset));
            return padded.slice(0, width);
          }),
        );
        await ctx.sleep(45);
      }
      ctx.live(null);
      ctx.print([{ text: 'Du meintest wohl ls. 🚂', tone: 'dim' }]);
    },
  },
  {
    name: 'cowsay',
    hidden: true,
    summary: 'Eine Kuh sagt etwas',
    run: (ctx) => {
      const text = ctx.args.join(' ') || 'Muuuh! Tippe cowsay <text>';
      ctx.print(...bubble(text), ...COW);
    },
  },
  {
    name: 'fortune',
    hidden: true,
    summary: 'Weisheit des Tages',
    run: (ctx) => ctx.print([{ text: pick(FORTUNES), tone: 'yellow' }]),
  },
  {
    name: 'matrix',
    hidden: true,
    summary: 'Folge dem weißen Kaninchen',
    run: async (ctx) => {
      const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF';
      const cols = 64;
      const rows = 14;
      const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * rows));
      const grid = Array.from({ length: rows }, () => Array<string>(cols).fill(' '));
      for (let frame = 0; frame < 80; frame++) {
        drops.forEach((y, x) => {
          grid[y % rows]![x] = pick([...chars]);
          if (Math.random() > 0.9) grid[(y + rows - 6) % rows]![x] = ' ';
          drops[x] = y + 1;
        });
        ctx.live(grid.map((row) => [{ text: row.join(''), tone: 'green' as const }]));
        await ctx.sleep(60);
      }
      ctx.live(null);
      ctx.print([{ text: 'Wake up, Neo …', tone: 'green' }]);
    },
  },
  {
    name: 'hack',
    aliases: ['hollywood'],
    hidden: true,
    summary: 'Wie im Film',
    run: async (ctx) => {
      const steps = ['Bypassing firewall', 'Decrypting mainframe', 'Downloading more RAM', 'Enhancing … enhance!', 'Rerouting through 7 proxies'];
      for (const step of steps) {
        for (let p = 0; p <= 20; p += 4) {
          const bar = '█'.repeat(p) + '░'.repeat(20 - p);
          ctx.live([[{ text: `${step.padEnd(30)} `, tone: 'green' }, { text: `[${bar}] ${p * 5}%`, tone: 'green' }]]);
          await ctx.sleep(70);
        }
        ctx.live(null);
        ctx.print([{ text: `${step.padEnd(30)} `, tone: 'green' }, { text: 'OK', tone: 'bold' }]);
      }
      await ctx.sleep(400);
      ctx.print('', [{ text: '>>> ACCESS GRANTED <<<', tone: 'green' }]);
      await ctx.sleep(900);
      ctx.print([{ text: '… zum Papierkorb. Hier gibt es nichts Geheimes. 😄', tone: 'dim' }]);
    },
  },
  {
    name: 'coffee',
    aliases: ['brew'],
    hidden: true,
    summary: 'Kaffee kochen',
    run: (ctx) => {
      ctx.print([{ text: "HTTP/1.1 418 I'm a teapot", tone: 'yellow' }], 'Ich bin eine Teekanne. Tee gibt es, Kaffee nicht. 🫖');
      return 1;
    },
  },
  {
    name: 'vim',
    aliases: ['vi', 'nano', 'emacs'],
    hidden: true,
    summary: 'Editor',
    run: async (ctx) => {
      ctx.live([...Array.from({ length: 8 }, () => [{ text: '~', tone: 'blue' as const }]), [{ text: '-- INSERT --', tone: 'bold' as const }]]);
      await ctx.sleep(1600);
      ctx.live(null);
      ctx.print('Du bist im Editor gefangen. Versuch :q … :q! … :wq …', [{ text: 'Keine Sorge, ich hab dich rausgeholt. Probier lieber: open notepad', tone: 'dim' }]);
    },
  },
  {
    name: 'make',
    hidden: true,
    summary: 'Bauen',
    run: (ctx) => {
      const target = ctx.args[0];
      if (target === 'love') ctx.print("make: *** No rule to make target 'love'.  Not war?");
      else if (target === 'coffee') ctx.print("make: *** Siehe 'coffee'.");
      else ctx.print(`make: *** No targets specified and no makefile found.  Stop.`);
      return 2;
    },
  },
  {
    name: '42',
    aliases: ['answer'],
    hidden: true,
    summary: 'Die Antwort',
    run: (ctx) => ctx.print('Die Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest.', 'Jetzt musst du nur noch die Frage herausfinden. 🐬'),
  },
  {
    name: 'hello',
    aliases: ['hi', 'hallo', 'moin', 'servus'],
    hidden: true,
    summary: 'Hallo sagen',
    run: (ctx) => ctx.print(pick(['Hallo! 👋', 'Moin! ⚓', 'Hey, schön dass du da bist!', 'Servus! 🏔️'])),
  },
  {
    name: 'party',
    hidden: true,
    summary: '🎉',
    run: async (ctx) => {
      const text = '🎉  PARTY IN DER SHELL  🎉';
      for (let frame = 0; frame < 24; frame++) {
        ctx.live([[...text].map((ch, i): Segment => ({ text: ch, tone: RAINBOW[(i + frame) % RAINBOW.length] }))]);
        await ctx.sleep(90);
      }
      ctx.live(null);
      ctx.print([...text].map((ch, i): Segment => ({ text: ch, tone: RAINBOW[i % RAINBOW.length] })));
    },
  },
  {
    name: 'git',
    hidden: true,
    summary: 'Versionsverwaltung',
    run: (ctx) => {
      const sub = ctx.args[0];
      const replies: Record<string, Line[]> = {
        blame: ['Es war der Praktikant. Es ist immer der Praktikant.'],
        push: [[{ text: 'To portfolio.git', tone: 'dim' }], ' ! [rejected]  main -> main (Freitagnachmittag)'],
        status: ['On branch main', 'Your branch is up to date with \'origin/main\'.', '', 'nothing to commit, working tree clean ✨'],
        commit: ['[main 4a2c1f0] final final v3 (wirklich)'],
      };
      ctx.print(...(replies[sub ?? ''] ?? [`git: '${sub ?? ''}' is not a git command. Try 'git status'.`]));
    },
  },
  {
    name: 'weather',
    aliases: ['wetter'],
    hidden: true,
    summary: 'Wetter',
    run: (ctx) => ctx.print('☀️  localhost: 21 °C, sonnig. Wie immer.'),
  },
  {
    name: 'konami',
    hidden: true,
    summary: '↑↑↓↓←→←→BA',
    run: (ctx) => {
      ctx.print([{ text: '↑ ↑ ↓ ↓ ← → ← → B A', tone: 'magenta' }], [{ text: 'Cheat aktiviert: +30 Leben 🎮', tone: 'green' }]);
    },
  },
];
