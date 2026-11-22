import { legalConfig } from '@/config/legal.config';
import type { Lang, Localized } from '@/types';
import { isPlaceholder } from './system.content';
import type { InfoParagraph, InfoRow, InfoSectionData } from './System.types';

// Privacy policy of what this site actually processes – add every new third-party service here!

const p = (heading: string, text: string): InfoParagraph => ({ heading, text });

function paragraphs(lang: Lang): Record<string, InfoParagraph[]> {
  const { hosting } = legalConfig;
  const texts: Localized<Record<string, InfoParagraph[]>> = {
    de: {
      overview: [
        p(
          'Allgemeines',
          'Der Schutz deiner persönlichen Daten ist mir wichtig. Diese Website ist ein persönliches Portfolio ohne Nutzerkonten, Kontaktformular, Tracking oder Werbung. Personenbezogene Daten werden nur verarbeitet, soweit dies für den Betrieb der Seite und der unten beschriebenen Funktionen technisch nötig ist. Rechtsgrundlagen sind die Datenschutz-Grundverordnung (DSGVO) und das Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).',
        ),
      ],
      hosting: [
        p(
          'Hosting',
          `Diese Website wird bei ${hosting.name}, ${hosting.address}, gehostet. Beim Aufruf der Seite verarbeitet der Hosting-Anbieter automatisch Daten, die dein Browser übermittelt (Server-Logfiles): IP-Adresse, Datum und Uhrzeit, aufgerufene Datei, übertragene Datenmenge, Referrer-URL sowie Browser und Betriebssystem.`,
        ),
        p(
          'Zweck und Rechtsgrundlage',
          'Die Verarbeitung ist erforderlich, um die Website auszuliefern und ihre Sicherheit und Stabilität zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und funktionsfähigen Webangebot). Die Logfiles werden vom Hosting-Anbieter nach dessen Vorgaben gelöscht.',
        ),
      ],
      storage: [
        p(
          'Keine Cookies',
          'Diese Website setzt selbst keine Cookies und verwendet keine Analyse- oder Tracking-Werkzeuge.',
        ),
        p(
          'Lokaler Speicher (localStorage)',
          'Damit deine Einstellungen erhalten bleiben, werden im lokalen Speicher deines Browsers gespeichert: Sprache, Lautstärke und Stummschaltung, Wiedergabeoptionen (Zufall/Wiederholen), die Anordnung der Desktop-Symbole das zuletzt gezeigte Hintergrundbild (damit nicht zweimal dasselbe erscheint) sowie eine Kopie deiner eigenen Gästebuch-Einträge, damit du sie sofort siehst. Diese Daten werden nicht an mich übertragen (die Gästebuch-Einträge selbst nur beim Absenden, siehe unten). Die Speicherung ist für die von dir genutzten Funktionen unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.',
        ),
      ],
      unsplash: [
        p(
          'Hintergrundbilder',
          'Die Desktop-Hintergründe sind Fotos von Unsplash (Unsplash-Lizenz), die ich einmalig heruntergeladen habe. Beim Besuch besteht keine Verbindung zu Unsplash; erst wenn du auf den Fotografen-Hinweis klickst, öffnet sich die Seite des Fotos bei Unsplash. Die Bilddateien liegen im Speicher (Storage) meines Supabase-Projekts (Supabase Inc., San Francisco, USA; Rechenzentrum in der EU, Irland) und werden von dort bzw. über dessen Content-Delivery-Netzwerk ausgeliefert. Dabei verarbeitet Supabase technisch notwendig deine IP-Adresse und übliche Verbindungsdaten (z. B. Browsertyp, Zeitpunkt), um die Dateien auszuliefern; ein Transfer in die USA kann dabei nicht ausgeschlossen werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden und zuverlässigen Gestaltung). Datenschutzerklärung von Supabase: https://supabase.com/privacy',
        ),
      ],
      music: [
        p(
          'Musik-Player (YouTube)',
          'Die Songs der Musik-App werden über eingebettete YouTube-Videos abgespielt (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Der YouTube-Player wird erst geladen, wenn du die Musik-App öffnest, und läuft im erweiterten Datenschutzmodus (youtube-nocookie.com). Dabei wird deine IP-Adresse an Google übermittelt; beim Abspielen kann YouTube Cookies oder vergleichbare Technologien einsetzen. Eine Übermittlung in die USA ist möglich. Rechtsgrundlage ist deine Einwilligung durch das aktive Öffnen der Musik-App (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Datenschutzerklärung von Google: https://policies.google.com/privacy',
        ),
        p(
          'Cover-Bilder (Spotify)',
          'Die Cover der Songs werden von Servern von Spotify (Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Schweden) geladen; dabei wird deine IP-Adresse an Spotify übermittelt. Die Titelinformationen selbst sind Teil dieser Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Datenschutzerklärung von Spotify: https://www.spotify.com/de/legal/privacy-policy/',
        ),
      ],
      browser: [
        p(
          'Browser-App',
          'Die Browser-App ist eine Nachbildung eines Browsers. Websites, die eine Einbettung erlauben, werden direkt in einem Rahmen (iframe) geladen; dabei stellt dein Browser eine Verbindung zum jeweiligen Anbieter her und übermittelt u. a. deine IP-Adresse – es gelten dessen Datenschutzbestimmungen. Beim Start lädt die Browser-App auf diese Weise die Website dendree.de (Dendree), sodass dabei automatisch eine Verbindung zu deren Server aufgebaut wird; dort können eigene Cookies und Dienste zum Einsatz kommen, über die dendree.de selbst informiert. Websites, die keine Einbettung erlauben, werden nur als Vorschau angezeigt und erst auf deinen Klick in einem neuen Tab deines Browsers geöffnet. Suchanfragen werden an Brave Search (Brave Software, Inc., San Francisco, USA) übergeben und ebenfalls in einem neuen Tab geöffnet. Die Symbole der Lesezeichen sind lokal gespeichert. Datenschutzerklärung von Brave Search: https://search.brave.com/help/privacy-policy',
        ),
      ],
      guestbook: [
        p(
          'Gästebuch',
          'Im Gästebuch kannst du anonym eine kurze Nachricht als Datei hinterlassen. Gespeichert werden nur Dateiname, Text, Sprache und Zeitpunkt – kein Name und keine E-Mail-Adresse. Zum Schutz vor Spam wird zusätzlich ein nicht umkehrbarer, mit einem geheimen Schlüssel gebildeter Hash deiner IP-Adresse gespeichert. Die Daten liegen bei Supabase (Supabase Inc., San Francisco, USA) in einem Rechenzentrum in der EU (Irland).',
        ),
        p(
          'Automatische Prüfung per KI',
          'Bevor eine Nachricht erscheint, wird sie zunächst mit einfachen Regeln auf Links, Spam und unerwünschte Wörter geprüft. Anschließend wird ihr Text zur Erkennung beleidigender Inhalte an ein KI-Modell (textdetox/xlmr-large-toxicity-classifier) bei Hugging Face (Hugging Face, Inc., New York, USA) übermittelt; dabei findet eine Übermittlung in die USA statt. Die Anfrage erfolgt von meinem Server aus, deine IP-Adresse wird nicht mitgesendet. Nachrichten mit Beleidigungen, Werbung oder Links werden nicht veröffentlicht; unklare Fälle prüfe ich manuell. Datenschutzerklärungen: https://supabase.com/privacy · https://huggingface.co/privacy',
        ),
        p(
          'Rechtsgrundlage und Löschung',
          'Rechtsgrundlage ist deine Einwilligung durch das aktive Absenden (Art. 6 Abs. 1 lit. a DSGVO), für den Spamschutz mein berechtigtes Interesse an einem missbrauchsfreien Gästebuch (Art. 6 Abs. 1 lit. f DSGVO). Da Nachrichten anonym sind, kann ich sie dir nicht zuordnen – schreib mir den Dateinamen und den ungefähren Zeitpunkt, dann lösche ich sie. Nicht veröffentlichte Nachrichten lösche ich regelmäßig.',
        ),
      ],
      fonts: [
        p(
          'Schriftarten',
          'Die verwendete Schrift (Inter) ist lokal auf dem Server dieser Website eingebunden. Es wird keine Verbindung zu Servern von Google Fonts oder anderen Schriftanbietern hergestellt.',
        ),
      ],
      links: [
        p(
          'Links zu anderen Websites',
          'Diese Website enthält Links zu externen Angeboten (z. B. Spotify, Unsplash, soziale Netzwerke). Daten werden an diese Anbieter erst übermittelt, wenn du einen Link anklickst. Für deren Datenverarbeitung sind die jeweiligen Anbieter verantwortlich.',
        ),
      ],
      rights: [
        p(
          'Deine Rechte',
          'Du hast jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wende dich dazu an die oben genannte Kontaktadresse.',
        ),
        p(
          'Beschwerderecht',
          'Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Bundesland deines Wohnorts oder des Orts des mutmaßlichen Verstoßes (Art. 77 DSGVO).',
        ),
      ],
    },
    en: {
      overview: [
        p(
          'General',
          'Protecting your personal data matters to me. This website is a personal portfolio without user accounts, contact form, tracking or advertising. Personal data is only processed as far as technically necessary to operate the site and the features described below, in accordance with the GDPR and the German TDDDG.',
        ),
      ],
      hosting: [
        p(
          'Hosting',
          `This website is hosted by ${hosting.name}, ${hosting.address}. When you visit the site, the host automatically processes data transmitted by your browser (server log files): IP address, date and time, requested file, amount of data transferred, referrer URL, browser and operating system.`,
        ),
        p(
          'Purpose and legal basis',
          'This processing is necessary to deliver the website and to ensure its security and stability. The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in a secure, functional website). Log files are deleted by the host according to its own policies.',
        ),
      ],
      storage: [
        p('No cookies', 'This website does not set any cookies itself and does not use analytics or tracking tools.'),
        p(
          'Local storage (localStorage)',
          'To keep your settings, your browser’s local storage holds: language, volume and mute, playback options (shuffle/repeat), the arrangement of desktop icons, the last shown wallpaper (so the same one doesn’t appear twice in a row) and a copy of your own guestbook entries so you see them right away. This data is not sent to me (guestbook entries themselves only when you submit them, see below). Storing it is strictly necessary for the features you use (Section 25 (2) no. 2 TDDDG). You can delete it at any time in your browser settings.',
        ),
      ],
      unsplash: [
        p(
          'Wallpapers',
          'The desktop wallpapers are photos from Unsplash (Unsplash License) that I downloaded once. Visiting this site does not connect you to Unsplash; only when you click the photographer credit does the photo’s page on Unsplash open. The image files are stored in the storage of my Supabase project (Supabase Inc., San Francisco, USA; data centre in the EU, Ireland) and delivered from there or via its content delivery network. To deliver them, Supabase necessarily processes your IP address and usual connection data (e.g. browser type, time); a transfer to the USA cannot be ruled out. Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in an appealing and reliable design). Supabase privacy policy: https://supabase.com/privacy',
        ),
      ],
      music: [
        p(
          'Music player (YouTube)',
          'Songs in the music app are played via embedded YouTube videos (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). The YouTube player is only loaded once you open the music app and runs in privacy-enhanced mode (youtube-nocookie.com). Your IP address is transmitted to Google; during playback YouTube may use cookies or similar technologies, and data may be transferred to the USA. The legal basis is your consent given by actively opening the music app (Art. 6 (1) (a) GDPR, Section 25 (1) TDDDG). Google privacy policy: https://policies.google.com/privacy',
        ),
        p(
          'Artwork (Spotify)',
          'Song artwork is loaded from Spotify servers (Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Sweden), which transmits your IP address to Spotify. The track information itself is part of this website. Legal basis: Art. 6 (1) (f) GDPR. Spotify privacy policy: https://www.spotify.com/legal/privacy-policy/',
        ),
      ],
      browser: [
        p(
          'Browser app',
          'The browser app is a replica of a web browser. Websites that allow embedding are loaded directly in a frame (iframe); your browser connects to the respective provider and transmits, among other things, your IP address – their privacy policy applies. On start, the browser app loads the website dendree.de (Dendree) this way, so a connection to its server is established automatically; it may use its own cookies and services, about which dendree.de itself informs you. Websites that do not allow embedding are only shown as a preview and open in a new tab of your browser once you click. Search queries are passed to Brave Search (Brave Software, Inc., San Francisco, USA) and also open in a new tab. Bookmark icons are stored locally. Brave Search privacy policy: https://search.brave.com/help/privacy-policy',
        ),
      ],
      guestbook: [
        p(
          'Guestbook',
          'In the guestbook you can anonymously leave a short message as a file. Only the file name, text, language and time are stored – no name and no email address. To prevent spam, an irreversible hash of your IP address (created with a secret key) is stored as well. The data is hosted by Supabase (Supabase Inc., San Francisco, USA) in a data centre in the EU (Ireland).',
        ),
        p(
          'Automatic AI review',
          'Before a message appears, it is first checked with simple rules for links, spam and unwanted words. Its text is then sent to detect abusive content to an AI model (textdetox/xlmr-large-toxicity-classifier) at Hugging Face (Hugging Face, Inc., New York, USA), which involves a transfer to the USA. The request is made from my server, your IP address is not forwarded. Messages containing insults, advertising or links are not published; unclear cases are reviewed manually. Privacy policies: https://supabase.com/privacy · https://huggingface.co/privacy',
        ),
        p(
          'Legal basis and deletion',
          'The legal basis is your consent by actively submitting (Art. 6 (1) (a) GDPR); for spam protection, my legitimate interest in an abuse-free guestbook (Art. 6 (1) (f) GDPR). As messages are anonymous, I cannot link them to you – send me the file name and the approximate time and I will delete it. Unpublished messages are deleted regularly.',
        ),
      ],
      fonts: [
        p(
          'Fonts',
          'The font used (Inter) is hosted locally on this website’s server. No connection to Google Fonts or other font providers is made.',
        ),
      ],
      links: [
        p(
          'Links to other websites',
          'This website contains links to external services (e.g. Spotify, Unsplash, social networks). Data is only transmitted to these providers once you click a link; they are responsible for their own data processing.',
        ),
      ],
      rights: [
        p(
          'Your rights',
          'You have the right to access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21 GDPR). You can withdraw consent at any time with effect for the future (Art. 7 (3) GDPR). Please use the contact details above.',
        ),
        p(
          'Right to lodge a complaint',
          'You have the right to lodge a complaint with a data protection supervisory authority, in particular in the member state of your residence or of the alleged infringement (Art. 77 GDPR).',
        ),
      ],
    },
  };
  return texts[lang];
}

