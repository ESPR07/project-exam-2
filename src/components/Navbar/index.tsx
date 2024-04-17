import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  
  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLogo}></Link>
      <ul className={styles.navList}>
        <li className={styles.navItemDesktop}>Login</li>
        <li className={styles.navItemDesktop}>Register</li>
        <li className={styles.burgerIcon}></li>
      </ul>
    </nav>
  )
}

export default Navbar;