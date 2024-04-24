import Banner from "../components/Banner/Banner";
import Searchbar from "../components/Searchbar/Searchbar";
import VenueCard from "../components/VenueCard/VenueCard";
import styles from "./Homepage.module.css";

function Homepage() {
  return(
    <main className={styles.homepageContainer}>
      <Banner/>
      <section className={styles.pageContent}>
        <Searchbar/>
        <VenueCard/>
      </section>
    </main>
  )
}

export default Homepage;