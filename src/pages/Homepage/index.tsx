import { useState } from "react";
import { getVenueList } from "../../API/Data/getVenueList";
import Banner from "../../components/Banner";
import Searchbar from "../../components/Searchbar";
import VenueCard from "../../components/VenueCard";
import styles from "./Homepage.module.css";
import Button from "../../components/common/Button";

const API_BASE = process.env.API_BASE_URL;
const API_VENUES_PATH = process.env.API_VENUES;
const API_VENUES_URL = `${API_BASE}${API_VENUES_PATH}`

function Homepage() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isSearched, setIsSearched] = useState<Boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(1);

  const defaultURL = `${API_VENUES_URL}?limit=10&page=${currentPage}&_owner=true`;
  const searchedURL = `${API_VENUES_URL}/search?q=${searchWord}&limit=10&${currentPage}&_owner=true`;

  const {venueList, isLoading, isError} = getVenueList(!isSearched? defaultURL : searchedURL);

  function increaseVenueAmount() {
    setcurrentPage(prevAmount => prevAmount + 1);
  }

  function decreaseVenueAmount() {
    setcurrentPage(prevAmount => prevAmount - 1);
  }


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
            <VenueCard key={venue.id} id={venue.id} image={venue.media[0]?.url} alt={venue.media[0]?.alt} title={venue.name} location={venue.location.country} features={venue.meta} price={venue.price} owner={venue.owner.name}/>
          )
        })}
        <div className={styles.pageCounter}>
          <Button text="Prev Page" type="button" event={() => {decreaseVenueAmount()}}/>
          <div>
            <p>Page:</p>
            <p>{currentPage}/{venueList.meta.pageCount}</p>
          </div>
          <Button text="Next Page" type="button" event={() => {increaseVenueAmount()}}/>
        </div>
      </section>
    </main>
  )
}

export default Homepage;