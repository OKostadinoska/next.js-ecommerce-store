exports.up = async (sql) => {
  // <insert magic here>
  await sql`
		CREATE TABLE products (
			id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name varchar(20) NOT NULL,
			price integer NOT NULL,
			type varchar(30) NOT NULL
		);
	`;
};

exports.down = async (sql) => {
  // just in case...
  await sql`
	DROP TABLE products
	`;
};
