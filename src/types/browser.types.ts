// Known website with metadata – controls how a tab displays it
export interface SiteInfo {
  // Hostname without www, e.g. "dendree.de"
  host: string;
  title: string;
  description: string;
  // Local icon under /public (no request to third-party servers)
  icon: string;
  // May the site be embedded? Many forbid it via `X-Frame-Options`/`frame-ancestors` → preview
  embeddable: boolean;
}

export interface Bookmark {
  title: string;
  url: string;
  icon: string;
}

export interface BrowserTab {
  id: string;
  // History of this tab ('newtab' = new tab page)
  history: string[];
  index: number;
}

// Browser app args
export interface BrowserArgs {
  url?: string;
}
