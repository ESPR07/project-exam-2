import BookingCard from "../../components/BookingsCard/BookingsCard";
import Button from "../../components/common/Button";
import styles from "./ProfilePage.module.css";
import { getProfile } from "../../API/Data/getProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.API_BASE_URL;
const API_PROFILE_PATH = process.env.API_ALL_PROFILES;
const API_PROFILES_URL = `${API_BASE}${API_PROFILE_PATH}`;

function ProfilePage() {
  const [isBooking, setIsBooking] = useState<boolean>(true);

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

  function clickCreateVenue() {
    navigate("create-venue");
  }

  if(!isLoading && isBooking) {
    return (
      <main className={styles.pageContent}>
        <div
          className={styles.profileBanner}
          style={{ backgroundImage: `url("${profileInfo?.banner.url}")` }}
        >
          <Button text="Edit Profile" type="button" event={() => {}} />
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
              <p className={!isBooking? styles.active : ""} onClick={() => {setIsBooking(false)}}>My Venues</p>
            </div>
            {profileInfo?.bookings.map((booking) => {
              return(
                <BookingCard key={booking.id} bookings={booking}/>
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
          <Button text="Edit Profile" type="button" event={() => {
            console.log("Hello")
            const navigate = useNavigate();
            navigate("/");
          }} />
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
              <p className={!isBooking? styles.active : ""} onClick={() => {setIsBooking(false)}}>My Venues</p>
            </div>
            <Button text="Create Venue" type="button" event={clickCreateVenue}/>
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
