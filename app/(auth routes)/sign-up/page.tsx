"use client";
import css from "./SignUpPage.module.css";
import { AuthReqestData, register } from "@/lib/clientApi";
const SignIn = () => {
  const handleRegister = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as AuthReqestData;
    const res = await register(data);
    console.log(res);
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleRegister} className={css.form}>
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};
export default SignIn;
