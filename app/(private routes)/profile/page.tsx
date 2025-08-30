import css from "./ProfilePage.module.css";
import { getMeServer } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description:
    "View your profile details — username, email, and avatar on NoteHub.",
  openGraph: {
    title: "User Profile | NoteHub",
    description: "Manage and view your profile information in NoteHub.",
    url: "https://08-zustand-omega-one.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "User Profile | NoteHub",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
