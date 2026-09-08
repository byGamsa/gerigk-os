import { desktopApps } from "@/apps/registry";
import { osConfig } from "@/config/os.config";
import { entriesIn } from "@/data/fileSystem";
import { resolveLocalized } from "@/i18n";
import { useOsStore } from "@/store/os.store";
import type { FolderId } from "@/types";

export interface FsNode {
  name: string;
  kind: 'dir' | 'file';
  children?: Map<string, FsNode>;
  // Content is generated on every read (e.g. follows the language)
  content?: () => string;
  // System file – cannot be deleted/overwritten
  readonly: boolean;
  // Text file from the explorer → `open` launches the editor
  fileId?: string;
  // Shortcut → `open` launches the app
  appId?: string;
  modifiedAt: Date;
}

export class FsError extends Error {}

const lang = () => useOsStore.getState().lang;

const dir = (name: string, readonly = true): FsNode => ({ name, kind: 'dir', children: new Map(), readonly, modifiedAt: new Date() });
const file = (name: string, content: () => string, extra: Partial<FsNode> = {}): FsNode => ({
  name,
  kind: 'file',
  content,
  readonly: true,
  modifiedAt: new Date(),
  ...extra,
});

const add = (parent: FsNode, node: FsNode) => {
  parent.children!.set(node.name, node);
  return node;
};

// Explorer folders → Unix directories in home
const HOME_FOLDERS: Record<Exclude<FolderId, 'desktop'>, string> = {
  documents: 'Documents',
  downloads: 'Downloads',
  pictures: 'Pictures',
  trash: '.Trash',
};

const BASH_HISTORY = `cd ~/Documents
vim Lebenslauf.txt
:q
:q!
:wq
how to exit vim
sudo rm -rf node_modules && npm install
git commit -m "final"
git commit -m "final final"
git commit -m "final final v2 (really)"
git push --force   # sorry
`;

const SECRET = `
  Psst … du hast eine versteckte Datei gefunden. 🕵️

  Ein paar Befehle, die in keiner Hilfe stehen:
    sl · cowsay · fortune · matrix · hack · coffee · vim · 42
    sudo make me a sandwich · make love · rm -rf /

  Und probier mal den Konami-Code im Terminal: ↑ ↑ ↓ ↓ ← → ← → B A
`;

const MOTD = () =>
  lang() === 'de'
    ? `Willkommen bei ${osConfig.name}! Tipp: 'help' zeigt alle Befehle, 'ls -a' auch versteckte Dateien.\n`
    : `Welcome to ${osConfig.name}! Tip: 'help' lists all commands, 'ls -a' shows hidden files too.\n`;

// Virtual file system of a terminal session
export class VirtualFs {
  readonly root: FsNode = dir('');
  readonly home: string;

  constructor(user: string, commandNames: readonly string[]) {
    this.home = `/home/${user}`;
    const { root } = this;

    const bin = add(root, dir('bin'));
    commandNames.forEach((name) => add(bin, file(name, () => `\u0000ELF binary – ${name}: sieht gut aus, lässt sich aber nicht lesen 😉\n`)));

    const etc = add(root, dir('etc'));
    add(etc, file('motd', MOTD));
    add(etc, file('hostname', () => `${osConfig.name.toLowerCase().replace(/\s+/g, '-')}\n`));
    add(etc, file('os-release', () => `NAME="${osConfig.name}"\nVERSION="${__APP_VERSION__}"\nPRETTY_NAME="${osConfig.name} ${__APP_VERSION__} (Liquid Glass)"\nHOME_URL="https://${location.host}"\n`));
    add(etc, file('passwd', () => `root:x:0:0:root:/root:/bin/gsh\n${user}:x:1000:1000:${osConfig.owner}:/home/${user}:/bin/gsh\nnobody:x:65534:65534:Niemand, wirklich niemand:/nonexistent:/usr/sbin/nologin\n`));
    add(etc, file('shadow', () => {
      throw new FsError('Permission denied (netter Versuch)');
    }));

    add(root, dir('tmp', false));
    const homeDir = add(add(root, dir('home')), dir(user));

    // Desktop: shortcuts to desktop apps
    const desktop = add(homeDir, dir('Desktop', false));
    desktopApps.forEach((app) => {
      const name = `${resolveLocalized(lang(), app.title).replace(/\s+/g, '-')}.desktop`;
      add(desktop, file(name, () => `[Desktop Entry]\nType=Application\nName=${resolveLocalized(lang(), app.title)}\nExec=open ${app.id}\n`, { appId: app.id }));
    });

    // Documents, Downloads, Pictures, Trash from the explorer
    (Object.entries(HOME_FOLDERS) as [Exclude<FolderId, 'desktop'>, string][]).forEach(([folder, name]) => {
      const node = add(homeDir, dir(name, false));
      entriesIn(folder).forEach((entry) => {
        if (entry.kind !== 'text') return;
        add(
          node,
          file(resolveLocalized(lang(), entry.name), () => resolveLocalized(lang(), entry.content), {
            fileId: entry.id,
            modifiedAt: new Date(entry.modifiedAt),
          }),
        );
      });
    });

    add(homeDir, file('.bash_history', () => BASH_HISTORY));
    add(homeDir, file('.secret', () => SECRET));
    homeDir.readonly = false;
  }

