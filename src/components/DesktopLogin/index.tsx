import Button from "../common/Button";
import styles from "./DesktopLogin.module.css";

type DesktopLoginForm = {
  emailInput: string,
  passwordInput: string,
  emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  loginEvent: () => void
}

function DesktopLogin({emailInput, passwordInput, emailChange, passwordChange, loginEvent}: DesktopLoginForm) {
  return(
    <form className={styles.loginForm} onSubmit={(e) => {
      e.preventDefault();
      loginEvent();
    }}>
      <input type="email" placeholder="Email" value={emailInput} onChange={emailChange}/>
      <input type="password" placeholder="Password" value={passwordInput} onChange={passwordChange}/>
      <Button text="Log in" type="submit" event={() => {}}/>
    </form>
  )
}

export default DesktopLogin;