import type { LocalizedValue } from '@/types';
import type { VirtualFs } from './vfs';

// Color/style of a text segment in the terminal
export type Tone = 'default' | 'dim' | 'bold' | 'green' | 'red' | 'yellow' | 'blue' | 'magenta' | 'cyan';

export interface Segment {
  text: string;
  tone?: Tone;
}

// An output line: plain text or colored segments
export type Line = string | Segment[];

export interface OutputLine {
  id: number;
  segments: Segment[];
}

// What a command may use from the OS
export interface ShellOs {
  launch: (appId: string, args?: unknown) => boolean;
  closeTerminal: () => void;
  lang: () => 'de' | 'en';
  setLang: (lang: 'de' | 'en') => void;
  windows: () => { pid: number; id: string; appId: string; title: string; status: string }[];
  killWindow: (id: string) => void;
  nextWallpaper: () => void;
  restart: () => void;
  music: {
    isReady: () => boolean;
    togglePlay: () => void;
    next: () => void;
    previous: () => void;
    nowPlaying: () => string | null;
  };
}

export interface ShellContext {
  // Arguments without the command name
  args: string[];
  // Name the command was invoked with
  name: string;
  cwd: string;
  setCwd: (path: string) => void;
  fs: VirtualFs;
  print: (...lines: Line[]) => void;
  // Text in the current system language
  t: (value: LocalizedValue) => string;
  // Live area below the output (for animations); `null` clears it
  live: (lines: Line[] | null) => void;
  clear: () => void;
  // Waits – aborts with an error on Ctrl+C
  sleep: (ms: number) => Promise<void>;
  history: readonly string[];
  commands: readonly Command[];
  os: ShellOs;
  user: string;
  host: string;
  startedAt: number;
}

export interface Command {
  name: string;
  aliases?: string[];
  summary: LocalizedValue;
  usage?: string;
  // Don't list in `help` (easter eggs)
  hidden?: boolean;
  // Return value = exit code (default 0)
  run: (ctx: ShellContext) => void | number | Promise<void | number>;
}

// Thrown by `sleep` when the user presses Ctrl+C
export class InterruptError extends Error {
  constructor() {
    super('^C');
    this.name = 'InterruptError';
  }
}
