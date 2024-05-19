import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import MobileLogin from "../MobileLogin";
import { useContext, useState } from "react";
import { fakeResponse, loginAuthEvents } from "../../API/Auth/loginAuthEvent";
import DesktopLogin from "../DesktopLogin";
import Button from "../common/Button";
import { AuthContext } from "../../App";

const API_BASE = process.env.API_BASE_URL;
const API_LOGIN_PATH = process.env.API_LOGIN;
const API_LOGIN_URL = `${API_BASE}${API_LOGIN_PATH}?_holidaze=true`

function Navbar() {
  const [burgerToggle, setBurgerToggle] = useState<Boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);

  const profileInfo = useContext(AuthContext);
  
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

  const {APIFetch, setUserInfo} = loginAuthEvents();

  function emailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
  }

  function passwordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserPassword(e.target.value);
  }

  async function loginEvent() {
    const response = await APIFetch(API_LOGIN_URL, loginDetails);
    if(response?.ok === true) {
      setIsErrorMessage(false);
      setUserEmail("");
      setUserPassword("");
      setIsLoggedIn(true);
    } else {
      setIsErrorMessage(true);
      setTimeout(() => {
        setIsErrorMessage(false);
      }, 2000)
    }
  }

  function logoutEvent() {
    localStorage.clear();
    setUserInfo(fakeResponse);
    setIsLoggedIn(false);
  }

  if(isLoggedIn) {
    return(
      <nav className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}></Link>
        <ul className={styles.navList}>
          <Link to="/profile" className={styles.profileButton} style={{ backgroundImage: `url("${profileInfo?.avatar}")` }}></Link>
          <Button text="Logout" type="button" event={logoutEvent}/>
        </ul>
      </nav>
    )
  }


  return (
    <nav className={styles.navContainer}>
      <Link to="/" className={styles.navLogo}></Link>
      <ul className={styles.navList}>
        <DesktopLogin emailInput={userEmail} passwordInput={userPassword} emailChange={emailInputChange} passwordChange={passwordInputChange} loginEvent={loginEvent} isErrorMessage={isErrorMessage}/>
        <li><Link to="/register" className={styles.registerLink}>Register</Link></li>
        <li className={styles.burgerIcon} onClick={() => {setBurgerToggle(!burgerToggle)}}></li>
        <MobileLogin toggleStatus={burgerToggle} emailInput={userEmail} passwordInput={userPassword} emailChange={emailInputChange} passwordChange={passwordInputChange} loginEvent={loginEvent} isErrorMessage={isErrorMessage}/>
      </ul>
    </nav>
  )
}

export default Navbar;