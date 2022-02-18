import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <meta name="description" content="About the page" />
      </Head>
      <div className={styles.aboutPage}>
        <div>
          <h1>About</h1>
          <p>
            Would like to learn how to play a new instrument, maybe would like
            to buy one for a gift or have one more in your collection?
            Mockingbird is the right place to be.
          </p>
        </div>
      </div>
    </Layout>
  );
}
