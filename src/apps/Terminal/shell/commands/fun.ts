import type { Localized } from '@/types';
import type { Command, Line, Segment, Tone } from '../shell.types';

// Easter eggs – intentionally hidden from `help` and /bin (hidden: true)

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)]!;

const FORTUNES: readonly Localized[] = [
  {
    de: 'Auf meinem Rechner funktioniert es. – Gut, dann liefern wir deinen Rechner aus.',
    en: "It works on my machine. – Great, then we'll ship your machine.",
  },
  {
    de: 'Es gibt 10 Arten von Menschen: die, die Binär verstehen, und die anderen.',
    en: "There are 10 kinds of people: those who understand binary and those who don't.",
  },
  {
    de: 'Es gibt nur zwei schwierige Dinge in der Informatik: Cache-Invalidierung, Dinge benennen und Off-by-one-Fehler.',
    en: 'There are only two hard things in computer science: cache invalidation, naming things and off-by-one errors.',
  },
  {
    de: '99 kleine Bugs im Code … einen gefixt, neu kompiliert … 127 kleine Bugs im Code.',
    en: '99 little bugs in the code … take one down, patch it around … 127 little bugs in the code.',
  },
  {
    de: 'Warum verwechseln Programmierer Halloween und Weihnachten? Weil OCT 31 == DEC 25.',
    en: 'Why do programmers confuse Halloween and Christmas? Because OCT 31 == DEC 25.',
  },
  {
    de: 'Eine SQL-Query geht in eine Bar, geht zu zwei Tabellen und fragt: „Darf ich euch joinen?“',
    en: 'A SQL query walks into a bar, goes up to two tables and asks: "Can I join you?"',
  },
  {
    de: 'Wenn Debuggen das Entfernen von Bugs ist, dann ist Programmieren das Hinzufügen.',
    en: 'If debugging is the process of removing bugs, then programming must be the process of putting them in.',
  },
  {
    de: 'CSS ist einfach. Bis man versucht, etwas vertikal zu zentrieren.',
    en: 'CSS is easy. Until you try to center something vertically.',
  },
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
    summary: { de: 'Superuser werden (vielleicht)', en: 'Become superuser (maybe)' },
    run: async (ctx) => {
      if (ctx.args.join(' ') === 'make me a sandwich') {
        ctx.print('Okay. 🥪');
        return;
      }
      ctx.print(`[sudo] password for ${ctx.user}: `);
      await ctx.sleep(1200);
      ctx.print([{ text: `${ctx.user} is not in the sudoers file. This incident will be reported.`, tone: 'red' }]);
      return 1;
    },
  },
  {
    name: 'sl',
    hidden: true,
    summary: { de: 'Dampflok', en: 'Steam locomotive' },
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
    },
  },
  {
    name: 'cowsay',
    hidden: true,
    summary: { de: 'Eine Kuh sagt etwas', en: 'A cow says something' },
    run: (ctx) => ctx.print(...bubble(ctx.args.join(' ') || ctx.t({ de: 'Muh.', en: 'Moo.' })), ...COW),
  },
  {
    name: 'fortune',
    hidden: true,
    summary: { de: 'Weisheit des Tages', en: 'Wisdom of the day' },
    run: (ctx) => ctx.print([{ text: ctx.t(pick(FORTUNES)), tone: 'yellow' }]),
  },
  {
    name: 'matrix',
    hidden: true,
    summary: { de: 'Folge dem weißen Kaninchen', en: 'Follow the white rabbit' },
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
    summary: { de: 'Wie im Film', en: 'Like in the movies' },
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
    },
  },
  {
    name: 'coffee',
    aliases: ['brew'],
    hidden: true,
    summary: { de: 'Kaffee kochen', en: 'Brew coffee' },
    run: (ctx) => {
      ctx.print(
        [{ text: "HTTP/1.1 418 I'm a teapot", tone: 'yellow' }],
        ctx.t({ de: 'Ich bin eine Teekanne. Tee ja, Kaffee nein. 🫖', en: "I'm a teapot. Tea, yes. Coffee, no. 🫖" }),
      );
      return 1;
    },
  },
  {
    name: 'vim',
    aliases: ['vi', 'nano', 'emacs'],
    hidden: true,
    summary: { de: 'Editor', en: 'Editor' },
    run: async (ctx) => {
      ctx.live([...Array.from({ length: 8 }, () => [{ text: '~', tone: 'blue' as const }]), [{ text: '-- INSERT --', tone: 'bold' as const }]]);
      await ctx.sleep(1600);
      ctx.live(null);
      ctx.print(
        ':q',
        ':q!',
        ':wq',
        ctx.t({ de: 'Du bist seit 2 Sekunden in vim gefangen. Manche schaffen es nie hinaus.', en: "You've been stuck in vim for 2 seconds. Some never make it out." }),
      );
    },
  },
  {
    name: 'make',
    hidden: true,
    summary: { de: 'Bauen', en: 'Build' },
    run: (ctx) => {
      if (ctx.args[0] === 'love') ctx.print("make: *** No rule to make target 'love'.  Not war?");
      else ctx.print('make: *** No targets specified and no makefile found.  Stop.');
      return 2;
    },
  },
  {
    name: '42',
    aliases: ['answer'],
    hidden: true,
    summary: { de: 'Die Antwort', en: 'The answer' },
    run: (ctx) =>
      ctx.print(
        ctx.t({
          de: 'Die Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest.',
          en: 'The answer to the ultimate question of life, the universe and everything.',
        }),
        ctx.t({ de: 'Jetzt fehlt nur noch die Frage. 🐬', en: 'Now all you need is the question. 🐬' }),
      ),
  },
  {
    name: 'hello',
    aliases: ['hi', 'hallo', 'moin', 'servus'],
    hidden: true,
    summary: { de: 'Hallo sagen', en: 'Say hello' },
    run: (ctx) => ctx.print(ctx.t(pick<Localized>([{ de: 'Hallo! 👋', en: 'Hello! 👋' }, { de: 'Moin! ⚓', en: 'Ahoy! ⚓' }, { de: 'Servus! 🏔️', en: 'Howdy! 🤠' }]))),
  },
  {
    name: 'party',
    hidden: true,
    summary: '🎉',
    run: async (ctx) => {
      const text = ctx.t({ de: '🎉  PARTY IN DER SHELL  🎉', en: '🎉  PARTY IN THE SHELL  🎉' });
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
    summary: { de: 'Versionsverwaltung', en: 'Version control' },
    run: (ctx) => {
      const sub = ctx.args[0];
      const replies: Record<string, Line[]> = {
        blame: [ctx.t({ de: 'Es war der Praktikant. Es ist immer der Praktikant.', en: 'It was the intern. It is always the intern.' })],
        push: [[{ text: 'To portfolio.git', tone: 'dim' }], ` ! [rejected]  main -> main (${ctx.t({ de: 'Freitag, 17:59 Uhr', en: 'Friday, 5:59 pm' })})`],
        status: ['On branch main', "Your branch is up to date with 'origin/main'.", '', 'nothing to commit, working tree clean ✨'],
        commit: [`[main 4a2c1f0] final final v3 (${ctx.t({ de: 'wirklich', en: 'really' })})`],
      };
      ctx.print(...(replies[sub ?? ''] ?? [`git: '${sub ?? ''}' is not a git command. Try 'git status'.`]));
    },
  },
  {
    name: 'weather',
    aliases: ['wetter'],
    hidden: true,
    summary: { de: 'Wetter', en: 'Weather' },
    run: (ctx) => ctx.print(ctx.t({ de: '☀️  localhost: 21 °C. Auf localhost scheint immer die Sonne.', en: "☀️  localhost: 21 °C. It's always sunny on localhost." })),
  },
  {
    name: 'konami',
    hidden: true,
    summary: '↑↑↓↓←→←→BA',
    run: (ctx) => {
      ctx.print(
        [{ text: '↑ ↑ ↓ ↓ ← → ← → B A', tone: 'magenta' }],
        [{ text: ctx.t({ de: 'Cheat aktiviert: +30 Leben 🎮', en: 'Cheat activated: +30 lives 🎮' }), tone: 'green' }],
      );
    },
  },
];
