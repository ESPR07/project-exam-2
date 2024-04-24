import styles from "./Banner.module.css";

function Banner() {
  return(
    <>
      <div className={styles.bannerImage}></div>
      <p className={styles.bannerText}>Explore the world</p>
    </>
  )
}

export default Banner;