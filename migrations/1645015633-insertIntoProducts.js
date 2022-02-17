const products = [
  {
    // id: '1',
    name: 'Vinyl Player',
    price: 47,
    type: 'music tool',
  },
  {
    // id: '2',
    name: 'Guitar',
    price: 4,
    type: 'music instrument',
  },
  {
    // id: '3',
    name: 'Saxophone',
    price: 9,
    type: 'music instrument',
  },
  {
    // id: '4',
    name: 'Microfon',
    price: 2,
    type: 'music tool',
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
