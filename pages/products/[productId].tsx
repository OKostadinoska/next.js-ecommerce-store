import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';
import { getProductById } from '../../util/database';

type Props = {
  product: {
    id: number;
    name: string;
    amount: number;
    price: number;
  };
};

type CookieObject = {
  id: number;
  name: string;
  amount: number;
};

export default function SinglePRoduct(props: Props) {
  const [amount, setAmount] = useState(1);
  // 1. get the value of the cookie
  const cookieValue = getParsedCookie('addedProducts') || [];
  const [cart, setCart] = useState(cookieValue);

  const router = useRouter();

  // decrement amount added to cart
  function handleDecrementAmount() {
    if (amount <= 1) {
      setAmount(1);
      return;
    }
    setAmount(amount - 1);
  }

  // increment amount added to cart
  function handleIncrementAmount() {
    return setAmount(amount + 1);
  }

  function addProductToCart(id: number) {
    // is id in array => return true or false
    const existIdOnArray = cart.some(
      (cookieObject: CookieObject) => cookieObject.id === id,
    );

    // find in array => return single object with same id
    const productWithSameId = cart.find(
      (cookieObject: CookieObject) => cookieObject.id === id,
    );
    // filter array => return an array without product with same id
    const productWithDifferentId = cart.filter(
      (cookieObject: CookieObject) => cookieObject.id !== id,
    );

    let newCookie;
    // if cookie id exists, update amount
    if (existIdOnArray) {
      newCookie = [
        ...productWithDifferentId,
        {
          id: productWithSameId.id,
          amount: productWithSameId.amount + amount,
          name: productWithSameId.name,
        },
      ];
      // add new cookie
    } else {
      newCookie = [
        ...cookieValue,
        { id: id, amount: amount, name: props.product.name },
      ];
    }

    // 3. set the new value of the cookie

    setParsedCookie('addedProducts', newCookie);
    setCart(newCookie);

    router.push(`/shoppingCart`);
  }

  return (
    <Layout>
      <div className={styles.singleProduct}>
        <div>
          <Head>
            <title>{props.product.name}</title>
            <meta name="description" content={props.product.name} />
          </Head>

          <div className={styles.singleProduct}>
            <div className={styles.singleImage}>
              <Image
                src={`/images/${props.product.id}.png`}
                width="300"
                height="300"
              />
            </div>
            <div className={styles.singleProduct}>
              <div className={styles.singleImage}>
                {/* <div>id: {props.product.id}</div> */}
                <div> {props.product.name}</div>
                <div> {props.product.price} € </div>
              </div>
              <div>
                <button onClick={() => handleDecrementAmount()}>-</button>
                <span>{amount}</span>
                <button onClick={() => handleIncrementAmount()}>+</button>
                <Button
                  basic
                  color="purple"
                  onClick={() => addProductToCart(props.product.id)}
                >
                  Add to Cart
                </Button>
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // This is the variable that we get from the URL
  // (anything after the slash)
  const productId = context.query.productId;
  console.log('db', productId);
  const product = await getProductById(productId);

  const addedProductsOnCookies = context.req.cookies.addedProducts || '[]';

  // if there is no addedProduct cookie on the browser we store to an [] otherwise we get the cooke value and parse it
  const addedProducts = JSON.parse(addedProductsOnCookies);

  return {
    props: {
      addedProducts: addedProducts || null,
      product,
    },
  };
}
