export interface NotepadArgs {
  // ID of a file in the virtual file system
  fileId?: string;
}

export interface CaretPosition {
  line: number;
  col: number;
}
