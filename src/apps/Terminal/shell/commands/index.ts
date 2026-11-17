import type { Command } from '../shell.types';
import { adminCommands } from './admin';
import { coreCommands } from './core';
import { funCommands } from './fun';
import { systemCommands } from './system';

// All shell commands. New command: add it in core/system/fun (or hook up a new file here).
export const commands: readonly Command[] = [...coreCommands, ...systemCommands, ...funCommands, ...adminCommands];

export const findCommand = (name: string) => commands.find((c) => c.name === name || c.aliases?.includes(name));

// Visible commands – listed as "binaries" in /bin (easter eggs stay secret)
export const binNames = commands.filter((c) => !c.hidden).map((c) => c.name);

// All callable names incl. aliases – for tab completion
export const allNames = commands.filter((c) => !c.hidden).flatMap((c) => [c.name, ...(c.aliases ?? [])]);
