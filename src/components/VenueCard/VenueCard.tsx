import styles from "./VenueCard.module.css";

function VenueCard() {
  return(
    <div className={styles.venueContainer}>
      <img src="/src/assets/banner.webp"/>
      <div className={styles.infoContainer}>
        <h1>Title</h1>
        <h2><span className={styles.locationIcon}></span>Location</h2>
      </div>
      <div className={styles.priceContainer}>
        <p>Per/Night:</p>
        <p>$200</p>
      </div>
    </div>
  )
}

export default VenueCard;