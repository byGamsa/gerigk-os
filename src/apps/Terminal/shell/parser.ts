// A single command within a line, e.g. `echo hi > greeting.txt`
export interface ParsedCommand {
  argv: string[];
  redirect: { path: string; append: boolean } | null;
  // How the next command is chained: `&&` only on success, `;` always
  next: '&&' | ';' | null;
}

type Token = { value: string; op: boolean };

// Splits input into words and operators; handles '…', "…" and \ escapes
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let current = '';
  let hasWord = false;
  let quote: '"' | "'" | null = null;

  const push = () => {
    if (hasWord) tokens.push({ value: current, op: false });
    current = '';
    hasWord = false;
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i]!;
    if (quote) {
      if (ch === quote) quote = null;
      else if (ch === '\\' && quote === '"' && i + 1 < input.length) current += input[++i];
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      hasWord = true;
    } else if (ch === '\\' && i + 1 < input.length) {
      current += input[++i];
      hasWord = true;
    } else if (/\s/.test(ch)) {
      push();
    } else if (ch === '&' && input[i + 1] === '&') {
      push();
      tokens.push({ value: '&&', op: true });
      i++;
    } else if (ch === ';') {
      push();
      tokens.push({ value: ';', op: true });
    } else if (ch === '>') {
      push();
      const append = input[i + 1] === '>';
      tokens.push({ value: append ? '>>' : '>', op: true });
      if (append) i++;
    } else {
      current += ch;
      hasWord = true;
    }
  }
  push();
  return tokens;
}

// Splits a line into individual commands with redirects and chaining
export function parseLine(input: string): ParsedCommand[] {
  const commands: ParsedCommand[] = [];
  let current: ParsedCommand = { argv: [], redirect: null, next: null };
  const tokens = tokenize(input);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;
    if (token.op && (token.value === '&&' || token.value === ';')) {
      current.next = token.value;
      if (current.argv.length) commands.push(current);
      current = { argv: [], redirect: null, next: null };
    } else if (token.op) {
      const target = tokens[i + 1];
      if (target && !target.op) {
        current.redirect = { path: target.value, append: token.value === '>>' };
        i++;
      }
    } else {
      current.argv.push(token.value);
    }
  }
  if (current.argv.length) commands.push(current);
  return commands;
}

// `-la file` → flags {l, a}, rest ['file'] · `--all` → flag 'all'
export function parseFlags(args: readonly string[]): { flags: Set<string>; rest: string[] } {
  const flags = new Set<string>();
  const rest: string[] = [];
  for (const arg of args) {
    if (arg.startsWith('--') && arg.length > 2) flags.add(arg.slice(2));
    else if (arg.startsWith('-') && arg.length > 1 && !/^-\d/.test(arg)) [...arg.slice(1)].forEach((f) => flags.add(f));
    else rest.push(arg);
  }
  return { flags, rest };
}

// Levenshtein distance – for "Did you mean …?"
export function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length]![b.length]!;
}
