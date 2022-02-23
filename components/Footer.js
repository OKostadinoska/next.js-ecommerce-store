import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerSecondary}>
        <p>© 2022 Created by Olivera Kostadinoska</p>
      </div>
    </div>
  );
}
