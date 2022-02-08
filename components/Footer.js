import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContentWrapper}>
        <div className={styles.footerClaim}>
          <h4 className={styles.h4}>About</h4>
          <p>
            A collaborative branding and design studio, partnering with
            companies doing great things.
          </p>
        </div>
        <div className={styles.footerMenu}>
          <h4 className={styles.h4}>Menu</h4>
          <Link href="/">
            <a className={styles.footerLink}>Home</a>
          </Link>
          <Link href="/about">
            <a className={styles.footerLink}>About</a>
          </Link>
          <Link href="/shoppingCart">
            <a className={styles.footerLink}>Shopping Cart 🛒</a>
          </Link>
        </div>
      </div>
      <div className={styles.footerSecondary}>
        <p>© 2022 Created by Olivera Kostadinoska</p>
      </div>
    </div>
  );
}
