import { useContext } from "react";
import Banner from "../components/Banner/Banner";
import Searchbar from "../components/Searchbar/Searchbar";
import VenueCard from "../components/VenueCard/VenueCard";
import styles from "./Homepage.module.css";
import { VenuesContext } from "../App";

function Homepage() {
  const {allVenues, loading, error} = useContext(VenuesContext);

  console.log("Venue List: ", allVenues);
  console.log("Loading: ", loading);
  console.log("Error: ", error);

  return(
    <main className={styles.homepageContainer}>
      <Banner/>
      <section className={styles.pageContent}>
        <Searchbar/>
        {allVenues.data.map((venue) => {
          return(
            <VenueCard key={venue.id} id={venue.id} image={venue.media[0].url} alt={venue.media[0].alt} title={venue.name} location={venue.location.country} features={venue.meta} price={venue.price}/>
          )
        })}
      </section>
    </main>
  )
}

export default Homepage;