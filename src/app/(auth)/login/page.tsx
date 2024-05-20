"use client";
import { signIn } from "next-auth/react";
import { logo } from "@/src/utils/mock.example";
import styles from "./login.module.css";
import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInNextAuth = async (
    email: FormDataEntryValue,
    password: FormDataEntryValue
  ) => {
    setIsLoading(true);
    await signIn("credentials", {
      email,
      password,
    })
      .then(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email && password) {
      signInNextAuth(email, password);
    }
  };

  return (
    <div className={styles.login_container}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <img src={logo} className={styles.logo} />
        <div className={styles.input_group}>
          <label className={styles.input_label} htmlFor="email">
            Correo
          </label>
          <input
            className={styles.input_field}
            type="email"
            id="email"
            name="email"
            required
            placeholder="ejemplo@email.com"
          />
        </div>

        <div className={styles.input_group}>
          <label className={styles.input_label} htmlFor="password">
            Contraseña
          </label>
          <input
            className={styles.input_field}
            type="password"
            id="password"
            name="password"
            required
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className={styles.submit_button}
          disabled={isLoading}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
