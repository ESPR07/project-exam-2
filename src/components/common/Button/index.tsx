import styles from "./Button.module.css";

type Button = {
  text: string,
  type: "button" | "submit" | "reset" | undefined,
  event: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({text, type, event}: Button) {
  return(
    <button className={styles.button} type={type} onClick={event}>{text}</button>
  )
}

export default Button;