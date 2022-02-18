import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getProductById } from '../../util/database';

export default function SingleProduct(props) {
  const [addedProductsArray, setAddedProductsArray] = useState(
    props.addedProducts,
  );

  // [{"id":"1","stars":0},{"id":"2","stars":0}]
  const currentProductObject = addedProductsArray.find(
    (cookieObject) => cookieObject.id === props.products.id,
  );

  console.log(currentProductObject);

  function starsCountUp() {
    // because we render the button only when is liked then we can be sure the object is always on the cooke
    console.log('stars up');
    // 1. get the current cookie value
    const cookieValue = getParsedCookie('addedProducts') || [];
    // 2. update the stars count to +1
    const newCookie = cookieValue.map((cookieObject) => {
      // if is the object of the animal on this page update stars
      if (cookieObject.id === props.products.id) {
        return { ...cookieObject, stars: cookieObject.stars + 1 };
      } else {
        // if is not the object of the animal on this page don't do anything
        return cookieObject;
      }
    });

    // 3. update cookie and state
    setAddedProductsArray(newCookie);
    setParsedCookie('addedProducts', newCookie);
  }

  return (
    <Layout>
      <div className={styles.singleProduct}>
        <div>
          <Head>
            <title>{props.products.name}</title>
            <meta description={`${props.products.name}`} />
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
              <div>
                {currentProductObject ? (
                  <button onClick={() => starsCountUp()}>
                    stars: {currentProductObject.stars}{' '}
                  </button>
                ) : (
                  'not followed'
                )}
              </div>
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
  // const matchingProduct = getProducts.find((product) => {
  //   return product.id === productId;
  // });

  return {
    props: {
      addedProducts: addedProducts || null,
      // product: matchingProduct,
      products,
      // animalId: animalId,
    },
  };
}
