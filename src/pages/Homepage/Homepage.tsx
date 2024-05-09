import { useState } from "react";
import { getVenueList } from "../../API/Data/getVenueList";
import Banner from "../../components/Banner/Banner";
import Searchbar from "../../components/Searchbar/Searchbar";
import VenueCard from "../../components/VenueCard/VenueCard";
import styles from "./Homepage.module.css";

const API_BASE = process.env.API_BASE_URL;
const API_VENUES_PATH = process.env.API_VENUES;
const API_VENUES_URL = `${API_BASE}${API_VENUES_PATH}`

function Homepage() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isSearched, setIsSearched] = useState<Boolean>(false);

  const defaultURL = `${API_VENUES_URL}?limit=10`;
  const searchedURL = `${API_VENUES_URL}/search?q=${searchWord}&limit=10`;

  const {venueList, isLoading, isError} = getVenueList(!isSearched? defaultURL : searchedURL);

  if(isLoading) {
    return(
      <main className={styles.homepageContainer}>
      <Banner/>
      <section className={styles.pageContent}>
        <Searchbar searchWord={setSearchWord} searchState={setIsSearched}/>
        <h1>Loading...</h1>
      </section>
    </main>
    )
  }

  if(isError) {
    return(
      <main className={styles.homepageContainer}>
      <Banner/>
      <section className={styles.pageContent}>
        <Searchbar searchWord={setSearchWord} searchState={setIsSearched}/>
        <h1>Oops Something went wrong!</h1>
      </section>
    </main>
    )
  }

  return(
    <main className={styles.homepageContainer}>
      <Banner/>
      <section className={styles.pageContent}>
        <Searchbar searchWord={setSearchWord} searchState={setIsSearched}/>
        {venueList.data.map((venue) => {
          return(
            <VenueCard key={venue.id} id={venue.id} image={venue.media[0]?.url} alt={venue.media[0]?.alt} title={venue.name} location={venue.location.country} features={venue.meta} price={venue.price}/>
          )
        })}
      </section>
    </main>
  )
}

export default Homepage;