import { User } from "@/types/user";
import {
  api,
  CheckSessionResponse,
  FetchNotesResponse,
  NotesParams,
} from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";

export const checkSessionServer = async () => {
  const cookiesData = await cookies();
  const res = await api.get<CheckSessionResponse>(`/auth/session`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });

  return res;
};

export const fetchNotesServer = async ({
  search = "",
  tag,
  page = 1,
  perPage = 12,
  sortBy = "created",
}: NotesParams = {}): Promise<FetchNotesResponse> => {
  const cookiesData = await cookies();
  const params: Record<string, string | number> = { page, perPage, sortBy };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return res.data;
};

export const getMeServer = async () => {
  const cookiesData = await cookies();
  const res = await api.get<User>(`/user/me`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return res;
};

export const getSingleNoteServer = async (id: string): Promise<Note> => {
  const cookiesData = await cookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });

  return res.data;
};
