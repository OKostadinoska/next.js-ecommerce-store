import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>
      <div className={styles.aboutPage}>
        <div>
          <h1>About</h1>
          <p>This is the about page</p>
        </div>
      </div>
    </Layout>
  );
}
