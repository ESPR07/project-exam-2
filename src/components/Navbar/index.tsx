import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../common/Button";
import MobileLogin from "../MobileLogin";
import { useState } from "react";

function Navbar() {
  const [burgerToggle, setBurgerToggle] = useState<Boolean>(false)

  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLogo}></Link>
      <ul className={styles.navList}>
        <form className={styles.loginForm}>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
          <Button text="Log in" type="submit" event={() => {}}/>
        </form>
        <li><Link to="/" className={styles.registerLink}>Register</Link></li>
        <li className={styles.burgerIcon} onClick={() => {setBurgerToggle(!burgerToggle)}}></li>
        <MobileLogin toggleStatus={burgerToggle}/>
      </ul>
    </nav>
  )
}

export default Navbar;