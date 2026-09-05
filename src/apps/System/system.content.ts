import { legalConfig } from '@/config/legal.config';
import { osConfig } from '@/config/os.config';
import { formatLongDate } from '@/lib/format';
import type { Lang, LegalInfo, Localized, PostalAddress } from '@/types';
import type { InfoParagraph, InfoRow, SystemContent } from './System.types';

// Values in [square brackets] are placeholders from legal.config.ts
export const isPlaceholder = (value: string | null | undefined) => !value || /^\[.*\]$/.test(value.trim());

const addressLines = (a: PostalAddress) => [a.street, `${a.postalCode} ${a.city}`, a.country];

// Which required details are still missing?
export function missingFields(info: LegalInfo, lang: Lang): string[] {
  const label: Record<string, Localized> = {
    name: { de: 'Name', en: 'Name' },
    address: { de: 'Anschrift', en: 'Address' },
    email: { de: 'E-Mail', en: 'Email' },
    phone: { de: 'Telefon', en: 'Phone' },
  };
  const missing: string[] = [];
  if (isPlaceholder(info.name)) missing.push(label.name![lang]);
  if ([info.address.street, info.address.postalCode, info.address.city].some(isPlaceholder)) missing.push(label.address![lang]);
  if (isPlaceholder(info.email)) missing.push(label.email![lang]);
  if (info.phone !== null && isPlaceholder(info.phone)) missing.push(label.phone![lang]);
  return missing;
}

// ---------- Texts ----------

