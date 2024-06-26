import BookingCard from "../../components/BookingsCard";
import Button from "../../components/common/Button";
import styles from "./ProfilePage.module.css";
import { getProfile } from "../../API/Data/getProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VenueCard from "../../components/VenueCard";
import EditForm from "../../components/common/EditForm";

const API_BASE = process.env.API_BASE_URL;
const API_PROFILE_PATH = process.env.API_ALL_PROFILES;
const API_PROFILES_URL = `${API_BASE}${API_PROFILE_PATH}`;

function ProfilePage() {
  const [isBooking, setIsBooking] = useState<boolean>(true);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(true);

  const username = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getProfileURL = `${API_PROFILES_URL}/${username}?_bookings=true&_venues=true`;

  const profileHeader = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": process.env.API_KEY,
    },
  };

  const { profileInfo, isLoading, isError } = getProfile(getProfileURL, profileHeader);

  const reversedBookings = profileInfo?.bookings ? [...profileInfo.bookings].reverse() : [];

  function clickCreateVenue() {
    navigate("create-venue");
  }

  function openEditProfile() {
    setIsRemoved(false);
    setTimeout(() => {
      setIsEditProfile(true);
    }, 200)
  }

  function isBeforeToday(date: string) {
    const today = new Date();
    const setDate = new Date(date)
    return setDate < today;
  }

  if(!isLoading && isBooking) {
    return (
      <main className={styles.pageContent}>
        <div
          className={styles.profileBanner}
          style={{ backgroundImage: `url("${profileInfo?.banner.url}")` }}
        >
          <Button text="Edit Profile" type="button" event={() => {openEditProfile()}} />
          <EditForm isOpen={isEditProfile} removed={isRemoved}  avatar={profileInfo?.avatar.url} banner={profileInfo?.banner.url} bio={profileInfo?.bio} venueManager={profileInfo?.venueManager} name={username} changeOpen={setIsEditProfile} setIsRemoved={setIsRemoved}/>
        </div>
        <section className={styles.profileContent}>
          <div className={styles.profileDetails}>
            <img
              src={`${profileInfo?.avatar.url}`}
              alt={`${profileInfo?.avatar.alt}`}
              className={styles.profileImage}
            />
            <h1 className={styles.profileName}>{profileInfo?.name}</h1>
          </div>
          <div className={styles.bookingContainer}>
            <div className={styles.bookingNavigation}>
              <p className={isBooking? styles.active : ""} onClick={() => {setIsBooking(true)}}>My Bookings</p>
              {profileInfo?.venueManager? <p className={!isBooking? styles.active : ""} onClick={() => {setIsBooking(false)}}>My Venues</p> : ""}
            </div>
            {reversedBookings?.map((booking) => {
              const isPastBooking = isBeforeToday(booking.dateTo);
              return(
                <BookingCard key={booking.id} bookings={booking} expired={isPastBooking}/>
              )
            })}
          </div>
        </section>
      </main>
    );
  }

  if(!isLoading && !isBooking) {
    return(
      <main className={styles.pageContent}>
        <div
          className={styles.profileBanner}
          style={{ backgroundImage: `url("${profileInfo?.banner.url}")` }}
        >
          <Button text="Edit Profile" type="button" event={() => {openEditProfile()}} />
        </div>
        <section className={styles.profileContent}>
          <div className={styles.profileDetails}>
            <img
              src={`${profileInfo?.avatar.url}`}
              alt={`${profileInfo?.avatar.alt}`}
              className={styles.profileImage}
            />
            <h1 className={styles.profileName}>{profileInfo?.name}</h1>
          </div>
          <div className={styles.bookingContainer}>
            <div className={styles.bookingNavigation}>
              <p className={isBooking? styles.active : ""} onClick={() => {setIsBooking(true)}}>My Bookings</p>
              {profileInfo?.venueManager? <p className={!isBooking? styles.active : ""} onClick={() => {setIsBooking(false)}}>My Venues</p> : ""}
            </div>
            <Button text="Create Venue" type="button" event={clickCreateVenue}/>
            {profileInfo?.venues.map((venues) => {
              return(
                <VenueCard key={venues.id} id={venues.id} image={venues.media[0].url} alt={venues.media[0].alt} title={venues.name} location={venues.location.country} features={venues.meta} price={venues.price} owner={username}/>
              )
            })}
          </div>
        </section>
      </main>
    )
  }

  if(isError) {
    return(
      <h1>Oops something went wrong!</h1>
    )
  }
}

export default ProfilePage;
