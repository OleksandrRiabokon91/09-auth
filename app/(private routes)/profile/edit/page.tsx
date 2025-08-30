"use client";

import css from "./EditProfilePage.module.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, updateUser } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/types/note";

export default function EditUser() {
  const { user, setAuth } = useAuthStore();
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Загружаем юзера
  useEffect(() => {
    if (!user) {
      getMe()
        .then((data: User) => {
          setAuth(data);
          setUsername(data.username);
        })
        .catch(console.error);
    } else {
      setUsername(user.username);
    }
  }, [user, setAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || username.trim().length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }
    try {
      if (user && username !== user.username) {
        const updated = await updateUser({ username });
        setAuth(updated);
        router.push("/profile");
      } // редирект на страницу профиля
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    router.push("/profile");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
