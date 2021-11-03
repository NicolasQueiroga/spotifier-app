import Head from 'next/head';
import styles from '../styles/components/Layout.module.css'
import Header from '../components/header';

const Layout = ({ children }: any) => (
  <>
    <Head>
      <title>Spotifier</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="container">{children}</main>
  </>
);

export default Layout;