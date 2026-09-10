import { allNames } from './commands';
import type { VirtualFs } from './vfs';

export interface Completion {
  // New input (unchanged if nothing was completed)
  value: string;
  // Multiple matches → to display
  options: string[];
}

const commonPrefix = (words: string[]) =>
  words.reduce((prefix, w) => {
    let i = 0;
    while (i < prefix.length && i < w.length && prefix[i] === w[i]) i++;
    return prefix.slice(0, i);
  });

// Tab completion for commands (first word) and paths (all others)
export function complete(input: string, cwd: string, fs: VirtualFs): Completion {
  const lastSpace = input.lastIndexOf(' ');
  const head = input.slice(0, lastSpace + 1);
  const word = input.slice(lastSpace + 1);

  // First word → command
  if (!head.trim()) {
    const matches = [...new Set(allNames.filter((n) => n.startsWith(word)))].sort();
    if (matches.length === 1) return { value: `${matches[0]} `, options: [] };
    if (matches.length > 1) return { value: head + commonPrefix(matches), options: matches };
    return { value: input, options: [] };
  }

  // Otherwise → path
  const slash = word.lastIndexOf('/');
  const dirPart = slash >= 0 ? word.slice(0, slash + 1) : '';
  const prefix = word.slice(slash + 1);
  let entries;
  try {
    entries = fs.list(fs.resolve(cwd, dirPart || '.'));
  } catch {
    return { value: input, options: [] };
  }
  const matches = entries
    .filter((n) => n.name.startsWith(prefix) && (prefix.startsWith('.') || !n.name.startsWith('.')))
    .map((n) => (n.kind === 'dir' ? `${n.name}/` : n.name));

  if (matches.length === 1) {
    const match = matches[0]!;
    return { value: head + dirPart + match + (match.endsWith('/') ? '' : ' '), options: [] };
  }
  if (matches.length > 1) return { value: head + dirPart + commonPrefix(matches), options: matches };
  return { value: input, options: [] };
}
