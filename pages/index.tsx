import Layout from "../components/layout";
import Footer from "../components/footer";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { signIn } from "next-auth/client";

const Home = () => (
  <Layout>
    <div className={styles.container}>
      <Link href="/api/auth/signin">
        <a
          onClick={(e) => {
            e.preventDefault();
            signIn("Spotify", {
              callbackUrl: `${window.location.origin}/user`,
            });
          }}
        >
          <button className={styles.btn}>Sign in With Spotify</button>
        </a>
      </Link>
      <Footer />
    </div>
  </Layout>
);

export default Home;
