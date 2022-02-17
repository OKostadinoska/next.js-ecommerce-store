import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function ShoppingCart({ product }) {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>
      <div className={styles.aboutPage}>
        <div>
          <h1>Shopping Cart</h1>

          <p>This is the shopping cart page</p>
        </div>
      </div>
    </Layout>
  );
}
