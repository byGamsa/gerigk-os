import type { Bookmark, SiteInfo } from '@/types';

// Bookmarks on the "New tab" page
const bookmarks: readonly Bookmark[] = [{ title: 'Dendree', url: 'https://dendree.de/', icon: '/bookmarks/dendree.png' }];

// Known sites – `embeddable: false` shows a preview instead of an iframe (e.g. X-Frame-Options: DENY)
const sites: readonly SiteInfo[] = [
  {
    host: 'dendree.de',
    title: 'Dendree – Custom Software for Ambitious Businesses',
    description:
      'Custom-built software for ambitious businesses. From web platforms to mobile apps, AI solutions, and everything in between – we build end-to-end software that drives your business forward.',
    icon: '/bookmarks/dendree.png',
    embeddable: true,
  },
  {
    host: 'search.brave.com',
    title: 'Brave Search',
    description: '',
    icon: '',
    embeddable: false,
  },
];

export const browserConfig = {
  // Loaded in the first tab when the browser opens
  homeUrl: 'https://dendree.de/',
  // Search engine for non-URL input ({q} = search term)
  searchUrl: 'https://search.brave.com/search?q={q}',
  bookmarks,
  sites,
} as const;
