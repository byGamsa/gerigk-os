# Gerigk OS – Portfolio

Ein Portfolio, das sich wie ein Desktop-Betriebssystem bedient – im Liquid-Glass-Look.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 3 (`tailwind.config.ts`) · Zustand

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typecheck + Produktions-Build nach dist/
```

## Struktur

```
src/
├─ apps/                 # Apps (je Ordner: Komponente, Hook, Styles, Typen, index.ts)
│  ├─ registry.ts        # ← hier werden Apps registriert
│  ├─ defineApp.ts
│  ├─ RecycleBin/  Notepad/  About/
├─ components/           # OS-Oberfläche, je Komponente:
│  └─ Window/            #   Window.tsx        → Markup
│                        #   useWindow.ts      → Logik
│                        #   Window.styles.ts  → Tailwind-Klassen (Design)
│                        #   Window.types.ts   → Typen
├─ config/               # layout.ts (von Tailwind UND Logik genutzt), os.config.ts
├─ data/                 # virtuelles Dateisystem (Inhalt des Papierkorbs)
├─ hooks/                # useT, useNow, useSystemStatus, usePresence …
├─ i18n/                 # de.ts definiert alle Keys, en.ts wird dagegen typgeprüft
├─ lib/                  # reine Funktionen: Raster, Geometrie, Formatierung
├─ services/launcher.ts  # App starten, Taskleisten-Klick-Logik
├─ store/                # Zustand-Store in Slices (Fenster, Desktop, UI, Settings)
├─ styles/tokens.ts      # gemeinsame Tailwind-Rezepte
└─ types/                # globale Typen
```

## Neue App hinzufügen

1. Ordner `src/apps/MeineApp/` anlegen mit `MeineApp.tsx`, `MeineApp.styles.ts`, optional `useMeineApp.ts` / `MeineApp.types.ts`.
2. In `src/apps/MeineApp/index.ts` definieren:

   ```ts
   export const meineApp = defineApp({
     id: 'meine-app',
     title: { de: 'Meine App', en: 'My App' },
     icon: 'folder',               // Name aus components/Icon/icons
     component: MeineApp,
     desktop: true,                // oder { col: 0, row: 1 } – negative Werte zählen vom Rand
     pinned: false,                // true = in der Taskleiste angeheftet
     category: 'portfolio',        // 'game' erscheint im „Spiele“-Menü
     window: { width: 720, height: 480 },
   });
   ```
3. In `src/apps/registry.ts` zum `apps`-Array hinzufügen.

Eigene Icons: eine Komponente in `components/Icon/icons/app.icons.tsx` ergänzen und in `appIcons` eintragen – der Name ist danach automatisch als `IconName` typisiert.

## Spotify

Die Musik-App zeigt eine öffentliche Spotify-Playlist und spielt die Songs **komplett über YouTube**
ab (offizielle YouTube IFrame API) – ohne Login, mit Lautstärke und Mute.

```bash
npm run playlist:sync -- https://open.spotify.com/playlist/<id>   # Playlist setzen + Daten laden
npm run playlist:sync                                            # neue Songs ergänzen
npm run playlist:sync -- --refresh                               # alle YouTube-Treffer neu suchen
```

Das Skript speichert die URL in `src/config/spotify.config.json` und schreibt Titel, Interpreten,
Dauer, Cover und passende YouTube-Videos nach `src/data/playlist.generated.json`. Gefundene Videos
bleiben gespeichert; gesucht wird nur für neue Songs. `npm run build` synchronisiert automatisch.

- **Treffer korrigieren:** `src/config/youtube.overrides.json` → `{ "<spotify-track-id>": "<youtube-video-id>" }`
- **Offizielle Suche statt Suchseite:** `YOUTUBE_API_KEY=…` in `.env.local` (YouTube Data API v3)

Wird das Fenster minimiert, erscheint unten links ein Mini-Player-Widget. Jede App kann über
`widget` in `defineApp` ein eigenes Widget bekommen.

## Hintergrund (Unsplash)

Bei jedem Laden erscheint ein zufälliges Unsplash-Foto in Bildschirmauflösung (inkl. Retina/4K,
passend zugeschnitten, AVIF/WebP), unten links mit Fotografen-Nennung und Link zum Foto.

1. Auf https://unsplash.com/oauth/applications eine App anlegen und den **Access Key** kopieren
2. `.env.example` nach `.env.local` kopieren und `VITE_UNSPLASH_ACCESS_KEY=…` eintragen
3. Dev-Server neu starten

Ohne Key (oder solange das Foto lädt) ist der Hintergrund neutral grau. Motiv, Qualität und Cache-Dauer: `src/config/wallpaper.config.ts`.
Es werden 30 Fotos pro API-Aufruf geladen und einige Stunden im Browser gecacht (Demo-Keys erlauben
nur 50 Aufrufe/Stunde). Rechtsklick auf den Desktop → „Neuer Hintergrund“.

## Anpassen

- **Name / Wallpaper:** `src/config/os.config.ts` (eigenes Foto z. B. als `public/wallpaper.jpg`)
- **Über mich:** `src/apps/About/about.content.ts`
- **Dateien im Explorer** (Dokumente, Downloads, Papierkorb …): `src/data/fs/files.ts`
- **Texte:** `src/i18n/de.ts` + `src/i18n/en.ts`
- **Farben, Radien, Schatten, Glas-Effekt:** `tailwind.config.ts`
