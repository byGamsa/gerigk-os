export interface FramePageProps {
  url: string;
  // Changing it forces an iframe reload
  reloadKey: number;
  onOpenExternal: () => void;
}
