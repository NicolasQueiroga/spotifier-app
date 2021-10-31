import Head from 'next/head';
import Header from '../components/header';

const Layout = ({ children }: any) => (
  <>
    <Head>
      <title>Next Auth App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    <main className="container">{children}</main>

  </>
);

export default Layout;