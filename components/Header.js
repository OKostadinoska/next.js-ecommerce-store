import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header() {
  return (
    <nav>
      <div id={styles.menuToggle}>
        <input type="checkbox" />
        <span />
        <span />
        <span />
        <ul id={styles.menu}>
          <div className={styles.menuItem}>
            <Link href="/">
              <a className={styles.menuItemLink}>Home</a>
            </Link>
            <img
              className={styles.menuItemImageRight}
              src="images/5.png"
              alt=""
            />
          </div>
          <div>
            <Link href="/productList">
              <a className={styles.menuItemLink}>Products</a>
            </Link>
            <img
              className={styles.menuItemImageLeft}
              src="images/5.png"
              alt=""
            />
          </div>
          <div className={styles.menuItem}>
            <Link href="/about">
              <a className={styles.menuItemLink}>Our Story</a>
            </Link>
            <img
              className={styles.menuItemImageRight}
              src="images/5.png"
              alt=""
            />
          </div>
        </ul>
      </div>
      <div className={styles.shoppingCart}>
        <Link href="/shoppingCart">
          <a>Shopping Cart 🛒</a>
        </Link>
      </div>
    </nav>
  );
}
