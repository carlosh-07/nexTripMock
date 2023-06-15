import Link from "next/link";
import styles from "../../app/page.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.leftNav} href="/route">
        By Route
      </Link>
      <Link className={styles.rightNav} href="/stop">
        By Stop #
      </Link>
    </nav>
  );
};
export default Navbar;
