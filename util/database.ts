// Don't copy this readFileSync - you don't need it
// eslint-disable-next-line unicorn/prefer-node-protocol
// import { readFileSync } from 'fs';
import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

// Read the environment variables from the .env
// file, which will then be available for all
// following code
config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  // When in development, connect only once to the database
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export type Product = {
  id: number;
  name: string;
  price: number;
  type: string;
};

export async function getProducts() {
  const products = await sql<Product[]>`
    SELECT * FROM products;
  `;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProductById(id: number) {
  const [product] = await sql<[Product | undefined]>`
    SELECT * FROM products WHERE id = ${id};
  `;
  return product && camelcaseKeys(product);
}
