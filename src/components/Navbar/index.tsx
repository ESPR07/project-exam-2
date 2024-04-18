import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import MobileLogin from "../MobileLogin";
import { useState } from "react";
import { userAuthEvents } from "../../API/Auth/userAuthEvent";
import DesktopLogin from "../DesktopLogin";

const API_BASE = process.env.API_BASE_URL;
const API_LOGIN_PATH = process.env.API_LOGIN;
const API_LOGIN_URL = `${API_BASE}${API_LOGIN_PATH}`

function Navbar() {
  const [burgerToggle, setBurgerToggle] = useState<Boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  
  const loginDetails = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  }

  const {userInfo, isError, isLoading, APIFetch} = userAuthEvents(API_LOGIN_URL, loginDetails);

  if(!isLoading && !isError) {
    localStorage.setItem("token", userInfo.accessToken);
  }


  function emailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
  }

  function passwordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserPassword(e.target.value);
  }

  function loginEvent() {
    APIFetch();
    setUserEmail("");
    setUserPassword("");
  }


  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLogo}></Link>
      <ul className={styles.navList}>
        <DesktopLogin emailInput={userEmail} passwordInput={userPassword} emailChange={emailInputChange} passwordChange={passwordInputChange} loginEvent={loginEvent}/>
        <li><Link to="/" className={styles.registerLink}>Register</Link></li>
        <li className={styles.burgerIcon} onClick={() => {setBurgerToggle(!burgerToggle)}}></li>
        <MobileLogin toggleStatus={burgerToggle} emailInput={userEmail} passwordInput={userPassword} emailChange={emailInputChange} passwordChange={passwordInputChange} loginEvent={loginEvent}/>
      </ul>
    </nav>
  )
}

export default Navbar;