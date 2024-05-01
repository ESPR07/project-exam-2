import { Link, useParams } from "react-router-dom";
import styles from "./VenuePage.module.css";
import ImageCarousel from "../components/ImageCarousel/ImageCarousel";
import FeatureCard from "../components/common/FeatureCards/FeatureCards";
import { getSingleVenue } from "../API/Data/getSingleVenue";
import BookingForm from "../components/BookingForm/BookingForm";

function VenuePage() {
  let {id} = useParams();
  const API_BASE = process.env.API_BASE_URL;
  const API_VENUE_PATH = process.env.API_VENUES;
  const API_VENUE_URL = `${API_BASE}${API_VENUE_PATH}/${id}?_bookings=true`

  const {venueData, isLoading, isError} = getSingleVenue(API_VENUE_URL);

  if(isLoading) {
    return(
      <>
      <Link to="/" className={styles.backButton}><span className={styles.backIcon}></span>Back</Link>
      <h1>Loading...</h1>
      </>
    )
  }

  if(isError) {
    <>
    <Link to="/" className={styles.backButton}><span className={styles.backIcon}></span>Back</Link>
    <h1>Oops something went wrong!</h1>
    </>
  }

  return(
    <main className={styles.pageContent}>
      <Link to="/" className={styles.backButton}><span className={styles.backIcon}></span>Back</Link>
      <ImageCarousel images={venueData.media}/>
      <section className={styles.venueInfo}>
        <h1>{venueData.name}</h1>
        <p>{venueData.location.country}</p>
        <FeatureCard {...venueData.meta}/>
        <p>{venueData.description}</p>
        <BookingForm venueID={venueData.id} bookings={venueData.bookings}/>
      </section>
    </main>
  )
}

export default VenuePage;