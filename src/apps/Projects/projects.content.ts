import type { LocalizedValue } from '@/types';
import type { Project, ProjectCategory } from './Projects.types';

// Sources: own GitHub repos/READMEs and the shared team projects (texts rewritten, images self-hosted in `public/projects/`)
export const projects: readonly Project[] = [
  {
    slug: 'gaia-protocol',
    title: 'Gaia Protocol',
    tagline: { de: 'Koop-VR-Survival für zwei Spieler', en: 'Co-op VR survival for two players' },
    category: 'games',
    year: '2026',
    team: { de: '3 Dev · 3 Design · Sound', en: '3 dev · 3 design · sound' },
    status: { de: 'gamescom 2026', en: 'gamescom 2026' },
    cover: '/projects/gaia-protocol/cover.webp',
    iconImage: '/projects/gaia-protocol/icon.webp',
    accent: ['#3ad1c5', '#1a3a6b'],
    featured: true,
    description: {
      de: 'Ein kooperatives VR-Spiel für Steam und Meta Quest: Zu zweit steuert ihr von einer Raumstation im Orbit aus Kampfroboter – die Drifter – und schickt sie in verlassene Raketensilos auf der Erde. Entstanden als HdM-Teamprojekt, gezeigt auf der MediaNight und danach am RAW Talent Booth der gamescom 2026 in Köln.',
      en: 'A co-op VR game for Steam and Meta Quest: together you remote-control combat robots – the Drifters – from a space station in orbit and send them into abandoned rocket silos on Earth. Built as an HdM team project, shown at the MediaNight and then at the RAW Talent Booth at gamescom 2026 in Cologne.',
    },
    sections: [
      {
        heading: { de: 'Die Story', en: 'The story' },
        text: {
          de: 'Die KI E.V.E. sollte die Erde retten und hat stattdessen die Infrastruktur der Menschheit übernommen. Über das geheime „Gaia Protocol“ wurden Überlebende per Rakete auf eine Raumstation gebracht – Jahrzehnte später holen sie sich die Silos zurück.',
          en: 'The AI E.V.E. was meant to save Earth and took over humanity’s infrastructure instead. The secret “Gaia Protocol” flew survivors to a space station by rocket – decades later they are taking the silos back.',
        },
      },
      {
        heading: { de: 'Gameplay', en: 'Gameplay' },
        bullets: [
          { de: 'Kristalle für den Hyperantrieb der Station abbauen', en: 'Mine crystals for the station’s hyperdrive' },
          { de: 'Eingeschlossene Überlebende retten', en: 'Rescue trapped survivors' },
          { de: 'Alte Anlagen reaktivieren und Raketen starten', en: 'Reactivate old systems and launch rockets' },
          { de: 'KI-Gegnern ausweichen, die auf jede Bewegung reagieren', en: 'Evade AI enemies that react to every move' },
        ],
      },
      {
        heading: { de: 'Zwei Rollen, ein Team', en: 'Two roles, one team' },
        text: {
          de: 'Ein Spieler ist Mechaniker und knackt Schlösser, repariert und aktiviert Systeme, der andere ist Minenarbeiter und baut die Kristalle ab. Keiner kommt ohne den anderen weiter – alles läuft synchron im Multiplayer.',
          en: 'One player is the mechanic who cracks locks, repairs and powers up systems; the other is the miner who harvests the crystals. Neither gets far alone – everything runs in sync in multiplayer.',
        },
      },
    ],
    tags: ['Unity', 'C#', 'VR', 'Multiplayer', 'Meta Quest'],
    screenshots: [
      { src: '/projects/gaia-protocol/gameplay-corridor.webp', caption: { de: 'Korridor im Silo', en: 'Silo corridor' } },
      { src: '/projects/gaia-protocol/gameplay-crystal-harvest.webp', caption: { de: 'Kristalle abbauen', en: 'Harvesting crystals' } },
      { src: '/projects/gaia-protocol/gameplay-robot-encounter.webp', caption: { de: 'Begegnung mit einem Wachroboter', en: 'Robot encounter' } },
      { src: '/projects/gaia-protocol/rocket-view.webp', caption: { de: 'Blick auf die Rakete', en: 'Rocket view' } },
      { src: '/projects/gaia-protocol/gameplay-console.webp', caption: { de: 'Alte Anlagen reaktivieren', en: 'Reactivating old systems' } },
      { src: '/projects/gaia-protocol/gameplay-server-silo.webp', caption: { de: 'Server-Silo', en: 'Server silo' } },
      { src: '/projects/gaia-protocol/mechanic.webp', caption: { de: 'Der Mechaniker', en: 'The mechanic' } },
      { src: '/projects/gaia-protocol/miner.webp', caption: { de: 'Der Minenarbeiter', en: 'The miner' } },
      { src: '/projects/gaia-protocol/story.webp', caption: { de: 'Story-Artwork: die zerstörte Erde', en: 'Story artwork: the ruined Earth' } },
    ],
    links: [
      { kind: 'site', label: { de: 'Projektseite', en: 'Project page' }, href: 'https://dendree.com/de/products/gaia-protocol' },
      { kind: 'video', label: { de: 'Trailer auf YouTube', en: 'Trailer on YouTube' }, href: 'https://youtu.be/PVTPaY90tQo' },
    ],
  },
  {
    slug: 'depth-of-heritage',
    title: 'Depth of Heritage',
    tagline: { de: 'VR-Survival-Horror in der Mine des Vaters', en: 'VR survival horror in your father’s mine' },
    category: 'games',
    year: { de: 'WS 2024/25', en: 'Winter 2024/25' },
    team: { de: '4 Personen', en: '4 people' },
    status: { de: 'HdM-Semesterprojekt', en: 'HdM semester project' },
    cover: '/projects/depth-of-heritage/webui-dashboard.webp',
    iconImage: '/projects/depth-of-heritage/icon.webp',
    accent: ['#3a2c1a', '#0d0a06'],
    description: {
      de: 'Ein VR-Spiel für Meta Quest: Du übernimmst die stillgelegte Mine deines verstorbenen Vaters, fährst mit einem geheimen Aufzug in die Tiefe und baust Kristalle ab – mit knappem Sauerstoff und Kreaturen, die in der Dunkelheit lauern. In Sektor 0 bleiben dir genau fünf Minuten für so viele Kristalle wie möglich. Entstanden im Wintersemester 2024/25 an der HdM, im Kern mit demselben Team, das danach Gaia Protocol gebaut hat.',
      en: 'A VR game for Meta Quest: you take over your late father’s abandoned mine, ride a secret elevator into the depths and mine crystals – with scarce oxygen and creatures lurking in the dark. In sector 0 you have exactly five minutes to collect as many crystals as possible. Built in the winter semester 2024/25 at HdM, largely by the same team that went on to build Gaia Protocol.',
    },
    sections: [
      {
        heading: { de: 'Multiplayer mit Begleit-Apps', en: 'Multiplayer with companion apps' },
        bullets: [
          { de: 'Das Spiel selbst in Unity 6, gespielt über Quest Link', en: 'The game itself in Unity 6, played via Quest Link' },
          { de: 'Eine WebUI mit API als Survival-Dashboard: Puls, Gesundheit, Sauerstoff, Inventar und Missionsziele live, dazu eine Datenbank zu Mine und Gegnern', en: 'A web UI with an API as a survival dashboard: live heart rate, health, oxygen, inventory and mission goals, plus a database on the mine and its enemies' },
          { de: 'Ein Scoreboard mit Next.js für die Kristall-Ausbeute', en: 'A Next.js scoreboard for the crystal haul' },
        ],
      },
      {
        heading: { de: 'Mein Teil', en: 'My part' },
        bullets: [
          { de: 'Gegner-KI mit State Machines: Verfolgen, Angriffe, Sprung- und Spuckattacken, Spawning und mehrere Gegnertypen', en: 'Enemy AI with state machines: chasing, attacks, jump and spit attacks, spawning and several enemy types' },
          { de: 'Der Begleitroboter mit eigener State Machine und Sprachausgabe', en: 'The companion robot with its own state machine and voice lines' },
          { de: 'Höhlen und Level: prozedurale Höhlenumgebung, Eingangshalle, Lobby und Aufzug-Intro', en: 'Caves and levels: procedural cave environment, entrance hall, lobby and elevator intro' },
          { de: 'Lebens- und Sauerstofflogik, Erzabbau und Schaden', en: 'Health and oxygen logic, ore mining and damage' },
          { de: 'Sound- und Musiksystem, inklusive nahtloser Kampfmusik', en: 'Sound and music system, including seamless combat music' },
        ],
      },
    ],
    tags: ['Unity 6', 'C#', 'VR', 'Meta Quest', 'Multiplayer', 'Next.js'],
    screenshots: [
      { src: '/projects/depth-of-heritage/crystal-mining.webp', caption: { de: 'Kristallabbau mit der Spitzhacke', en: 'Mining crystals with the pickaxe' } },
      { src: '/projects/depth-of-heritage/enemy-crawler.webp', caption: { de: 'Eine der Kreaturen in der Mine', en: 'One of the creatures in the mine' } },
      { src: '/projects/depth-of-heritage/enemy-mantis.webp', caption: { de: 'Weiterer Gegnertyp', en: 'Another enemy type' } },
      { src: '/projects/depth-of-heritage/enemy-strider.webp', caption: { de: 'Gegner mit Sprungangriff', en: 'Enemy with a jump attack' } },
      { src: '/projects/depth-of-heritage/lobby.webp', caption: { de: 'Eingangshalle der Mine', en: 'The mine’s entrance hall' } },
      { src: '/projects/depth-of-heritage/cave.webp', caption: { de: 'Tief in der Höhle, nur mit der Lampe', en: 'Deep in the cave, lamp only' } },
      { src: '/projects/depth-of-heritage/webui-database.webp', caption: { de: 'WebUI: Datenbank mit Infos zur Mine', en: 'Web UI: database with mine intel' } },
      { src: '/projects/depth-of-heritage/webui-bestiary.webp', caption: { de: 'WebUI: Gegner-Eintrag „Blightspitter“', en: 'Web UI: enemy entry “Blightspitter”' } },
      { src: '/projects/depth-of-heritage/webui-leaderboard.webp', caption: { de: 'WebUI: globale Bestenliste', en: 'Web UI: global leaderboard' } },
    ],
    links: [
      { kind: 'video', label: { de: 'Projektseite mit Playthrough (HdM)', en: 'Project page with playthrough (HdM)' }, href: 'https://www.hdm-stuttgart.de/stage/projekt_detail/projekt_details?projekt_ID=4573' },
      { kind: 'docs', label: { de: 'Dokumentation (GitBook)', en: 'Documentation (GitBook)' }, href: 'https://hdm-stuttgart.gitbook.io/depthofheritage/' },
    ],
  },
  {
    slug: 'dendree',
    title: 'Dendree',
    tagline: { de: 'Meine Softwarefirma aus Stuttgart', en: 'My software company from Stuttgart' },
    category: 'web',
    year: { de: 'seit 2026', en: 'since 2026' },
    team: { de: '3 Gründer', en: '3 founders' },
    status: { de: 'Mitgründer seit 11/2026', en: 'Co-founder since 11/2026' },
    // Official logo (white on Ink, per brand guidelines)
    cover: '/projects/dendree/cover.webp',
    iconImage: '/projects/dendree/icon.webp',
    accent: ['#0a0a0a', '#0a0a0a'],
    featured: true,
    description: {
      de: 'Dendree ist die Softwarefirma, die ich mitgegründet habe. Wir bauen individuelle Software für ambitionierte Unternehmen – Web-Plattformen, Mobile Apps, KI-Werkzeuge und Spiele, end-to-end von der Idee bis zum Betrieb. Drei Gründer aus Stuttgart, direkte Zusammenarbeit und ein Festpreis, sobald der Umfang klar ist.',
      en: 'Dendree is the software company I co-founded. We build custom software for ambitious businesses – web platforms, mobile apps, AI tools and games, end to end from the idea to operations. Three founders from Stuttgart, direct collaboration and a fixed price once the scope is clear.',
    },
    sections: [
      {
        heading: { de: 'Was ich dort mache', en: 'What I do there' },
        bullets: [
          { de: 'Frontend und Backend mit Next.js, FastAPI und Supabase', en: 'Frontend and backend with Next.js, FastAPI and Supabase' },
          { de: 'Betrieb der Server-Infrastruktur mit Terraform und Docker', en: 'Running the server infrastructure with Terraform and Docker' },
          { de: 'Eigene Werkzeuge für das Team, z. B. Zeiterfassung, Accounts und Analytics', en: 'In-house tools for the team, e.g. time tracking, accounts and analytics' },
        ],
      },
      {
        heading: { de: 'Was Dendree gebaut hat', en: 'What Dendree has built' },
        bullets: [
          { de: 'Decembox – Baukasten für digitale Adventskalender mit 35 Türchen-Arten, live auf decembox.com', en: 'Decembox – a builder for digital advent calendars with 35 door types, live at decembox.com' },
          { de: 'Ayusukha – Website einer Ayurveda-Praxis mit Online-Terminbuchung', en: 'Ayusukha – website of an ayurveda practice with online booking' },
          { de: 'Reichenberg & Gauder – Website und Onlineshop eines Herstellers bleifreier Geschosse', en: 'Reichenberg & Gauder – website and online shop of a lead-free bullet manufacturer' },
          { de: 'Dendree Cup – Minecraft-Teamturnier wie eine TV-Show, mit eigenem Plugin (in Entwicklung)', en: 'Dendree Cup – a Minecraft team tournament staged like a TV show, with its own plugin (in development)' },
          { de: 'Dazu die eigenen Produkte Pulse und Gaia Protocol', en: 'Plus our own products Pulse and Gaia Protocol' },
        ],
      },
    ],
    tags: ['Next.js', 'FastAPI', 'Supabase', 'TypeScript', 'Terraform', 'Docker'],
    screenshots: [
      { src: '/projects/dendree/site-home.webp', caption: { de: 'dendree.de – Startseite', en: 'dendree.de – home page' } },
      { src: '/projects/dendree/site-services.webp', caption: { de: 'dendree.de – Leistungen', en: 'dendree.de – services' } },
      { src: '/projects/dendree/site-products.webp', caption: { de: 'dendree.de – Projekte', en: 'dendree.de – projects' } },
      { src: '/projects/dendree/decembox.webp', caption: { de: 'Decembox – digitale Adventskalender', en: 'Decembox – digital advent calendars' } },
      { src: '/projects/dendree/ayusukha.webp', caption: { de: 'Ayusukha – Website einer Ayurveda-Praxis', en: 'Ayusukha – ayurveda practice website' } },
      { src: '/projects/dendree/reichenberg-gauder.webp', caption: { de: 'Reichenberg & Gauder – Website und Shop', en: 'Reichenberg & Gauder – website and shop' } },
      { src: '/projects/dendree/dendree-cup.webp', caption: { de: 'Dendree Cup – Turnier-Website', en: 'Dendree Cup – tournament website' } },
      { src: '/projects/dendree/dendree-cup-arena.webp', caption: { de: 'Dendree Cup – die Arena-Insel', en: 'Dendree Cup – the arena island' } },
    ],
    links: [{ kind: 'site', label: { de: 'Website öffnen', en: 'Open website' }, href: 'https://dendree.de' }],
  },
  {
    slug: 'stream-scheduler',
    title: 'Stream Scheduler',
    tagline: { de: 'Planungsplattform für Twitch-Creator', en: 'Planning platform for Twitch creators' },
    category: 'web',
    year: '2025 – 2026',
    team: { de: 'Uni-Team', en: 'University team' },
    status: { de: 'Wird weiterentwickelt', en: 'In development' },
    cover: '/projects/stream-scheduler/cover.webp',
    accent: ['#a970ff', '#3b1d7a'],
    featured: true,
    description: {
      de: 'Eine Webplattform rund um Twitch: Zuschauer sehen, wann ihre Lieblings-Streamer live gehen, und bekommen Empfehlungen. Creator planen Sendepläne, Gäste, Specials und Events an einem Ort und teilen sie mit ihrer Community. Nach der MediaNight entwickeln wir das Uni-Projekt als eigenes Produkt weiter.',
      en: 'A web platform around Twitch: viewers see when their favourite streamers go live and get recommendations. Creators plan schedules, guests, specials and events in one place and share them with their community. After the MediaNight we kept developing the university project as our own product.',
    },
    sections: [
      {
        heading: { de: 'Architektur', en: 'Architecture' },
        bullets: [
          { de: 'Microservices: User- und Scheduling-Service, einzeln deploy- und skalierbar', en: 'Microservices: user and scheduling service, deployed and scaled independently' },
          { de: 'Landingpage und Plattform mit Next.js und React', en: 'Landing page and platform built with Next.js and React' },
          { de: 'PostgreSQL, MongoDB und Redis für die Daten', en: 'PostgreSQL, MongoDB and Redis for data' },
          { de: 'Keycloak als Identity-Provider, inklusive Login über Twitch', en: 'Keycloak as identity provider, including Twitch login' },
          { de: 'Docker, Kubernetes mit Autoscaling, Terraform und CI/CD', en: 'Docker, Kubernetes with autoscaling, Terraform and CI/CD' },
        ],
      },
    ],
    tags: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Keycloak', 'Kubernetes', 'Terraform'],
    screenshots: [
      { src: '/projects/stream-scheduler/dashboard.webp', caption: { de: 'Dashboard mit Kalender', en: 'Dashboard with calendar' } },
      { src: '/projects/stream-scheduler/editor.webp', caption: { de: 'Creator-Editor', en: 'Creator editor' } },
    ],
    links: [],
  },
  {
    slug: 'pulse',
    title: 'Pulse',
    tagline: { de: 'Audio-Visualizer in Echtzeit', en: 'Real-time audio visualizer' },
    category: 'desktop',
    year: '2026',
    team: { de: 'Eigenes Projekt', en: 'Personal project' },
    status: { de: 'Download für Windows', en: 'Download for Windows' },
    cover: '/projects/pulse/hero.webp',
    iconImage: '/projects/pulse/icon.svg',
    accent: ['#ff6a1f', '#3a1608'],
    featured: true,
    description: {
      de: 'Pulse verwandelt alles, was dein Rechner abspielt, live in Licht – Spotify, YouTube, ein DJ-Set oder das Mikrofon. Es läuft im Browser oder als native Windows-App und komplett lokal: keine Cloud, kein Tracking, kein Account.',
      en: 'Pulse turns whatever your computer plays into light in real time – Spotify, YouTube, a DJ set or your microphone. It runs in the browser or as a native Windows app and fully locally: no cloud, no tracking, no account.',
    },
    sections: [
      {
        heading: 'Features',
        bullets: [
          { de: '60 Modi in sechs Welten, von Partikelstürmen bis Neon-Tunneln', en: '60 modes across six worlds, from particle storms to neon tunnels' },
          { de: 'HDR-Pipeline mit Bloom, AgX-Tonemapping und Film Grain', en: 'HDR pipeline with bloom, AgX tone mapping and film grain' },
          { de: 'FFT-Analyse mit Beat- und BPM-Erkennung, Übergänge auf den Beat', en: 'FFT analysis with beat and BPM detection, transitions on the beat' },
          { de: 'Systemaudio per WASAPI-Loopback in der Desktop-App', en: 'System audio via WASAPI loopback in the desktop app' },
          { de: '„Now Playing“ mit Cover aus Spotify, Browsern, Apple Music und VLC', en: '“Now playing” with cover art from Spotify, browsers, Apple Music and VLC' },
          { de: 'Playlists, Paletten und dynamische Auflösung für schwächere GPUs', en: 'Playlists, palettes and dynamic resolution for weaker GPUs' },
        ],
      },
    ],
    tags: ['React', 'TypeScript', 'three.js', 'Tauri', 'Rust', 'WebGL'],
    screenshots: [
      { src: '/projects/pulse/modes.webp', caption: { de: 'Eine Auswahl der 60 Modi', en: 'A selection of the 60 modes' } },
      { src: '/projects/pulse/gallery-lightfall.webp', caption: { de: 'Modus „Lightfall“', en: 'Mode “Lightfall”' } },
      { src: '/projects/pulse/gallery-spectrum-disc.webp', caption: { de: 'Modus „Spectrum Disc“', en: 'Mode “Spectrum Disc”' } },
      { src: '/projects/pulse/gallery-chroma-urchin.webp', caption: { de: 'Modus „Chroma Urchin“', en: 'Mode “Chroma Urchin”' } },
      { src: '/projects/pulse/gallery-nebula-galaxy.webp', caption: { de: 'Modus „Nebula Galaxy“', en: 'Mode “Nebula Galaxy”' } },
      { src: '/projects/pulse/modes-particle-vortex.webp', caption: { de: 'Modus „Particle Vortex“', en: 'Mode “Particle Vortex”' } },
      { src: '/projects/pulse/ui-modes.webp', caption: { de: 'Modus-Auswahl', en: 'Mode picker' } },
      { src: '/projects/pulse/ui-playlist.webp', caption: { de: 'Playlist-Einstellungen', en: 'Playlist settings' } },
      { src: '/projects/pulse/ui-source.webp', caption: { de: 'Audioquelle wählen', en: 'Choosing the audio source' } },
    ],
    links: [
      { kind: 'github', label: 'GitHub', href: 'https://github.com/byGamsa/pulse-audio-visualizer' },
      { kind: 'site', label: { de: 'Download (Releases)', en: 'Download (releases)' }, href: 'https://github.com/byGamsa/pulse-audio-visualizer/releases/latest' },
    ],
  },
  {
    slug: 'gerigk-os',
    title: 'Gerigk OS',
    tagline: { de: 'Dieses Portfolio als Desktop im Browser', en: 'This portfolio as a desktop in the browser' },
    category: 'web',
    year: '2026',
    team: { de: 'Eigenes Projekt', en: 'Personal project' },
    status: { de: 'Läuft gerade', en: 'Running right now' },
    icon: 'logo',
    accent: ['#9bd8ff', '#2b7bf3'],
    description: {
      de: 'Das System, in dem du gerade bist: ein Desktop im Liquid-Glass-Look mit Fenstern, Taskleiste, Startmenü, Explorer, Terminal, Musik-Player, Gästebuch und dieser App.',
      en: 'The system you are using right now: a liquid-glass desktop with windows, taskbar, start menu, explorer, terminal, music player, guestbook and this app.',
    },
    sections: [
      {
        heading: { de: 'Unter der Haube', en: 'Under the hood' },
        bullets: [
          { de: 'Eigener Fenstermanager mit Snap, Minimieren-Animation und Widgets', en: 'Custom window manager with snapping, minimize animation and widgets' },
          { de: 'Terminal mit Parser, virtuellem Dateisystem und versteckten Befehlen', en: 'Terminal with parser, virtual file system and hidden commands' },
          { de: 'Musik aus einer Spotify-Playlist, abgespielt über YouTube', en: 'Music from a Spotify playlist, played via YouTube' },
          { de: 'Gästebuch mit Supabase und KI-Moderation', en: 'Guestbook with Supabase and AI moderation' },
        ],
      },
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Supabase'],
    screenshots: [],
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/byGamsa/gerigk-os' }],
  },
  {
    slug: 'sdi',
    title: 'Software Defined Infrastructure',
    tagline: { de: 'Infrastructure as Code, Schritt für Schritt', en: 'Infrastructure as code, step by step' },
    category: 'cloud',
    year: '2025 – 2026',
    team: { de: '2 Personen', en: '2 people' },
    status: { de: 'Online-Doku', en: 'Online docs' },
    cover: '/projects/sdi/cover.webp',
    accent: ['#7b61ff', '#1c1446'],
    description: {
      de: 'Zur gleichnamigen HdM-Vorlesung haben wir jede Übung nicht nur gelöst, sondern als Schritt-für-Schritt-Anleitung dokumentiert. Server, Netzwerke, Firewalls, DNS und Zertifikate entstehen mit Terraform automatisch in der Hetzner Cloud – vom einzelnen Server bis zum privaten Netz mit Gateway.',
      en: 'For the HdM lecture of the same name we didn’t just solve every exercise, we documented each one as a step-by-step guide. Servers, networks, firewalls, DNS and certificates are created automatically in the Hetzner Cloud with Terraform – from a single server to a private network with a gateway.',
    },
    sections: [
      {
        heading: { de: 'Themen', en: 'Topics' },
        bullets: [
          { de: 'Server-Setup mit Cloud-init', en: 'Server setup with cloud-init' },
          { de: 'SSH-Host-Keys als wiederverwendbares Terraform-Modul', en: 'SSH host keys as a reusable Terraform module' },
          { de: 'Volumes, Partitionen und Mount-Points', en: 'Volumes, partitions and mount points' },
          { de: 'Automatische DNS-Einträge und ACME-Zertifikate', en: 'Automatic DNS records and ACME certificates' },
          { de: 'Private Subnetze mit Application-Level-Gateway', en: 'Private subnets with an application-level gateway' },
        ],
      },
    ],
    tags: ['Terraform', 'Hetzner Cloud', 'Cloud-init', 'ACME', 'VitePress', 'GitHub Actions'],
    screenshots: [
      { src: '/projects/sdi/exercise-gateway.webp', caption: { de: 'Übung: Application-Level-Gateway', en: 'Exercise: application-level gateway' } },
      { src: '/projects/sdi/exercise-certificate.webp', caption: { de: 'Übung: Web-Zertifikat', en: 'Exercise: web certificate' } },
    ],
    links: [
      { kind: 'docs', label: { de: 'Dokumentation', en: 'Documentation' }, href: 'https://bygamsa.github.io/sdi/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/byGamsa/sdi' },
    ],
  },
  {
    slug: 'waste-classifier',
    title: 'Waste Classifier',
    tagline: { de: 'Bilderkennung für die richtige Tonne', en: 'Image recognition for the right bin' },
    category: 'ai',
    year: '2025 – 2026',
    team: { de: '3 Personen', en: '3 people' },
    status: { de: 'Uni-Projekt', en: 'University project' },
    cover: '/projects/slt-ai/confusion-matrix.webp',
    accent: ['#34c759', '#0f3d22'],
    description: {
      de: 'Für das KI-Modul an der HdM haben wir einen Image Classifier gebaut, der auf Fotos erkennt, in welche Tonne der Abfall gehört – mit genau den Kategorien, die es an der Hochschule gibt: Verpackung, Papier, Restmüll, Pfandflasche und „kein Müll“.',
      en: 'For the AI module at HdM we built an image classifier that recognises from a photo which bin the waste belongs in – using exactly the categories found on campus: packaging, paper, residual waste, deposit bottle and “not waste”.',
    },
    sections: [
      {
        heading: { de: 'Daten & Modelle', en: 'Data & models' },
        bullets: [
          { de: 'Rund 2.000 Bilder pro Klasse aus Kaggle-Datensätzen plus eigene Fotos vom Campus', en: 'Around 2,000 images per class from Kaggle datasets plus our own campus photos' },
          { de: 'Verglichen: MLP, eigenes CNN, VGG16 und ResNet50', en: 'Compared: MLP, custom CNN, VGG16 and ResNet50' },
          { de: 'Hyperparameter-Suche mit Weights & Biases', en: 'Hyperparameter search with Weights & Biases' },
        ],
      },
      {
        heading: { de: 'Ergebnis', en: 'Result' },
        text: {
          de: 'Transfer Learning gewinnt klar: Das feinjustierte VGG16 kommt auf rund 82 % Validierungsgenauigkeit, das eigene CNN auf etwa 66 %. Pfandflaschen werden am sichersten erkannt, Papier und Verpackung am häufigsten verwechselt.',
          en: 'Transfer learning wins clearly: the fine-tuned VGG16 reaches about 82 % validation accuracy, our own CNN around 66 %. Deposit bottles are recognised most reliably, paper and packaging get mixed up most often.',
        },
      },
    ],
    tags: ['Python', 'PyTorch', 'Computer Vision', 'Transfer Learning', 'Weights & Biases'],
    screenshots: [
      { src: '/projects/slt-ai/confusion-matrix.webp', caption: { de: 'Confusion Matrix des besten Modells', en: 'Confusion matrix of the best model' } },
      { src: '/projects/slt-ai/training-curve.webp', caption: { de: 'Trainings- und Validierungsgenauigkeit', en: 'Training and validation accuracy' } },
      { src: '/projects/slt-ai/class-distribution.webp', caption: { de: 'Klassenverteilung im Datensatz', en: 'Class distribution in the dataset' } },
    ],
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/byGamsa/slt-ai' }],
  },
  {
    slug: 'databack',
    title: 'DataBack',
    tagline: { de: 'Inkrementelle Backups für PostgreSQL', en: 'Incremental backups for PostgreSQL' },
    category: 'desktop',
    year: '2024 – 2025',
    team: { de: '3 Personen', en: '3 people' },
    status: { de: 'CLI-Tool', en: 'CLI tool' },
    cover: '/projects/databack/docs.webp',
    accent: ['#4f8cff', '#132a57'],
    description: {
      de: 'Ein Terminal-Tool, das PostgreSQL-Datenbanken sichert und wiederherstellt. Statt jedes Mal die ganze Datenbank zu kopieren, speichert es nur die Änderungen seit dem letzten Backup – und kann trotzdem jede frühere Version zurückholen.',
      en: 'A terminal tool that backs up and restores PostgreSQL databases. Instead of copying the whole database every time, it only stores the changes since the last backup – and can still bring back any earlier version.',
    },
    sections: [
      {
        heading: { de: 'So funktioniert’s', en: 'How it works' },
        bullets: [
          { de: 'Pro Tabelle ein Base-File, Incremental-Files mit Änderungen und ein Current-File', en: 'Per table a base file, incremental files with changes and a current file' },
          { de: 'Eindeutiger Index pro Objekt, damit Einträge über Versionen erkannt werden', en: 'A unique index per object so entries are recognised across versions' },
          { de: 'Schemata und Constraints werden pro Version als SQL mitgesichert', en: 'Schemas and constraints are saved as SQL per version' },
          { de: 'Zwei Befehle: databack backup und databack restore --version', en: 'Two commands: databack backup and databack restore --version' },
        ],
      },
    ],
    tags: ['Java', 'Maven', 'PostgreSQL', 'JDBC', 'Picocli', 'Docker'],
    screenshots: [
      { src: '/projects/databack/docs.webp', caption: { de: 'Startseite der Dokumentation', en: 'Documentation home' } },
      { src: '/projects/databack/docs-konzept.webp', caption: { de: 'Konzept der Ordnerstruktur', en: 'Folder structure concept' } },
    ],
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/byGamsa/DataBack' }],
  },
  {
    slug: 'sipster',
    title: 'Sipster',
    tagline: { de: 'Community-App für Spieleabende', en: 'Community app for game nights' },
    category: 'mobile',
    year: '2024',
    team: { de: '5 Personen', en: '5 people' },
    status: { de: 'Alpha', en: 'Alpha' },
    cover: '/projects/sipster/cover.webp',
    accent: ['#ff9f0a', '#5a2a00'],
    description: {
      de: 'Eine Smartphone-App für Spieleabende: Partyspiele wie Wahrheit oder Pflicht, Bombparty oder Beerpong Extreme, dazu Freunde, geteilte Fotos, Reaktionen und Events. Mit gesammelten „Sips“ steigt man im Level auf. Entstanden als Teamprojekt an der HdM, als lauffähige Alpha.',
      en: 'A smartphone app for game nights: party games like Truth or Dare, Bomb Party or Beerpong Extreme, plus friends, shared photos, reactions and events. Collected “sips” level you up. Built as a team project at HdM and available as a working alpha.',
    },
    sections: [
      {
        heading: { de: 'Architektur', en: 'Architecture' },
        bullets: [
          { de: 'App mit React Native und Expo für iOS und Android', en: 'App built with React Native and Expo for iOS and Android' },
          { de: 'REST-API mit Node.js und Express auf eigenem Server', en: 'REST API with Node.js and Express on our own server' },
          { de: 'MongoDB und Bild-Uploads, die automatisch in mehrere Größen umgerechnet werden', en: 'MongoDB and image uploads that are resized into several formats automatically' },
          { de: 'Microkernel-Aufbau: neue Spiele als eigenständige Module', en: 'Microkernel structure: new games as standalone modules' },
          { de: 'Tests mit Jest und CI/CD in GitLab', en: 'Tests with Jest and CI/CD in GitLab' },
        ],
      },
    ],
    tags: ['React Native', 'Expo', 'Node.js', 'Express', 'MongoDB', 'Jest'],
    screenshots: [
      { src: '/projects/sipster/architecture.webp', caption: { de: 'Backend-Architektur als UML', en: 'Backend architecture as UML' } },
      { src: '/projects/sipster/tests.webp', caption: { de: 'Jest-Tests der API', en: 'Jest tests of the API' } },
    ],
    links: [],
  },
];

export const categoryLabels: Record<ProjectCategory, LocalizedValue> = {
  games: { de: 'Games & VR', en: 'Games & VR' },
  web: { de: 'Web', en: 'Web' },
  mobile: { de: 'Mobile', en: 'Mobile' },
  desktop: { de: 'Desktop & Tools', en: 'Desktop & tools' },
  cloud: { de: 'Cloud & DevOps', en: 'Cloud & DevOps' },
  ai: { de: 'KI & Daten', en: 'AI & data' },
};

export const findProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
