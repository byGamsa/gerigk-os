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
          'Damit deine Einstellungen erhalten bleiben, werden im lokalen Speicher deines Browsers gespeichert: Sprache, Lautstärke und Stummschaltung, Wiedergabeoptionen (Zufall/Wiederholen), die Anordnung der Desktop-Symbole sowie ein Zwischenspeicher für Hintergrundbilder. Diese Daten verlassen dein Gerät nicht und werden nicht an mich übertragen. Die Speicherung ist für die von dir genutzten Funktionen unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Du kannst sie jederzeit über die Einstellungen deines Browsers löschen.',
        ),
      ],
      unsplash: [
        p(
          'Hintergrundbilder von Unsplash',
          'Die Desktop-Hintergründe werden von Unsplash (Unsplash Inc., Montreal, Kanada) geladen. Dafür stellt dein Browser eine Verbindung zu den Servern von Unsplash her (api.unsplash.com, images.unsplash.com); dabei wird deine IP-Adresse an Unsplash übermittelt. Außerdem wird Unsplash gemäß seinen API-Richtlinien mitgeteilt, welches Foto angezeigt wird. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden Gestaltung). Datenschutzerklärung von Unsplash: https://unsplash.com/privacy',
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
          'To keep your settings, your browser’s local storage holds: language, volume and mute, playback options (shuffle/repeat), the arrangement of desktop icons and a cache for wallpapers. This data never leaves your device and is not sent to me. Storing it is strictly necessary for the features you use (Section 25 (2) no. 2 TDDDG). You can delete it at any time in your browser settings.',
        ),
      ],
      unsplash: [
        p(
          'Wallpapers from Unsplash',
          'Desktop wallpapers are loaded from Unsplash (Unsplash Inc., Montreal, Canada). Your browser connects to Unsplash servers (api.unsplash.com, images.unsplash.com), which transmits your IP address to Unsplash. As required by its API guidelines, Unsplash is also notified which photo is displayed. Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in an appealing design). Unsplash privacy policy: https://unsplash.com/privacy',
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
      { id: 'fonts', icon: 'document', title: de ? 'Schriftarten' : 'Fonts', paragraphs: t.fonts },
      { id: 'links', icon: 'externalLink', title: de ? 'Externe Links' : 'External links', paragraphs: t.links },
      { id: 'rights', icon: 'scale', title: de ? 'Deine Rechte' : 'Your rights', paragraphs: t.rights },
    ],
  };
}
