import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getProductById } from '../../util/database';

export default function SingleProduct(props) {
  // 1. get the value of the cookie
  const cookieValue = getParsedCookie('addedProducts') || [];
  const [cart, setCart] = useState(cookieValue);

  function addProductToCart(id) {
    // is id in array => return true or false
    const existIdOnArray = cart.some((cookieObject) => cookieObject.id === id);

    // find in array => return single object with same id
    const productWithSameId = cart.find(
      (cookieObject) => cookieObject.id === id,
    );
    // filter array => return an array without product with same id
    const productWithDifferentId = cart.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    let newCookie;
    // if cookie id exists, update amount
    if (existIdOnArray) {
      newCookie = [
        ...productWithDifferentId,
        {
          id: productWithSameId.id,
        },
      ];
      // add new cookie
    } else {
      newCookie = [...cookieValue, { id: id }];
    }

    // 3. set the new value of the cookie

    setParsedCookie('addedProducts', newCookie);
    setCart(newCookie);
  }

  return (
    <Layout>
      <div className={styles.singleProduct}>
        <div>
          <Head>
            <title>{props.products.name}</title>
            <meta name="description" content={props.products.name} />
          </Head>
          <h1 className={styles.singleProductTitle}>Mockingbird</h1>

          <div className={styles.singleProduct}>
            <div className={styles.singleImage}>
              <Image
                src={`/unfortunately-foxes/${props.products.id}.png`}
                width="300"
                height="300"
              />
            </div>
            <div className={styles.singleProduct}>
              <div className={styles.singleImage}>
                {/* <div>id: {props.product.id}</div> */}
                <div>name: {props.products.name}</div>
                <div>price: {props.products.price}</div>
                {/* <div>type: {props.product.type}</div> */}
              </div>
              <button
                data-test-id="product-add-to-cart"
                onClick={() => addProductToCart(props.products.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// The parameter `context` gets passed from Next.js
// and includes a bunch of information about the
// request
export async function getServerSideProps(context) {
  const addedProductsOnCookies = context.req.cookies.addedProducts || '[]';

  // if there is no likedAnimals cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const addedProducts = JSON.parse(addedProductsOnCookies);

  // This is the variable that we get from the URL
  // (anything after the slash)
  const productId = context.query.productId;
  console.log('db', productId);
  const products = await getProductById(productId);

  return {
    props: {
      addedProducts: addedProducts || null,
      // product: matchingProduct,
      products,
      // animalId: animalId,
    },
  };
}
