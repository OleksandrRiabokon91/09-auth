import { User } from "@/types/note";
import { create } from "zustand";

type useAuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
};
export const useAuthStore = create<useAuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user: User | null, isAuthenticated?: boolean) => {
    set({
      user,
      isAuthenticated: isAuthenticated ?? Boolean(user),
    });
  },
  clearAuth: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
