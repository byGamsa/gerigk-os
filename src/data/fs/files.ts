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

Lars Gerigk
Full-Stack-Entwickler und Student der Medieninformatik
an der Hochschule der Medien Stuttgart

Web ......... larsgerigk.de
E-Mail ...... larsgerigk@gmx.de
GitHub ...... github.com/byGamsa
LinkedIn .... linkedin.com/in/lars-gerigk


BERUFSERFAHRUNG
---------------
11/2026 – heute   Mitgründer – Dendree GbR, Stuttgart
                  Web-Plattformen, Apps und KI-Werkzeuge für Unternehmen.
                  Frontend und Backend (Next.js, FastAPI, Supabase),
                  Server-Infrastruktur mit Terraform und Docker.

03/2025 – heute   Full-Stack-Webentwickler – Mercedes-Benz AG, Böblingen
                  Zentrale Webanwendung für die digitale Nachrüstung von
                  Sonderausstattungen: Frontend, Backend, Abrechnungssystem
                  und Anbindung interner Schnittstellen.

11/2023 – heute   Portfolio Manager – Nextise GmbH, Stuttgart
                  Softwareschulungen konzipieren und halten, ein Team von
                  Entwicklern leiten, Kunden wie Volkswagen AG, TÜV Nord
                  und Universität Stuttgart.

09/2024 – 08/2025 Studentische Hilfskraft – Hochschule der Medien
                  Unterstützung in der Lehre mit Python.


AUSBILDUNG
----------
ab 03/2027        M.Sc. Computer Science and Media (geplant)
                  Hochschule der Medien, Stuttgart

03/2023 – heute   B.Sc. Medieninformatik – Hochschule der Medien, Stuttgart
                  Schwerpunkte: Künstliche Intelligenz, Virtual Reality,
                  Webentwicklung, Datenbank- und Anwendungsentwicklung.

01/2014 – 07/2022 Allgemeine Hochschulreife – Albertus-Magnus-Gymnasium
                  Schwerpunkte Mathematik und Informatik; SMV, KSJ,
                  Schülersprecher, Schulkonferenz.


EHRENAMT
--------
04/2017 – 03/2023 Jugendleiter – Katholische Studierende Jugend, Stuttgart
seit 2019         Betreuer – UNICEF-Kinderspielstadt Stutengarten


AUSZEICHNUNGEN
--------------
05/2021           Finalist bei Jugend gründet (BMBF)
                  18. Platz unter bundesweit 3.726 Teilnehmenden
08/2023           Python-Grundkurs – Coding Academy
                  (IT-Designers-Sponsoring-Programm)


KENNTNISSE
----------
Sprachen ........ TypeScript · JavaScript · Python · Java · C#
Frontend ........ React · Next.js · Vue/Nuxt · Angular · React Native
Backend & Daten . FastAPI · Node.js · PostgreSQL · Supabase · MongoDB
DevOps .......... Docker · Terraform · GitHub Actions · Kubernetes · AWS
Sonstiges ....... Unity · Virtual Reality · Tauri
`;

const cvEn = `CURRICULUM VITAE
================

Lars Gerigk
Full-stack developer and computer science and media student
at Stuttgart Media University (HdM)

Web ......... larsgerigk.de
Email ....... larsgerigk@gmx.de
GitHub ...... github.com/byGamsa
LinkedIn .... linkedin.com/in/lars-gerigk


WORK EXPERIENCE
---------------
11/2026 – now     Co-founder – Dendree GbR, Stuttgart
                  Web platforms, apps and AI tools for businesses.
                  Frontend and backend (Next.js, FastAPI, Supabase),
                  server infrastructure with Terraform and Docker.

03/2025 – now     Full-stack web developer – Mercedes-Benz AG, Böblingen
                  Central web application for digitally retrofitting
                  optional equipment: frontend, backend, billing system
                  and integration of internal interfaces.

11/2023 – now     Portfolio manager – Nextise GmbH, Stuttgart
                  Designing and teaching software trainings, leading a
                  team of developers, clients such as Volkswagen AG,
                  TÜV Nord and the University of Stuttgart.

09/2024 – 08/2025 Student assistant – Stuttgart Media University
                  Teaching support with Python.


EDUCATION
---------
from 03/2027      M.Sc. Computer Science and Media (planned)
                  Stuttgart Media University

03/2023 – now     B.Sc. Computer Science and Media – Stuttgart Media University
                  Focus: artificial intelligence, virtual reality,
                  web development, database and application development.

