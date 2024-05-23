import styles from "./Footer.module.css";

function Footer() {
  return(
    <footer>
      <h2>Happy Traveling!</h2>
      <div className={styles.contacts}>
        <div>
          <h3>Contacts:</h3>
          <p> Phone: +00 567 890 123</p>
          <p>Mail: holidaze@fake.no</p>
        </div>
        <div className={styles.logo}></div>
      </div>
      <p className={styles.developer}>Page made by Sindre Strømsæther Derås @ 2024</p>
    </footer>
  )
}

export default Footer;