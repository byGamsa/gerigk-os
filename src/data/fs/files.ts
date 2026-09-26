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

const cvDe = `LEBENSLAUF
==========

Name ........ Gerigk
Rolle ....... Entwickler · Designer

Ausbildung
  • [Hochschule / Studiengang]
  • [Schule / Abschluss]

Erfahrung
  • [Position] – [Firma], [Zeitraum]
  • [Position] – [Firma], [Zeitraum]

Skills
  TypeScript · React · Tailwind CSS · Unity · C# · XR · UI/UX

(Platzhalter – Inhalt in src/data/fs/files.ts anpassen)
`;

const cvEn = `CURRICULUM VITAE
================

Name ........ Gerigk
Role ........ Developer · Designer

Education
  • [University / programme]
  • [School / degree]

Experience
  • [Position] – [Company], [period]
  • [Position] – [Company], [period]

Skills
  TypeScript · React · Tailwind CSS · Unity · C# · XR · UI/UX

(Placeholder – edit the content in src/data/fs/files.ts)
`;

const projectsDe = `PROJEKTE
========

1. Gerigk OS
   Dieses Portfolio – ein Desktop im Browser mit Fenstern, Taskleiste,
   Explorer, Musik-Player und zufälligen Unsplash-Hintergründen.
   React · TypeScript · Tailwind CSS · Zustand

2. [Projektname]
   [Kurzbeschreibung, Rolle, Technologien]

3. [Projektname]
   [Kurzbeschreibung, Rolle, Technologien]
`;

const projectsEn = `PROJECTS
========

1. Gerigk OS
   This portfolio – a desktop in the browser with windows, taskbar,
   explorer, music player and random Unsplash wallpapers.
   React · TypeScript · Tailwind CSS · Zustand

2. [Project name]
   [Short description, role, technologies]

3. [Project name]
   [Short description, role, technologies]
`;

const ideasDe = `Ideen für neue Apps auf diesem Desktop
--------------------------------------
[ ] Projekt-Galerie mit Screenshots
[x] Terminal mit ein paar versteckten Befehlen
[ ] Kleines Spiel für den „Spiele“-Ordner
[x] Musik-Player
[x] Explorer
`;

const ideasEn = `Ideas for new apps on this desktop
----------------------------------
[ ] Project gallery with screenshots
[x] Terminal with a few hidden commands
[ ] A small game for the "Games" menu
[x] Music player
[x] Explorer
`;

const notAVirusDe = `Keine Sorge – das hier ist wirklich nur eine Textdatei. 😄

Aber schön, dass du so neugierig bist. Schau doch mal in den Papierkorb …
`;

const notAVirusEn = `Don't worry – this really is just a text file. 😄

But nice that you're this curious. Have a look in the recycle bin …
`;

export const files: readonly VirtualFile[] = [
  {
    id: 'doc-cv',
    folder: 'documents',
    kind: 'text',
    name: { de: 'Lebenslauf.txt', en: 'CV.txt' },
    content: { de: cvDe, en: cvEn },
    modifiedAt: '2026-09-20T10:12:00',
  },
  {
    id: 'doc-projects',
    folder: 'documents',
    kind: 'text',
    name: { de: 'Projekte.txt', en: 'Projects.txt' },
    content: { de: projectsDe, en: projectsEn },
    modifiedAt: '2026-09-24T18:40:00',
  },
  {
    id: 'doc-ideas',
    folder: 'documents',
    kind: 'text',
    name: { de: 'Ideen.txt', en: 'Ideas.txt' },
    content: { de: ideasDe, en: ideasEn },
    modifiedAt: '2026-09-26T21:05:00',
  },
  {
    id: 'dl-not-a-virus',
    folder: 'downloads',
    kind: 'text',
    name: { de: 'definitiv-kein-virus.exe.txt', en: 'definitely-not-a-virus.exe.txt' },
    content: { de: notAVirusDe, en: notAVirusEn },
    modifiedAt: '2026-09-12T09:30:00',
  },
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