01/2014 – 07/2022 Abitur (A levels) – Albertus-Magnus-Gymnasium, Stuttgart
                  Focus on mathematics and computer science; student
                  council, KSJ, student representative, school conference.


VOLUNTEERING
------------
04/2017 – 03/2023 Youth leader – Katholische Studierende Jugend, Stuttgart
since 2019        Supervisor – UNICEF children's play city Stutengarten


AWARDS
------
05/2021           Finalist at Jugend gründet (German Federal Ministry of
                  Education and Research) – 18th of 3,726 participants
08/2023           Python foundation course – Coding Academy
                  (IT-Designers sponsorship programme)


SKILLS
------
Languages ....... TypeScript · JavaScript · Python · Java · C#
Frontend ........ React · Next.js · Vue/Nuxt · Angular · React Native
Backend & data .. FastAPI · Node.js · PostgreSQL · Supabase · MongoDB
DevOps .......... Docker · Terraform · GitHub Actions · Kubernetes · AWS
Other ........... Unity · Virtual Reality · Tauri
`;

const projectsDe = `PROJEKTE
========
Alle Details, Bilder und Links: App „Projekte“ auf dem Desktop.

1. Gaia Protocol (2026)
   Koop-VR-Survival für zwei Spieler, gezeigt auf der gamescom 2026.
   Unity · C# · VR · Multiplayer

2. Stream Scheduler (2025 – 2026)
   Planungsplattform für Twitch-Creator als Microservice-Architektur.
   TypeScript · Next.js · Node.js · Keycloak · Kubernetes

3. Pulse (2026)
   Audio-Visualizer in Echtzeit für Browser und Windows.
   React · three.js · Tauri

4. Gerigk OS (2026)
   Dieses Portfolio – ein Desktop im Browser.
   React · TypeScript · Tailwind CSS · Zustand

5. Software Defined Infrastructure (2025 – 2026)
   Infrastructure as Code mit Terraform in der Hetzner Cloud.

6. Waste Classifier (2025 – 2026)
   Bilderkennung für die richtige Tonne, PyTorch + Transfer Learning.

7. DataBack (2024 – 2025)
   CLI-Tool für inkrementelle PostgreSQL-Backups in Java.

8. Sipster (2024)
   Community-App für Spieleabende mit React Native und Node.js.

9. Dendree (seit 2026)
   Meine Softwarefirma – Web-Plattformen, Apps und KI-Werkzeuge.
   Next.js · FastAPI · Supabase · Terraform · Docker · dendree.de

10. Depth of Heritage (WS 2024/25)
    VR-Survival-Horror in einer Mine, Vorläufer von Gaia Protocol.
    Unity 6 · C# · VR · Multiplayer
`;

const projectsEn = `PROJECTS
========
All details, images and links: the "Projects" app on the desktop.

1. Gaia Protocol (2026)
   Co-op VR survival for two players, shown at gamescom 2026.
   Unity · C# · VR · Multiplayer

2. Stream Scheduler (2025 – 2026)
   Planning platform for Twitch creators built as microservices.
   TypeScript · Next.js · Node.js · Keycloak · Kubernetes

3. Pulse (2026)
   Real-time audio visualizer for the browser and Windows.
   React · three.js · Tauri

4. Gerigk OS (2026)
   This portfolio – a desktop in the browser.
   React · TypeScript · Tailwind CSS · Zustand

5. Software Defined Infrastructure (2025 – 2026)
   Infrastructure as code with Terraform in the Hetzner Cloud.

6. Waste Classifier (2025 – 2026)
   Image recognition for the right bin, PyTorch + transfer learning.

7. DataBack (2024 – 2025)
   CLI tool for incremental PostgreSQL backups in Java.

8. Sipster (2024)
   Community app for game nights with React Native and Node.js.

9. Dendree (since 2026)
   My software company – web platforms, apps and AI tools.
   Next.js · FastAPI · Supabase · Terraform · Docker · dendree.de

10. Depth of Heritage (winter 2024/25)
    VR survival horror in a mine, precursor of Gaia Protocol.
    Unity 6 · C# · VR · Multiplayer
`;

const ideasDe = `Ideen für neue Apps auf diesem Desktop
--------------------------------------
[x] Projekt-Galerie mit Screenshots
[x] Terminal mit ein paar versteckten Befehlen
[ ] Kleines Spiel für den „Spiele“-Ordner
[x] Musik-Player
[x] Explorer
`;

const ideasEn = `Ideas for new apps on this desktop
----------------------------------
[x] Project gallery with screenshots
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
    modifiedAt: '2026-11-23T18:48:00',
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
