"use client";

import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();
  const handleLogoute = async () => {
    await logout();
    clearAuth();
    router.replace("/sign-in");
  };

  return (
    <ul>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>
              {user
                ? user.username === user.email
                  ? user.email
                  : user.username
                : "User"}
            </p>
            <button onClick={handleLogoute} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
