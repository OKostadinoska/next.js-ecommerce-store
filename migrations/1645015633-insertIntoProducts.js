const products = [
  {
    // id: '1',
    name: 'Tiny',
    price: 47,
    type: 'Dragon',
  },
  {
    // id: '2',
    name: 'Pete',
    price: 4,
    type: 'Iguana',
  },
  {
    // id: '3',
    name: 'Randolph',
    price: 9,
    type: 'Parakeet',
  },
  {
    // id: '4',
    name: 'George',
    price: 2,
    type: 'Tiger',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO products ${sql(products, 'name', 'price', 'type')}
  `;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
      DELETE FROM
			products
      WHERE
        name = ${product.name} AND
        price = ${product.price} AND
        type = ${product.type}

				`;
  }
};