export interface PrivacyContent {
  sections: InfoSectionData[];
  // Details still missing specifically for the privacy policy
  missing: string[];
}

export function buildPrivacyContent(lang: Lang): PrivacyContent {
  const de = lang === 'de';
  const info = legalConfig;
  const t = paragraphs(lang);

  const controller: InfoRow[] = [
    { label: 'Name', value: info.name },
    { label: de ? 'Anschrift' : 'Address', value: [info.address.street, `${info.address.postalCode} ${info.address.city}`, info.address.country] },
    { label: 'E-Mail', value: info.email, href: isPlaceholder(info.email) ? undefined : `mailto:${info.email}` },
    { label: de ? 'Stand' : 'Last updated', value: info.privacyUpdated },
  ];

  const missing = [info.hosting.name, info.hosting.address].some(isPlaceholder) ? [de ? 'Hosting-Anbieter' : 'Hosting provider'] : [];

  return {
    missing,
    sections: [
      { id: 'controller', icon: 'user', title: de ? 'Verantwortlicher' : 'Controller', rows: controller, paragraphs: t.overview },
      { id: 'hosting', icon: 'monitor', title: de ? 'Hosting & Server-Logfiles' : 'Hosting & server logs', paragraphs: t.hosting },
      { id: 'storage', icon: 'grid', title: de ? 'Cookies & lokaler Speicher' : 'Cookies & local storage', paragraphs: t.storage },
      { id: 'unsplash', icon: 'image', title: de ? 'Hintergrundbilder' : 'Wallpapers', paragraphs: t.unsplash },
      { id: 'music', icon: 'music', title: de ? 'Musik-Player' : 'Music player', paragraphs: t.music },
      { id: 'browser', icon: 'globe', title: de ? 'Browser-App' : 'Browser app', paragraphs: t.browser },
      { id: 'guestbook', icon: 'folderSmall', title: de ? 'Gästebuch' : 'Guestbook', paragraphs: t.guestbook },
      { id: 'fonts', icon: 'document', title: de ? 'Schriftarten' : 'Fonts', paragraphs: t.fonts },
      { id: 'links', icon: 'externalLink', title: de ? 'Externe Links' : 'External links', paragraphs: t.links },
      { id: 'rights', icon: 'scale', title: de ? 'Deine Rechte' : 'Your rights', paragraphs: t.rights },
    ],
  };
}
