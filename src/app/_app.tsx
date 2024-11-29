import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'katex/dist/katex.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
