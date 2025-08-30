// lib/api/api.ts

import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api", // берём из .env
  withCredentials: true, // куки автоматически отправляются
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}
export interface NotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}
export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}
export interface CheckSessionResponse {
  success: boolean;
}
export type AuthReqestData = {
  email: string;
  password: string;
};
