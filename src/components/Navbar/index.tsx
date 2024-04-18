import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../common/Button";
import MobileLogin from "../MobileLogin";
import { useState } from "react";
import { userAuthEvents } from "../../API/Auth/userAuthEvent";

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

  console.log(userInfo);
  console.log(isError);

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
        <form className={styles.loginForm} onSubmit={(e) => {
          e.preventDefault();
          loginEvent();
        }}>
          <input type="email" placeholder="Email" value={userEmail} onChange={emailInputChange}/>
          <input type="password" placeholder="Password" value={userPassword} onChange={passwordInputChange}/>
          <Button text="Log in" type="submit" event={() => {}}/>
        </form>
        <li><Link to="/" className={styles.registerLink}>Register</Link></li>
        <li className={styles.burgerIcon} onClick={() => {setBurgerToggle(!burgerToggle)}}></li>
        <MobileLogin toggleStatus={burgerToggle} emailInput={userEmail} passwordInput={userPassword} emailChange={emailInputChange} passwordChange={passwordInputChange} loginEvent={loginEvent}/>
      </ul>
    </nav>
  )
}

export default Navbar;