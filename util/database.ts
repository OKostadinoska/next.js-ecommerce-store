// Don't copy this readFileSync - you don't need it
// eslint-disable-next-line unicorn/prefer-node-protocol
// import { readFileSync } from 'fs';
import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();
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
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();

    // Heroku needs SSL connections but

    // has an "unauthorized" certificate

    // https://devcenter.heroku.com/changelog-items/852

    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export type Product = {
  id: number;
  name: string;
  price: string;
  type: string;
};

export async function getProducts() {
  const products = await sql<[Product[]]>`
  SELECT * FROM products;
  `;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProductById(id: number) {
  const [product] = await sql`
    SELECT * FROM products WHERE id = ${id};
  `;
  return camelcaseKeys(product);
}
