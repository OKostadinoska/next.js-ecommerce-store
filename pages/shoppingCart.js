import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function shoppingCart() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>

      <h1>Shopping Cart</h1>
      <p>This is the shopping cart page</p>
    </Layout>
  );
}
