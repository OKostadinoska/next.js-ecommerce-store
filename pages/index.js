import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Home page" />
      </Head>
      <div className={styles.aboutPage}>
        <div>
          <h1>Home page</h1>
          <p>This is the home page</p>
        </div>
      </div>
    </Layout>
  );
}
