import Head from "next/head";
import Layout from "../../components/layout";
import Link from "next/link";
import styles from "../../styles/pages/auth/Auth.module.css";
import { NextPage } from "next";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>LogIn</title>
        <meta name="description" content="LogIn forms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <h2>To have bookmarks, please signup or login to my app!</h2>
          <div className={styles.btns}>
            <div className={styles.signup}>
              <Link href="/auth/signup">
                <a>
                  <button>Sign Up</button>
                </a>
              </Link>
            </div>
            <div className={styles.login}>
              <Link href="/auth/login">
                <a>
                  <button>Log In</button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Auth;
