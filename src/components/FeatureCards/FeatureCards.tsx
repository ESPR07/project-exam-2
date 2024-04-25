import styles from "./FeatureCards.module.css";

type FeatureCard = {
  wifi: Boolean,
  parking: Boolean,
  breakfast: Boolean,
  pets: Boolean
}

function FeatureCard({wifi, parking, breakfast, pets}: FeatureCard) {
  return(
    <div className={styles.featureContainer}>
      {wifi? <div className={styles.featureCard}>Wi-Fi</div>: ""}
      {parking? <div className={styles.featureCard}>Parking</div>: ""}
      {breakfast? <div className={styles.featureCard}>Breakfast</div>: ""}
      {pets? <div className={styles.featureCard}>Pets</div>: ""}
    </div>
  )
}

export default FeatureCard;