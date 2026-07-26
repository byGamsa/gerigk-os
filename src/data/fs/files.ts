import type { VirtualFile } from '@/types';

// Virtual file system contents (placeholders) – new file: add an object, `folder` decides placement

const readmeDe = `Hallo 👋

Du hast tatsächlich im Papierkorb gewühlt – Respekt.

Das hier ist mein Portfolio, gebaut wie ein kleines Betriebssystem.
Alles, was du siehst, sind Apps: Fenster lassen sich verschieben,
in der Größe ändern, maximieren, minimieren und schließen.
Die Desktop-Symbole kannst du frei anordnen – deine Anordnung
wird gespeichert.

Ein paar Tipps:
  • Doppelklick auf ein Symbol öffnet die App
  • Klick auf eine aktive App in der Taskleiste minimiert sie
  • Fenster an den oberen Rand ziehen → maximieren
  • „DEU“ unten rechts → English, please
  • Uhrzeit in der Taskleiste → Kalender
  • Rechtsklick auf den Desktop → Kontextmenü

Viel Spaß beim Stöbern!
`;

const readmeEn = `Hi there 👋

You actually went digging through the recycle bin – respect.

This is my portfolio, built like a tiny operating system.
Everything you see is an app: windows can be moved, resized,
maximized, minimized and closed. You can arrange the desktop
icons however you like – your layout is saved.

A few tips:
  • Double-click an icon to open the app
  • Click an active app in the taskbar to minimize it
  • Drag a window to the top edge → maximize
  • "ENG" in the bottom right → auf Deutsch, bitte
  • Clock in the taskbar → calendar
  • Right-click the desktop → context menu

Enjoy looking around!
`;

export const files: readonly VirtualFile[] = [
  {
    id: 'trash-readme',
    folder: 'trash',
    kind: 'text',
    name: { de: 'lies-mich.txt', en: 'read-me.txt' },
    content: { de: readmeDe, en: readmeEn },
    originalPath: { de: 'C:\Benutzer\Gast\Desktop', en: 'C:\Users\Guest\Desktop' },
    modifiedAt: '2026-05-20T16:02:00',
    deletedAt: '2026-05-26T11:47:00',
  },
];
