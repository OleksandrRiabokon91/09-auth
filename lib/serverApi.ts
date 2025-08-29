// lib/api/serverApi.ts

// lib/api/serverApi.ts
import { cookies } from "next/headers";
import { api, NotesParams, FetchNotesResponse, NewNoteData } from "./api";
import { Note } from "@/types/note";
import { parse } from "cookie";

//? Вспомогательная функция: собирает текущие куки запроса в строку для заголовка
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

//? Вспомогательная функция: парсит set-cookie из ответа бэка и сохраняет в cookieStore
async function saveCookiesFromHeader(setCookie: string | string[]) {
  const cookieStore = await cookies();
  cookies();
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
    };
    if (parsed.accessToken)
      cookieStore.set("accessToken", parsed.accessToken, options);
    if (parsed.refreshToken)
      cookieStore.set("refreshToken", parsed.refreshToken, options);
  }
}

export const fetchNotes = async ({
  search = "",
  tag,
  page = 1,
  perPage = 12,
  sortBy = "created",
}: NotesParams = {}): Promise<FetchNotesResponse> => {
  //   const cookieStore = cookies(); // читаем куки с запроса
  const params: Record<string, string | number> = { page, perPage, sortBy };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers: { Cookie: getCookieHeader() }, // прокидываем куки в заголовках
  });

  return res.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>("/notes", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: getCookieHeader(),
    },
  });

  return res.data;
};

// !!! not ready

export const checkServerSession = async () => {
  // Дістаємо поточні cookie

  const res = await api.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: getCookieHeader(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};
