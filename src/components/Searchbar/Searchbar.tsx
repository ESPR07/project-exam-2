import { useState } from "react";
import styles from "./Searchbar.module.css";

function Searchbar({searchWord, searchState}: {searchWord: React.Dispatch<React.SetStateAction<string>>, searchState: React.Dispatch<React.SetStateAction<Boolean>>}) {
  const [searchInput, setSearchInput] = useState<string>("")

  return(
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={(e) => {
        e.preventDefault();
        window.scrollTo(0, 200)
        searchWord(searchInput)
        if(searchInput === "") {
          searchState(false)
        } else {
          searchState(true)
        }
      }}>
        <label htmlFor="search" aria-label="Search Input"></label>
        <input className={styles.searchInput} type="text" placeholder="Search" name="search" onChange={(e) => {
          setSearchInput(e.target.value)
        }}/>
        <button type="submit" className={styles.searchButton}></button>
      </form>
    </div>
  )
}

export default Searchbar;