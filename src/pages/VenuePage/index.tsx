import { useNavigate, useParams } from "react-router-dom";
import styles from "./VenuePage.module.css";
import ImageCarousel from "../../components/ImageCarousel";
import FeatureCard from "../../components/common/FeatureCards";
import { getSingleVenue } from "../../API/Data/getSingleVenue";
import BookingForm from "../../components/BookingForm";
import { useContext } from "react";
import { AuthContext } from "../../App";

function VenuePage() {
  let {id} = useParams();
  const API_BASE = process.env.API_BASE_URL;
  const API_VENUE_PATH = process.env.API_VENUES;
  const API_VENUE_URL = `${API_BASE}${API_VENUE_PATH}/${id}?_bookings=true&_owner=true`

  const {venueData, isLoading, isError} = getSingleVenue(API_VENUE_URL);
  const profileInfo = useContext(AuthContext);
  const navigate = useNavigate();

  function goBack(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate(-1);
  }

  function ManagerView() {
    return(
      <div className={styles.dynamicBox}>
        <h2>Bookings on venue:</h2>
        <div className={styles.bookingListContanier}>
          {venueData.bookings.map((booking) => {
            return(
              <div key={booking.id} className={styles.bookingContainer}>
                <p>{booking.customer.name}</p>
                <div className={styles.bookingDates}>
                  <p>{booking.dateFrom.split("T")[0]}</p>
                  <p>Until</p>
                  <p>{booking.dateTo.split("T")[0]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if(isLoading) {
    return(
      <>
      <button className={styles.backButton} onClick={goBack}><span className={styles.backIcon}></span>Back</button>
      <h1>Loading...</h1>
      </>
    )
  }

  if(isError) {
    <>
    <button className={styles.backButton} onClick={goBack}><span className={styles.backIcon}></span>Back</button>
    <h1>Oops something went wrong!</h1>
    </>
  }

  return(
    <main className={styles.pageContent}>
      <button className={styles.backButton} onClick={goBack}><span className={styles.backIcon}></span>Back</button>
      <ImageCarousel images={venueData.media}/>
      <section className={styles.venueInfo}>
        <h1>{venueData.name}</h1>
        <p>{venueData.location.country}</p>
        <FeatureCard {...venueData.meta}/>
        <p>{venueData.description}</p>
        {profileInfo.isVenueManager && venueData.owner.name === profileInfo.name? <ManagerView/> : <BookingForm venueID={venueData.id} bookings={venueData.bookings} maxGuests={venueData.maxGuests}/>}
      </section>
    </main>
  )
}

export default VenuePage;