import { Link } from "react-router-dom";
import Button from "../common/Button";
import styles from "./MobileLogin.module.css";

type MobileLoginForm = {
  toggleStatus: Boolean,
  emailInput: string,
  passwordInput: string,
  emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  loginEvent: () => void
}

function MobileLogin({toggleStatus, emailInput, passwordInput, emailChange, passwordChange, loginEvent}: MobileLoginForm) {
  return(
    <form className={`${styles.formContainer} ${!toggleStatus? styles.closed: ""}`} onSubmit={(e) => {
      e.preventDefault();
      loginEvent();
    }}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={emailInput} onChange={emailChange}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={passwordInput} onChange={passwordChange}/>
      <Button text="Log In" type="submit" event={() => {}}/>
      <Link to="/" className={styles.registerLink}>Don't have an account? <br/> Register here!</Link>
    </form>
  )
}

export default MobileLogin;