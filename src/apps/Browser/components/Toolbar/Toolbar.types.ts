export interface ToolbarProps {
  url: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  // Address bar input (URL or search term)
  onSubmit: (input: string) => void;
  onOpenExternal: () => void;
}
