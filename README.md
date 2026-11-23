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

## Hintergrund (Unsplash-Fotos, selbst gehostet)

Bei jedem Laden erscheint ein zufälliges Foto aus einer kuratierten Auswahl (nie zweimal dasselbe
hintereinander), in passender Auflösung (1280–3840 px, AVIF mit WebP-Fallback), unten links mit
Fotografen-Nennung und Link zum Foto. Es gibt **keine Unsplash-API und keinen Key im Browser**: Die
Fotos werden einmalig über den normalen Unsplash-Download geladen (Unsplash-Lizenz erlaubt Selbst-Hosting)
und vom eigenen Server unter `/wallpapers` ausgeliefert.

1. Fotos in `src/config/wallpapers.manifest.json` pflegen (`id` aus `unsplash.com/photos/<slug>-<id>`, Name, Username)
2. `npm run wallpapers:sync -- --local` – lädt neue Fotos herunter, konvertiert sie nach `public/wallpapers/`
   und schreibt `src/data/wallpapers.generated.json` (committen). `--refresh` kodiert alle neu.
3. `public/wallpapers/` ist nicht im Repo (Größe) und wird zum Server kopiert (siehe Deployment).

Alternativ lädt `npm run wallpapers:sync` ohne `--local` in einen Supabase-Storage-Bucket
(`supabase/migrations/20261123120000_wallpapers_bucket.sql`, `SUPABASE_SECRET_KEY` in `.env.local`).

Ohne Fotos, ohne Netz oder bei einem Fehler ist der Hintergrund neutral grau.
Rechtsklick auf den Desktop → „Neuer Hintergrund“.

## Deployment (larsgerigk.de)

Docker-Image: Node baut die Seite, Caddy liefert sie aus und holt automatisch HTTPS-Zertifikate
(`Dockerfile`, `deploy/Caddyfile`, `docker-compose.yml`). Auf dem Server liegt das Repo in `~/gerigk-os` mit
einer `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) und dem Ordner `wallpapers/`.

```bash
# Hintergrundbilder (nur bei Änderungen) vom Entwicklungsrechner hochladen
scp -r public/wallpapers/. gamsa@85.215.71.124:~/gerigk-os/wallpapers/

# Auf dem Server: neuen Stand bauen und starten
cd ~/gerigk-os && git pull && docker compose up -d --build
```

## Anpassen

- **Name / Wallpaper:** `src/config/os.config.ts` (eigenes Foto z. B. als `public/wallpaper.jpg`)
- **Impressum & Datenschutz:** `src/config/legal.config.ts` (Pflichtangaben inkl. Hosting-Anbieter – solange Platzhalter drin sind, warnt das Einstellungen-Fenster). Texte der Datenschutzerklärung: `src/apps/System/privacy.content.ts` – bei neuen Drittanbietern ergänzen!
- **Über mich:** `src/apps/About/about.content.ts`
- **Gästebuch (Supabase):** Migration `supabase/migrations/`, Edge Function `supabase/functions/guestbook-submit` (Filter + KI-Moderation), Keys `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local`
- **Browser (Startseite, Lesezeichen, bekannte Seiten):** `src/config/browser.config.ts`
- **Terminal-Befehle:** `src/apps/Terminal/shell/commands/` (`core` · `system` · `fun` für Easter Eggs mit `hidden: true`)
- **Dateien im Explorer** (Dokumente, Downloads, Papierkorb …): `src/data/fs/files.ts`
- **Texte:** `src/i18n/de.ts` + `src/i18n/en.ts`
- **Farben, Radien, Schatten, Glas-Effekt:** `tailwind.config.ts`
