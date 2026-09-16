export interface NewTabPageProps {
  // Bookmark clicked → open in the current tab
  onOpen: (url: string) => void;
  // Search bar submitted
  onSearch: (input: string) => void;
}
