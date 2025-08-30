// lib/api/clientApi.ts
"use client";

import { api, NotesParams, FetchNotesResponse, NewNoteData } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import type { AuthReqestData, CheckSessionResponse } from "./api";

// ================
export const login = async (peyload: AuthReqestData) => {
  const res = await api.post<User>(`/auth/login`, peyload);
  return res.data;
};
export const register = async (peyload: AuthReqestData) => {
  const res = await api.post<User>(`/auth/register`, peyload);
  return res.data;
};
export const logout = async () => {
  const res = await api.post(`/auth/logout`);
  return res.data;
};
// ================
export const checkSession = async () => {
  const res = await api.get<CheckSessionResponse>(`/auth/session`);
  return res.data.success;
};
export const getMe = async () => {
  const res = await api.get<User>(`/user/me`);
  return res.data;
};
export const updateUser = async (payload: { username: string }) => {
  const res = await api.patch<User>("/user/me", payload);
  return res.data;
};
// ================
export const fetchNotes = async ({
  search = "",
  tag,
  page = 1,
  perPage = 12,
  sortBy = "created",
}: NotesParams = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage, sortBy };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await api.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};
export const createNote = async (data: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>("/notes", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.data;
};
export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  return res.data;
};
export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Accept: "application/json",
    },
  });

  return res.data;
};
