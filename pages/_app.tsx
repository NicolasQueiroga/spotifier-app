import "../styles/globals.css";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Router from 'next/router';
import 'nprogress/nprogress.css';
const NProgress = require('nprogress');
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());  




function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
