// Створіть клієнтський компонент components\\AuthProvider\\AuthProvider.tsx, який перевіряє,
//     чи користувач авторизований, і при переході на приватну сторінку виконує повторну
//     перевірку сесії.Якщо користувач неавторизований і намагається перейти на приватну
// сторінку, має виконуватися вихід і контент не відображатись.Під час перевірки показуйте лоедер.

"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setAuth = useAuthStore((set) => set.setAuth);
  const clearAuth = useAuthStore((set) => set.clearAuth);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await checkSession();
      if (res) {
        const user = await getMe();
        setAuth(user);
      } else {
        clearAuth();
      }
    };
    fetchSession();
  }, [clearAuth, setAuth]);
  return children;
};

export default AuthProvider;
