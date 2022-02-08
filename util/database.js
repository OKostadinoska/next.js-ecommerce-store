// Don't copy this readFileSync - you don't need it
// eslint-disable-next-line unicorn/prefer-node-protocol
// import { readFileSync } from 'fs';

const productsDatabase = [
  {
    id: '1',
    name: 'Tiny',
    price: 47,
    type: 'Dragon',
  },
  {
    id: '2',
    name: 'Pete',
    price: 4,
    type: 'Iguana',
  },
  {
    id: '3',
    name: 'Randolph',
    price: 9,
    type: 'Parakeet',
  },
  {
    id: '4',
    name: 'George',
    price: 2,
    type: 'Tiger',
  },
];

export default productsDatabase;
