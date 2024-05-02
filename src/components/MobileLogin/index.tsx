import { Link } from "react-router-dom";
import Button from "../common/Button";
import styles from "./MobileLogin.module.css";
import { useEffect, useState } from "react";

type MobileLoginForm = {
  toggleStatus: Boolean,
  emailInput: string,
  passwordInput: string,
  emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  loginEvent: () => void
}

function MobileLogin({toggleStatus, emailInput, passwordInput, emailChange, passwordChange, loginEvent}: MobileLoginForm) {
  const [hideMenu, setHideMenu] = useState(true);

  useEffect(() => {
    if(toggleStatus === false) {
      setTimeout(() => {
        setHideMenu(true)
      }, 500)
    } else {
      setHideMenu(false)
    }
  }, [toggleStatus])

  return(
    <form className={`${styles.formContainer} ${!toggleStatus? styles.closed: ""} ${hideMenu? styles.hidden: ""}`} onSubmit={(e) => {
      e.preventDefault();
      loginEvent();
    }}>
      <label htmlFor="email" className={styles.label}>Email:</label>
      <input type="email" id="email" className={styles.input} value={emailInput} onChange={emailChange}/>
      <label htmlFor="password" className={styles.label}>Password:</label>
      <input type="password" id="password" className={styles.input} value={passwordInput} onChange={passwordChange}/>
      <Button text="Log In" type="submit" event={() => {}}/>
      <Link to="/register" className={styles.registerLink}>Don't have an account? <br/> Register here!</Link>
    </form>
  )
}

export default MobileLogin;