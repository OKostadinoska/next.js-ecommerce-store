import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { getProducts } from '../util/database';

type Product = {
  id: number;
  name: string;
  amount: number;
  price: number;
};

type Props = {
  products: Product[];
};
export default function ProductList(props: Props) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>E-Commerce</title>
          <meta name="description" content="Generated by create next app" />
        </Head>

        <main className={styles.grid}>
          {props.products.map((product: Product) => {
            return (
              <div key={`product-${product.id}`}>
                <div className={styles.grid}>
                  {/* Dynamic link, eg. /products/1, /products/2, etc */}
                  <Link href={`/products/${product.id}`}>
                    <a className={styles.card}>
                      {product.name}
                      <Image
                        src={`/images/${product.id}.png`}
                        width="200"
                        height="200"
                      />
                    </a>
                  </Link>{' '}
                </div>
                <span>{product.price / 100} €</span>
              </div>
            );
          })}
        </main>
      </div>
    </Layout>
  );
}

// Code in getServerSideProps runs only in
// Node.js, and allows you to do fancy things:
// - Read files from the file system
// - Connect to a (real) database
//
// getServerSideProps is exported from your files
// (ONLY FILES IN /pages) and gets imported
// by Next.js
export async function getServerSideProps() {
  // const addedProductsOnCookies = context.req.cookies.addedProducts || '[]';

  const products = await getProducts();

  console.log('db', products);

  // const addedProducts = JSON.parse(addedProductsOnCookies);
  // if there is no addedProducts cookie on the browser we store to an [] otherwise we get the cookie value and parse it

  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props

  // 1. get the cookies from the browser
  // 2. pass the cookies to the frontend
  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want

      products: products,
    },
  };
}