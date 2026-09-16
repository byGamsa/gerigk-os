import type { AppWindowProps, BrowserArgs } from '@/types';
import { browserStyles as s } from './Browser.styles';
import { TabStrip } from './components/TabStrip/TabStrip';
import { Toolbar } from './components/Toolbar/Toolbar';
import { FramePage } from './pages/FramePage/FramePage';
import { NewTabPage } from './pages/NewTabPage/NewTabPage';
import { openExternal, useBrowser } from './useBrowser';

// Brave-like browser with tabs, address bar and "New tab" page
export function Browser({ windowId, args }: AppWindowProps<BrowserArgs>) {
  const b = useBrowser(windowId, args);
  const { t, view } = b;

  return (
    <div className={s.root}>
      <div className={s.chrome}>
        <TabStrip
          tabs={b.tabs}
          onSelect={b.selectTab}
          onClose={b.closeTab}
          onNewTab={() => b.openTab()}
          labels={{ newTab: t('browser.newTab'), close: t('browser.closeTab') }}
        />
        <Toolbar
          url={b.url}
          canGoBack={b.canGoBack}
          canGoForward={b.canGoForward}
          onBack={b.goBack}
          onForward={b.goForward}
          onReload={b.reload}
          onSubmit={b.submitAddress}
          onOpenExternal={() => openExternal(b.url)}
        />
      </div>

      <div className={s.content}>
        {view.kind === 'newtab' && <NewTabPage onOpen={b.navigate} onSearch={b.searchFromNewTab} />}
        {view.kind === 'frame' && <FramePage url={view.url} reloadKey={b.reloadKey} onOpenExternal={() => openExternal(view.url)} />}
      </div>
    </div>
  );
}
