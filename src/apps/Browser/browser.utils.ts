import { browserConfig } from '@/config/browser.config';
import type { SiteInfo } from '@/types';

export const NEW_TAB = 'newtab';

export const isNewTab = (url: string) => url === NEW_TAB;

// Hostname without "www." – or null for an invalid URL
export function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export const siteInfo = (url: string): SiteInfo | undefined => {
  const host = hostOf(url);
  return host ? browserConfig.sites.find((s) => s.host === host) : undefined;
};

// Address bar input → URL ("dendree.de" → https://dendree.de/, anything else → Brave Search)
export function resolveInput(input: string): string {
  const value = input.trim();
  if (!value) return NEW_TAB;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[\w-]+(\.[\w-]+)+(:\d+)?(\/.*)?$/.test(value) && !value.includes(' ')) return `https://${value}`;
  return browserConfig.searchUrl.replace('{q}', encodeURIComponent(value));
}

export const isSearchUrl = (url: string) => url.startsWith(browserConfig.searchUrl.split('{q}')[0]!);

// Address bar display (without protocol, like Brave)
export function displayUrl(url: string): string {
  if (isNewTab(url)) return '';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// Best available icon: known site → bookmark → none
export function iconFor(url: string): string | null {
  const known = siteInfo(url)?.icon;
  if (known) return known;
  const host = hostOf(url);
  return browserConfig.bookmarks.find((b) => hostOf(b.url) === host)?.icon ?? null;
}
