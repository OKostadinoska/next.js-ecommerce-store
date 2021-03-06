import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: object;
};
export default function Layout(props: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{props.children}</main>

      <Footer />
    </>
  );
}
