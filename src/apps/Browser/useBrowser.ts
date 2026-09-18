import { useCallback, useEffect, useRef, useState } from 'react';
import { browserConfig } from '@/config/browser.config';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { createId } from '@/lib/math';
import { useOsStore } from '@/store/os.store';
import type { BrowserArgs, BrowserTab } from '@/types';
import type { TabSummary, TabView } from './Browser.types';
import { hostOf, iconFor, isNewTab, isSearchUrl, NEW_TAB, resolveInput, siteInfo } from './browser.utils';

const createTab = (url: string): BrowserTab => ({ id: createId('tab'), history: [url], index: 0 });

// Open the real page in a new tab of the real browser
export const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

// Browser tabs, history and view mode
export function useBrowser(windowId: string, args: BrowserArgs) {
  const { t } = useT();
  const [tabs, setTabs] = useState<BrowserTab[]>(() => [createTab(args.url ?? browserConfig.homeUrl)]);
  const [activeId, setActiveId] = useState(() => tabs[0]!.id);
  // Increment → reload the iframe
  const [reloadKey, setReloadKey] = useState(0);

  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0]!;
  const url = active.history[active.index] ?? NEW_TAB;

  const titleFor = useCallback(
    (u: string) => (isNewTab(u) ? t('browser.newTab') : (siteInfo(u)?.title ?? hostOf(u) ?? u)),
    [t],
  );

  useWindowTitle(windowId, `${titleFor(url)} – Brave`);

  // ---------- Tabs ----------

  const updateActive = (update: (tab: BrowserTab) => BrowserTab) =>
    setTabs((list) => list.map((tab) => (tab.id === activeId ? update(tab) : tab)));

  const openTab = useCallback((target = NEW_TAB) => {
    const tab = createTab(target);
    setTabs((list) => [...list, tab]);
    setActiveId(tab.id);
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      if (tabs.length === 1) return useOsStore.getState().closeWindow(windowId);
      const index = tabs.findIndex((tab) => tab.id === id);
      const rest = tabs.filter((tab) => tab.id !== id);
      setTabs(rest);
      if (id === activeId) setActiveId((rest[index] ?? rest[index - 1] ?? rest[0]!).id);
    },
    [activeId, tabs, windowId],
  );

  // Link from another app (launchApp with { url }) → new tab in the open browser
  const lastArgsUrl = useRef(args.url);
  useEffect(() => {
    if (args.url && args.url !== lastArgsUrl.current) openTab(args.url);
    lastArgsUrl.current = args.url;
  }, [args.url, openTab]);

  // ---------- Navigation in the active tab ----------

  const navigate = (target: string) => {
    updateActive((tab) => ({ ...tab, history: [...tab.history.slice(0, tab.index + 1), target], index: tab.index + 1 }));
  };

  const canGoBack = active.index > 0;
  const canGoForward = active.index < active.history.length - 1;
  const goBack = () => canGoBack && updateActive((tab) => ({ ...tab, index: tab.index - 1 }));
  const goForward = () => canGoForward && updateActive((tab) => ({ ...tab, index: tab.index + 1 }));
  const reload = () => setReloadKey((k) => k + 1);

  // Address bar: open URL or search
  const submitAddress = (input: string) => navigate(resolveInput(input));

  // Search from the "New tab" page: Brave Search forbids embedding → show results in the real browser
  const searchFromNewTab = (input: string) => {
    const target = resolveInput(input);
    navigate(target);
    if (isSearchUrl(target)) openExternal(target);
  };

  // ---------- View ----------

  const site = siteInfo(url);
  const view: TabView = isNewTab(url)
    ? { kind: 'newtab' }
    : site && !site.embeddable
      ? { kind: 'preview', url, site }
      : { kind: 'frame', url };

  const tabSummaries: TabSummary[] = tabs.map((tab) => {
    const tabUrl = tab.history[tab.index] ?? NEW_TAB;
    return { id: tab.id, title: titleFor(tabUrl), icon: isNewTab(tabUrl) ? null : iconFor(tabUrl), active: tab.id === active.id };
  });

  return {
    t,
    url,
    view,
    reloadKey,
    tabs: tabSummaries,
    selectTab: setActiveId,
    openTab,
    closeTab,
    navigate,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    reload,
    submitAddress,
    searchFromNewTab,
  };
}

export type BrowserApi = ReturnType<typeof useBrowser>;
