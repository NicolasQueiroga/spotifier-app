/* eslint-disable @next/next/no-img-element */
import Layout from "../components/layout";
import Footer from "../components/footer";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { signIn } from "next-auth/client";
import axios from "axios";
import { useState, useEffect } from "react";


const Home = () => {
  const [add, setAdd] = useState<Array<AddProps>>([]);
  useEffect(() => {
    async function loadAdd() {
      try {
        const { data: token }: any = await axios.get("https://tecweb-avaliacao-final-2021-2.herokuapp.com/nicolasmq/token");
        const { data: response }: any = await axios.get("https://tecweb-avaliacao-final-2021-2.herokuapp.com/nicolasmq/ads", { headers: { 'Authorization': `Token ${token.token}` } });
        setAdd(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadAdd();
  }, []);

  return (
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
        <div className={styles.ads}>
          <h2>Ads</h2>
          <div className={styles.adsContainer}>
            {add.map((a, i) => (
              <div key={i} className={styles.addSetup}>
                <img className={styles.addImg} src={a.img} alt={a.headline} />
                <p className={styles.addHeadline}>{a.headline}</p>
                <p className={styles.addDescription}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default Home;