const disclaimer: Localized<InfoParagraph[]> = {
  de: [
    {
      heading: 'Haftung für Inhalte',
      text: 'Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter bin ich nach § 7 Abs. 1 DDG für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    },
    {
      heading: 'Haftung für Links',
      text: 'Diese Seite enthält Links und Einbettungen externer Anbieter (z. B. Spotify, YouTube, Unsplash), auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar; bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.',
    },
    {
      heading: 'Urheberrecht',
      text: 'Die von mir erstellten Inhalte und Werke auf dieser Seite unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung. Inhalte Dritter sind als solche gekennzeichnet; die Rechte liegen bei den jeweiligen Inhabern.',
    },
  ],
  en: [
    {
      heading: 'Liability for content',
      text: 'The content of this site was created with the greatest possible care. However, no guarantee can be given for its accuracy, completeness or timeliness. As a service provider I am responsible for my own content in accordance with Section 7 (1) DDG (German Digital Services Act). According to Sections 8 to 10 DDG, I am not obliged to monitor transmitted or stored third-party information.',
    },
    {
      heading: 'Liability for links',
      text: 'This site contains links to and embeds from external providers (e.g. Spotify, YouTube, Unsplash) whose content I have no influence on. The respective provider is always responsible for such third-party content. Links will be removed immediately if any legal violations become known.',
    },
    {
      heading: 'Copyright',
      text: 'The content and works created by me on this site are subject to German copyright law. Third-party content is marked as such; all rights remain with the respective owners.',
    },
  ],
};

const media: Localized<InfoRow[]> = {
  de: [
    { label: 'Hintergrundbilder', value: 'Unsplash (Unsplash-Lizenz) – Fotograf jeweils unten links genannt', href: 'https://unsplash.com/license' },
    { label: 'Musik', value: 'Wiedergabe über eingebettete YouTube-Videos; Rechte bei den jeweiligen Rechteinhabern' },
    { label: 'Playlist', value: 'Titelinformationen und Cover von Spotify' },
    { label: 'Schrift', value: 'Inter (SIL Open Font License)' },
  ],
  en: [
    { label: 'Wallpapers', value: 'Unsplash (Unsplash License) – photographer credited in the bottom left', href: 'https://unsplash.com/license' },
    { label: 'Music', value: 'Played via embedded YouTube videos; rights belong to the respective owners' },
    { label: 'Playlist', value: 'Track information and artwork from Spotify' },
    { label: 'Font', value: 'Inter (SIL Open Font License)' },
  ],
};

// ---------- Structure ----------

export function buildSystemContent(lang: Lang, openAbout: () => void): SystemContent {
  const info = legalConfig;
  const de = lang === 'de';
  const responsible = info.responsible ?? { name: info.name, address: info.address };
  const hasPhone = info.phone !== null;

  const imprintRows: InfoRow[] = [
    { label: de ? 'Angaben gemäß' : 'Information pursuant to', value: de ? '§ 5 Digitale-Dienste-Gesetz (DDG)' : 'Section 5 DDG (German Digital Services Act)' },
    { label: 'Name', value: info.name },
    { label: de ? 'Anschrift' : 'Address', value: addressLines(info.address) },
    { label: 'E-Mail', value: info.email, href: isPlaceholder(info.email) ? undefined : `mailto:${info.email}` },
    ...(hasPhone
      ? [{ label: de ? 'Telefon' : 'Phone', value: info.phone!, href: isPlaceholder(info.phone) ? undefined : `tel:${info.phone!.replace(/[^\d+]/g, '')}` }]
      : []),
    {
      label: de ? 'Verantwortlich i. S. d. § 18 Abs. 2 MStV' : 'Responsible under Section 18 (2) MStV',
      value: [responsible.name, ...addressLines(responsible.address)],
    },
  ];

  const systemRows: InfoRow[] = [
    { label: 'Edition', value: `${osConfig.name} Portfolio` },
    { label: 'Version', value: __APP_VERSION__ },
    { label: de ? 'Zuletzt aktualisiert am' : 'Last updated', value: formatLongDate(new Date(__APP_BUILD__), lang) },
    { label: de ? 'Technik' : 'Stack', value: 'React · TypeScript · Tailwind CSS · Zustand · Vite' },
  ];

  return {
    missing: missingFields(info, lang),
    tiles: [
      { id: 'provider', icon: 'user', label: de ? 'Anbieter' : 'Provider', value: info.name, detail: de ? 'Diensteanbieter nach § 5 DDG' : 'Service provider (§ 5 DDG)' },
      { id: 'location', icon: 'mapPin', label: de ? 'Anschrift' : 'Address', value: info.address.city, detail: `${info.address.postalCode} · ${info.address.country}` },
      { id: 'contact', icon: 'mail', label: de ? 'Kontakt' : 'Contact', value: info.email, detail: hasPhone ? info.phone! : 'E-Mail' },
    ],
    sections: [
      { id: 'imprint', icon: 'info', title: de ? 'Impressum' : 'Legal notice', rows: imprintRows },
      { id: 'disclaimer', icon: 'scale', title: de ? 'Haftungsausschluss' : 'Disclaimer', paragraphs: disclaimer[lang] },
      { id: 'media', icon: 'image', title: de ? 'Medien & Bildnachweise' : 'Media & credits', rows: media[lang] },
      { id: 'system', icon: 'logoMono', title: `${osConfig.name}-Info`, rows: systemRows },
    ],
    links: [
      ...(isPlaceholder(info.email) ? [] : [{ label: de ? 'E-Mail schreiben' : 'Send email', href: `mailto:${info.email}` }]),
      { label: de ? 'Über mich' : 'About me', onSelect: openAbout },
      { label: 'Unsplash-Lizenz', href: 'https://unsplash.com/license' },
    ],
  };
}

// Section as plain text for the clipboard
export function sectionToText(title: string, rows?: readonly InfoRow[], paragraphs?: readonly InfoParagraph[]): string {
  const lines = [title, ''];
  rows?.forEach((r) => {
    const value = typeof r.value === 'string' ? r.value : r.value.join(', ');
    lines.push(`${r.label}: ${value}`);
  });
  paragraphs?.forEach((p) => lines.push(p.heading, p.text, ''));
  return lines.join('\n').trim();
}
