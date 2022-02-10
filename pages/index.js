import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import productsDatabase from '../util/database';

export default function Home(props) {
  const [addedProductsArray, setAddedProductsArray] = useState(
    props.addedProducts,
  );

  function addProductToCart(id) {
    // 1. get the value of the cookie
    const cookieValue = getParsedCookie('addedProducts') || [];

    // 2. update the cooke
    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      //  CASE = when the id is in the array => delete item
      //  cookieValue  [{id:3},{id:5} ]
      newCookie = cookieValue.filter((cookieObject) => {
        if (cookieObject.id === id) {
          cookieObject.quantity += 1;
          console.log(cookieObject);
        }
        // return cookieObject.id !== id;
        return cookieObject;
      });
    } else {
      //  CASE = when the id is not in the array => add item
      cookieValue.push(id);
      //  cookieValue  [{id:3, stars: 5 },{id:5, stars: 12 }]
      newCookie = [...cookieValue, { id: id, stars: 0 }];
      // here i need push function for the add to card button
    }

    // 3. set the new value of the cookie
    setAddedProductsArray(newCookie);
    setParsedCookie('addedProducts', newCookie);
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>E-Commerce</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>Welcome to E-Commerce</h1>

        <main className={styles.grid}>
          {props.products.map((product) => {
            // product =  {
            //   id: '1',
            //   name: 'Tiny',
            //   age: 47,
            //   type: 'Dragon',
            //   accessory: 'Monacle',
            // },

            // addedProducts = [{ id: "1" }, { id: "2" }];

            const productIsLiked = addedProductsArray.some((likedObject) => {
              return likedObject.id === product.id;
            });

            return (
              <div key={`product-${product.id}`} className={styles.grid}>
                {/* Dynamic link, eg. /products/1, /products/2, etc */}
                <Link href={`/products/${product.id}`}>
                  <a className={styles.card}>
                    {product.name} is a {product.type} with a {product.price}
                    <Image
                      src={`/unfortunately-foxes/${product.id}.jpeg`}
                      width="200"
                      height="200"
                    />
                  </a>
                </Link>{' '}
                {/* <button onClick={() => toggleProductLike(product.id)}>
                  {productIsLiked ? '🧡' : '🖤'}
                </button> */}
                <button onClick={() => addProductToCart(product.id)}>
                  Add to card
                </button>
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
export function getServerSideProps(context) {
  const addedProductsOnCookies = context.req.cookies.addedProducts || '[   ]';

  // if there is no addedProducts cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const addedProducts = JSON.parse(addedProductsOnCookies);
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
      addedProducts: addedProducts,
      products: productsDatabase,
    },
  };
}
