import Button from "../common/Button";
import styles from "./DesktopLogin.module.css";

type DesktopLoginForm = {
  emailInput: string,
  passwordInput: string,
  emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  loginEvent: () => void,
  isErrorMessage: boolean,
}

function ErrorMessage() {
  return(
  <div className={styles.errorContainer}>
    <div className={styles.indicator}></div>
    <p>Email or password is incorrect</p>
  </div>
  )
}

function DesktopLogin({emailInput, passwordInput, emailChange, passwordChange, loginEvent, isErrorMessage}: DesktopLoginForm) {
  return(
    <form className={styles.loginForm} onSubmit={(e) => {
      e.preventDefault();
      loginEvent();
    }}>
      <input type="email" placeholder="Email" value={emailInput} onChange={emailChange}/>
      <input type="password" placeholder="Password" value={passwordInput} onChange={passwordChange}/>
      <Button text="Log in" type="submit" event={() => {}}/>
      {isErrorMessage? <ErrorMessage/> : ""}
    </form>
  )
}

export default DesktopLogin;