export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}
export type Tag =
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping"
  | "Ideas"
  | "Travel"
  | "Finance"
  | "Health"
  | "Important"
  | "Todo";
export type NoteTag = Note["tag"];
export interface NewNote {
  title: string;
  content: string;
  tag: Tag;
}
export const tagOptions: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
  "Todo",
];

export type User = {
  email: string;
  username: string;
  avatar: string;
};
