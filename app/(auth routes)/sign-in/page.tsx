"use client";
// import { NewNoteData } from "@/lib/api";

import { AuthReqestData, login } from "@/lib/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as AuthReqestData;
    const res = await login(data);
    console.log(res);
    if (res) {
      router.push("/profile");
    }
  };
  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  );
};
export default Login;
