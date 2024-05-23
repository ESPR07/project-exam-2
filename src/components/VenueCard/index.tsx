import { Link, useNavigate } from "react-router-dom";
import FeatureCard from "../common/FeatureCards";
import styles from "./VenueCard.module.css";
import { useEffect, useState } from "react";
import OwnerInteractions from "../common/OwnerInteractions";

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
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVenueID(id);
    const name = localStorage.getItem("name");
    if(name === owner) {
      setIsOwner(true);
    }
  }, [])

  function clickEvent(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      navigate(`/venue/${id}`)
    }, 800)
  }

  return(
    <Link to={`/venue/${id}`} className={`${styles.venueContainer} ${!isClicked? styles.notClicked : styles.clicked}`} onClick={clickEvent}>
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