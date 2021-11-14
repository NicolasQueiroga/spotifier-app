import Link from "next/link";
import styles from "../styles/components/Header.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { logOut } from "../contexts/AuthContext";

const Header: NextPage = () => {
  const [session, loading] = useSession();
  const { asPath, pathname } = useRouter();
  const endpoint = asPath.split("/");
  return (
    <header>
      <nav>
        <>
          {!session && (
            <div className={styles.header}>
              <div className={styles.navbar}>
                <Link href="/">
                  <a className={styles.logo}>
                    <h1>Spotifier</h1>
                  </a>
                </Link>
              </div>
              <Link href="/api/auth/signin">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("Spotify", {
                      callbackUrl: `${window.location.origin}/user`,
                    });
                  }}
                >
                  <button className={styles.navbarBtn}>Sign in</button>
                </a>
              </Link>
            </div>
          )}
          {session && (
            <div className={styles.header}>
              <div className={styles.navbar}>
                <Link href="/user">
                  <a className={styles.logo}>
                    <h1>Spotifier</h1>
                  </a>
                </Link>
                {endpoint[endpoint.length - 1] !== "search" && (
                  <Link href="/user/search">
                    <a className={styles.search}>Search</a>
                  </Link>
                )}
                {endpoint[endpoint.length - 1] !== "bookmarks" && (
                  <Link href="/user/bookmarks">
                    <a className={styles.favorites}>Bookmarks</a>
                  </Link>
                )}
              </div>
              <Link href="/api/auth/signout">
                <a
                  onClick={(e) => {
                    logOut();
                    e.preventDefault();
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    });
                  }}
                >
                  <button className={styles.navbarBtn}>Sign out</button>
                </a>
              </Link>
            </div>
          )}
        </>
      </nav>
    </header>
  );
};

export default Header;
