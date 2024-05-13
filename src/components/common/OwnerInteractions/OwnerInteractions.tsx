import styles from "./OwnerInteractions.module.css";

function OwnerInteractions() {
  return(
    <div className={styles.ownerInteractions}>
        <p className={styles.edit}></p>
        <p className={styles.delete}></p>
    </div>
  )
}

export default OwnerInteractions;