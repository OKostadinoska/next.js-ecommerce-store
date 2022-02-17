import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header() {
  return (
    <nav className={styles.navigation}>
      <div id={styles.menuToggle}>
        <input type="checkbox" />
        <span />
        <span />
        <span />
        <ul id={styles.menu}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/product">
            <a>Products</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </ul>
      </div>
      {/* <Link href="/shoppingCart">
        <a>Shopping Cart 🛒</a>
      </Link> */}
    </nav>
  );
}