  // ---------- Paths ----------

  // Absolute, normalized path (understands ~, ., ..)
  resolve(cwd: string, path = '~'): string {
    let full = path.startsWith('~') ? this.home + path.slice(1) : path.startsWith('/') ? path : `${cwd}/${path}`;
    const parts: string[] = [];
    for (const part of full.split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') parts.pop();
      else parts.push(part);
    }
    full = `/${parts.join('/')}`;
    return full;
  }

  // Display with ~ instead of /home/<user>
  display(abs: string): string {
    return abs === this.home || abs.startsWith(`${this.home}/`) ? `~${abs.slice(this.home.length)}` : abs;
  }

  get(abs: string): FsNode | undefined {
    let node: FsNode | undefined = this.root;
    for (const part of abs.split('/').filter(Boolean)) {
      node = node?.children?.get(part);
      if (!node) return undefined;
    }
    return node;
  }

  private parentOf(abs: string): { parent: FsNode; name: string } {
    const idx = abs.lastIndexOf('/');
    const parent = this.get(abs.slice(0, idx) || '/');
    const name = abs.slice(idx + 1);
    if (!parent || parent.kind !== 'dir') throw new FsError('No such file or directory');
    return { parent, name };
  }

  // ---------- Reading & writing ----------

  read(abs: string): string {
    const node = this.get(abs);
    if (!node) throw new FsError('No such file or directory');
    if (node.kind === 'dir') throw new FsError('Is a directory');
    return node.content?.() ?? '';
  }

  write(abs: string, text: string, append: boolean) {
    const existing = this.get(abs);
    if (existing?.kind === 'dir') throw new FsError('Is a directory');
    if (existing?.readonly) throw new FsError('Permission denied');
    const { parent, name } = this.parentOf(abs);
    if (!existing && parent.readonly) throw new FsError('Permission denied');
    const previous = existing && append ? (existing.content?.() ?? '') : '';
    const value = previous + text;
    parent.children!.set(name, { name, kind: 'file', content: () => value, readonly: false, modifiedAt: new Date() });
  }

  touch(abs: string) {
    const existing = this.get(abs);
    if (existing) {
      existing.modifiedAt = new Date();
      return;
    }
    this.write(abs, '', false);
  }

  mkdir(abs: string, parents: boolean) {
    if (this.get(abs)) {
      if (parents) return;
      throw new FsError('File exists');
    }
    if (parents) {
      const segments = abs.split('/').filter(Boolean);
      segments.forEach((_, i) => {
        const path = `/${segments.slice(0, i + 1).join('/')}`;
        if (!this.get(path)) this.mkdir(path, false);
      });
      return;
    }
    const { parent, name } = this.parentOf(abs);
    if (parent.readonly) throw new FsError('Permission denied');
    parent.children!.set(name, dir(name, false));
  }

  remove(abs: string, recursive: boolean) {
    const node = this.get(abs);
    if (!node) throw new FsError('No such file or directory');
    if (node.kind === 'dir' && !recursive) throw new FsError('Is a directory');
    if (node.readonly || (node.kind === 'dir' && hasReadonly(node))) throw new FsError('Permission denied');
    const { parent, name } = this.parentOf(abs);
    parent.children!.delete(name);
  }

  // Directory entries, sorted (directories first)
  list(abs: string): FsNode[] {
    const node = this.get(abs);
    if (!node) throw new FsError('No such file or directory');
    if (node.kind === 'file') return [node];
    return [...node.children!.values()].sort((a, b) =>
      a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'dir' ? -1 : 1,
    );
  }
}

function hasReadonly(node: FsNode): boolean {
  return node.readonly || [...(node.children?.values() ?? [])].some(hasReadonly);
}
