import { allNames, findCommand } from './commands';
import { distance, parseLine } from './parser';
import { InterruptError, type Line, type ShellContext } from './shell.types';
import { FsError } from './vfs';

// Environment the terminal provides once per session
export type ShellEnv = Omit<ShellContext, 'args' | 'name' | 'cwd'> & { getCwd: () => string };

export const lineText = (line: Line) => (typeof line === 'string' ? line : line.map((s) => s.text).join(''));

// Find the most similar known command ("Did you mean …?")
function suggest(name: string): string | null {
  let best: string | null = null;
  let bestDist = 3;
  for (const candidate of allNames) {
    const d = distance(name, candidate);
    if (d < bestDist) {
      best = candidate;
      bestDist = d;
    }
  }
  return best;
}

// Runs an input line (`&&`, `;`, `>`, `>>`); returns the last exit code, Ctrl+C throws InterruptError
export async function execute(input: string, env: ShellEnv): Promise<number> {
  const parsed = parseLine(input);
  let status = 0;

  for (let i = 0; i < parsed.length; i++) {
    const command = parsed[i]!;
    if (i > 0 && parsed[i - 1]!.next === '&&' && status !== 0) continue;

    const [name = '', ...args] = command.argv;
    const def = findCommand(name);
    if (!def) {
      const hint = suggest(name);
      env.print([{ text: `gsh: command not found: ${name}`, tone: 'red' }]);
      if (hint) env.print([{ text: env.t({ de: 'Meintest du: ', en: 'Did you mean: ' }), tone: 'dim' }, { text: hint, tone: 'green' }, { text: '?', tone: 'dim' }]);
      status = 127;
      continue;
    }

    // Redirect: collect output instead of displaying it
    const buffer: string[] = [];
    const print: ShellContext['print'] = command.redirect ? (...lines) => lines.forEach((l) => buffer.push(lineText(l))) : env.print;
    const ctx: ShellContext = { ...env, name, args, cwd: env.getCwd(), print };

    try {
      status = (await def.run(ctx)) ?? 0;
    } catch (error) {
      if (error instanceof InterruptError) throw error;
      env.print([{ text: `${name}: ${error instanceof Error ? error.message : String(error)}`, tone: 'red' }]);
      status = 1;
    }

    if (command.redirect) {
      try {
        env.fs.write(env.fs.resolve(env.getCwd(), command.redirect.path), buffer.map((l) => `${l}\n`).join(''), command.redirect.append);
      } catch (error) {
        if (!(error instanceof FsError)) throw error;
        env.print([{ text: `gsh: ${command.redirect.path}: ${error.message}`, tone: 'red' }]);
        status = 1;
      }
    }
  }
  return status;
}
