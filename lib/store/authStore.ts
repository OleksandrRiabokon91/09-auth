import { User } from "@/types/note";
import { create } from "zustand";

type useAuthStore = {
  isAuth: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
};
export const useAuthStore = create<useAuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setAuth: (user: User) => {
    set({ isAuth: true, user });
  },
  clearAuth: () => {
    set({ isAuth: false, user: null });
  },
}));
