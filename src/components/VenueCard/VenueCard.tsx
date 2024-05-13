import { Link } from "react-router-dom";
import FeatureCard from "../common/FeatureCards/FeatureCards";
import styles from "./VenueCard.module.css";
import { useEffect, useState } from "react";
import OwnerInteractions from "../common/OwnerInteractions/OwnerInteractions";

type VenueCard = {
  id: string,
  image: string,
  alt: string,
  title: string,
  location: string,
  owner: string | null,
  features: {
    wifi: Boolean,
    parking: Boolean,
    breakfast: Boolean,
    pets: Boolean
  },
  price: number
}


function VenueCard({id, image, alt, title, location, features, price, owner}: VenueCard) {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [venueID, setVenueID] = useState<string>("");
  useEffect(() => {
    setVenueID(id);
    const name = localStorage.getItem("name");
    if(name === owner) {
      setIsOwner(true);
    }
  }, [])

  return(
    <Link to={`venue/${id}`} className={styles.venueContainer}>
      <img src={image} alt={alt}/>
      <div className={styles.infoContainer}>
        <h1>{title}</h1>
        <h2><span className={styles.locationIcon}></span>{location}</h2>
      </div>
      {isOwner? <OwnerInteractions id={venueID}/> : ""}
      <FeatureCard {...features}/>
      <div className={styles.priceContainer}>
        <p>Per/Night:</p>
        <p>${price}</p>
      </div>
    </Link>
  )
}

export default VenueCard;