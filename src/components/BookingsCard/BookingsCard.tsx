import { Link } from "react-router-dom";
import styles from "./BookingCard.module.css";
import FeatureCard from "../common/FeatureCards/FeatureCards";

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

function BookingCard({bookings} : {bookings: Bookings}) {

  const bookingVenue = bookings.venue;

  return(
  <Link to={`/venue/${bookingVenue.id}`} className={styles.venueContainer}>
    <img src={bookingVenue.media[0].url} alt={bookingVenue.media[0].alt}/>
    <div className={styles.infoContainer}>
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