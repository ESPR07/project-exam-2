import { Link, useNavigate } from "react-router-dom";
import styles from "./BookingCard.module.css";
import FeatureCard from "../common/FeatureCards";
import { useState } from "react";

type Bookings =   {
  id: string,
  created: string,
  dateFrom: string,
  dateTo: string,
  guests: number,
  updated: string,
  venue: {
    created: string,
    description: string,
    id: string,
    maxGuests: number,
    name: string,
    price: number,
    updated: string,
    location: {
      address: string,
      city: string,
      zip: string,
      country: string,
      continent: string
    },
    media: [
      {
        url: string,
        alt: string
      }
    ],
    meta: {
      wifi: boolean,
      parking: boolean,
      breakfast: boolean,
      pets: boolean
    },
  },
}

function BookingCard({bookings, expired} : {bookings: Bookings, expired: boolean}) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const bookingVenue = bookings.venue;

  function clickEvent(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      navigate(`/venue/${bookingVenue.id}`)
    }, 800)
  }

  return(
  <Link to={`/venue/${bookingVenue.id}`} className={`${styles.venueContainer} ${!isClicked? styles.notClicked : styles.clicked}`} onClick={clickEvent}>
    <img src={bookingVenue.media[0].url} alt={bookingVenue.media[0].alt} className={expired? styles.expired : ""}/>
    {expired? <p className={styles.expiredTag}>Expired</p>: ""}
    <div className={`${styles.infoContainer}`}>
      <h1>{bookingVenue.name}</h1>
      <div className={styles.metaInfo}>
        <h2><span className={styles.locationIcon}></span>{bookingVenue.location.country}</h2>
        <p className={styles.guestsAmount}>Guests: {bookings.guests}</p>
      </div>
    </div>
    <FeatureCard {...bookingVenue.meta}/>
    <div className={styles.dateContainer}>
      <p>Dates:</p>
      <p>{bookings.dateFrom.split("T")[0]}</p>
      <p>{bookings.dateTo.split("T")[0]}</p>
    </div>
  </Link>
  )
}

export default BookingCard;