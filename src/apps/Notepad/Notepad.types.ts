export interface NotepadArgs {
  // ID of a file in the virtual file system
  fileId?: string;
  // Write a new anonymous guestbook file instead of opening one
  compose?: 'guestbook';
}

export interface CaretPosition {
  line: number;
  col: number;
}
