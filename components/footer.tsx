import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from '../styles/components/Footer.module.css'

const Footer: NextPage = () => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
                ></link>
            </Head>
            <div className={styles.footerBasic}>
                <footer>
                    <div className={styles.social}>
                        <Link href="https://www.linkedin.com/in/nicolasqueiroga">
                            <a>
                                <i className="icon ion-social-linkedin"></i>
                            </a>
                        </Link>
                        <Link href="https://github.com/NicolasQueiroga">
                            <a>
                                <i className="icon ion-social-github"></i>
                            </a>
                        </Link>
                        <Link href="https://www.instagram.com/nick_queiroga/">
                            <a>
                                <i className="icon ion-social-instagram"></i>
                            </a>
                        </Link>
                    </div>
                    <p className={styles.copyright}>
                        Spotifier © 2021 - Made By Nicolas Queiroga
                    </p>
                </footer>
            </div >
        </>
    )
}

export default Footer