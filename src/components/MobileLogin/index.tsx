import { Link } from "react-router-dom";
import Button from "../common/Button";
import styles from "./MobileLogin.module.css";

type ToggleStatus = {
  toggleStatus: Boolean
}

function MobileLogin({toggleStatus}: ToggleStatus) {
  return(
    <form className={`${styles.formContainer} ${!toggleStatus? styles.closed: ""}`}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email"/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password"/>
      <Button text="Log In" type="submit" event={(e) => {
        e?.preventDefault();
      }}/>
      <Link to="/" className={styles.registerLink}>Don't have an account? <br/> Register here!</Link>
    </form>
  )
}

export default MobileLogin;