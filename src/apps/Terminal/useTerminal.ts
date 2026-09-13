import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { osConfig } from '@/config/os.config';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { binNames, commands } from './shell/commands';
import { complete } from './shell/completion';
import { execute, type ShellEnv } from './shell/executor';
import { InterruptError, type Line, type OutputLine, type Segment } from './shell/shell.types';
import { createShellOs } from './shell/terminalOs';
import { VirtualFs } from './shell/vfs';

const MAX_LINES = 1000;
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const USER = osConfig.owner.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
const HOST = osConfig.name.toLowerCase().replace(/\s+/g, '-');

let lineId = 0;
const toOutput = (line: Line): OutputLine => ({ id: ++lineId, segments: typeof line === 'string' ? [{ text: line }] : line });

// Terminal logic: input, history, tab, Ctrl+C, execution
export function useTerminal(windowId: string) {
  const [fs] = useState(() => new VirtualFs(USER, binNames));
  const os = useMemo(() => createShellOs(windowId), [windowId]);
  const startedAt = useRef(Date.now());

  const [lines, setLines] = useState<OutputLine[]>(() =>
    [
      [{ text: `${osConfig.name} gsh 1.0 (tty1)`, tone: 'dim' as const }],
      [{ text: `Last login: ${new Date().toString().slice(0, 24)} on ttys000`, tone: 'dim' as const }],
      '',
      ...fs.read('/etc/motd').trim().split('\n'),
      '',
    ].map(toOutput),
  );
  const [live, setLive] = useState<OutputLine[] | null>(null);
  const [cwd, setCwdState] = useState(fs.home);
  const cwdRef = useRef(fs.home);
  const [input, setInput] = useState('');
  const [running, setRunning] = useState(false);

  const history = useRef<string[]>([]);
  const historyIndex = useRef<number | null>(null);
  const aborted = useRef(false);
  const keys = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useWindowTitle(windowId, `${USER}@${HOST}: ${fs.display(cwd)}`);

  // ---------- Output ----------

  const print = useCallback((...out: Line[]) => {
    setLines((prev) => [...prev, ...out.map(toOutput)].slice(-MAX_LINES));
  }, []);

  const prompt = useCallback(
    (path: string): Segment[] => [
      { text: `${USER}@${HOST}`, tone: 'green' },
      { text: ':' },
      { text: fs.display(path), tone: 'blue' },
      { text: '$ ' },
    ],
    [fs],
  );

  // Always scroll to the bottom
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, live, running]);

  // Refocus the input after a command
  useEffect(() => {
    if (!running) inputRef.current?.focus({ preventScroll: true });
    else rootRef.current?.focus({ preventScroll: true });
  }, [running]);

  // ---------- Execution ----------

  const env = useMemo<ShellEnv>(
    () => ({
      getCwd: () => cwdRef.current,
      setCwd: (path) => {
        cwdRef.current = path;
        setCwdState(path);
      },
      fs,
      print,
      live: (out) => setLive(out ? out.map(toOutput) : null),
      clear: () => setLines([]),
      sleep: (ms) =>
        new Promise<void>((resolve, reject) => {
          window.setTimeout(() => (aborted.current ? reject(new InterruptError()) : resolve()), ms);
        }),
      history: history.current,
      commands,
      os,
      user: USER,
      host: HOST,
      startedAt: startedAt.current,
    }),
    [fs, os, print],
  );

  const run = useCallback(
    async (raw: string) => {
      print([...prompt(cwdRef.current), { text: raw }]);
      if (!raw.trim()) return;
      history.current.push(raw);
      historyIndex.current = null;
      aborted.current = false;
      setRunning(true);
      try {
        await execute(raw, env);
      } catch (error) {
        if (!(error instanceof InterruptError)) throw error;
        print([{ text: '^C', tone: 'dim' }]);
      } finally {
        setLive(null);
        setRunning(false);
      }
    },
    [env, print, prompt],
  );

  // ---------- Keyboard ----------

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // Konami code: ↑↑↓↓←→←→BA
    keys.current = [...keys.current, e.key].slice(-KONAMI.length);
    if (keys.current.join() === KONAMI.join()) {
      keys.current = [];
      e.preventDefault();
      setInput('');
      void run('konami');
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      if (running) aborted.current = true;
      else {
        print([...prompt(cwdRef.current), { text: input }, { text: '^C', tone: 'dim' }]);
        setInput('');
      }
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
      return;
    }
    if (running) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input;
      setInput('');
      void run(value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const list = history.current;
      if (!list.length) return;
      const current = historyIndex.current ?? list.length;
      const next = Math.min(list.length, Math.max(0, current + (e.key === 'ArrowUp' ? -1 : 1)));
      historyIndex.current = next === list.length ? null : next;
      setInput(list[next] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const result = complete(input, cwdRef.current, fs);
      if (result.options.length) print([...prompt(cwdRef.current), { text: input }], result.options.join('   '));
      setInput(result.value);
    }
  };

  return {
    rootRef,
    scrollRef,
    inputRef,
    lines,
    live,
    running,
    input,
    setInput,
    promptSegments: prompt(cwd),
    onKeyDown,
    focusInput: () => {
      // Don't lose selected text (copying must stay possible)
      if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
    },
  };
}
