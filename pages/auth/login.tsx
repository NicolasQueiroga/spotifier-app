import { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import styles from "../../styles/pages/auth/Login.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signin } from "../../contexts/AuthContext";

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<Array<string> | null>(null);

  async function handleSignIn(data: any) {
    const response: any = await signin(data);
    if (response) setError(response.data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LogIn</title>
        <meta name="description" content="LogIn forms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {error && (
            <div className={styles.errorBox}>
              {Object.values(error).map((e, i) => (
                <p key={`error_${i}`}>{e[0]}</p>
              ))}
            </div>
          )}
          <button type="submit">LogIn</button>
        </form>
      </Layout>
    </div>
  );
};

export default Login;
