import Layout from "../components/layout";
import Footer from "../components/footer";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { signIn } from "next-auth/client";
import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../sevices/api";

const Home = () => {
  async function getMsg() {
    const { data: token }: any = await axios.get("https://enigmatic-bayou-56424.herokuapp.com/nicolasmq/token");
    console.log(token);
    const { data: response }: any = await axios.post("https://enigmatic-bayou-56424.herokuapp.com/nicolasmq/message", { "token": token.token });
    return (
      <div className={styles.pf}>
        <p>{response}</p>
      </div>
    );
  }

  const [msg, setMsg] = useState('');
  useEffect(() => {
    async function loadMsg() {
      try {
        const { data: token }: any = await axios.get("https://enigmatic-bayou-56424.herokuapp.com/nicolasmq/token");
        const { data: response }: any = await axios.post("https://enigmatic-bayou-56424.herokuapp.com/nicolasmq/message", { "token": token.token });
        setMsg(response.mensagem);
      } catch (error) {
        console.log(error);
      }

    }
    loadMsg();
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
        <div className={styles.funFact}>
          <p>Fun Fact!</p>
          <p>{msg}</p>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default Home;
