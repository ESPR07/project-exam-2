import styles from "./Searchbar.module.css";

function Searchbar() {
  return(
    <div className={styles.searchContainer}>
      <form className={styles.searchForm}>
        <label htmlFor="search" aria-label="Search Input"></label>
        <input className={styles.searchInput} type="text" placeholder="Search"/>
        <button type="submit" className={styles.searchButton}></button>
      </form>
    </div>
  )
}

export default Searchbar;