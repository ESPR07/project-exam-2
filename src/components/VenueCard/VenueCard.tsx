import { Link } from "react-router-dom";
import FeatureCard from "../common/FeatureCards/FeatureCards";
import styles from "./VenueCard.module.css";

type VenueCard = {
  id: string,
  image: string,
  alt: string,
  title: string,
  location: string,
  features: {
    wifi: Boolean,
    parking: Boolean,
    breakfast: Boolean,
    pets: Boolean
  },
  price: number
}


function VenueCard({id, image, alt, title, location, features, price}: VenueCard) {
  return(
    <Link to={`venue/${id}`} className={styles.venueContainer}>
      <img src={image} alt={alt}/>
      <div className={styles.infoContainer}>
        <h1>{title}</h1>
        <h2><span className={styles.locationIcon}></span>{location}</h2>
        <FeatureCard {...features}/>
      </div>
      <div className={styles.priceContainer}>
        <p>Per/Night:</p>
        <p>${price}</p>
      </div>
    </Link>
  )
}

export default VenueCard;