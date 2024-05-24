"use client";
import { signIn } from "next-auth/react";
import { logo } from "@/src/utils/mock.example";
import styles from "./login.module.css";
// import { signIn } from "@/src/services/auth";

const Login = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
    });
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

        <button type="submit" className={styles.submit_button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
