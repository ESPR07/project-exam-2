import { useEffect, useRef, useState } from "react";
import styles from "./Searchbar.module.css";

function Searchbar({searchWord, searchState, setCurrentPage}: {searchWord: React.Dispatch<React.SetStateAction<string>>, searchState: React.Dispatch<React.SetStateAction<Boolean>>, setCurrentPage: React.Dispatch<React.SetStateAction<number>>}) {
  const [searchInput, setSearchInput] = useState<string>("")

  const stickySearch = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              stickySearch.current?.toggleAttribute('data-stuck', entry.intersectionRatio < 1);
          },
          { threshold: [1] }
      );

      if (stickySearch.current) {
          observer.observe(stickySearch.current);
      }

      return () => {
          observer.disconnect();
      };
  }, []);

  function searchEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.scrollTo(0, 200)
    searchWord(searchInput)
    setCurrentPage(1);
    if(searchInput === "") {
      searchState(false)
    } else {
      searchState(true)
    }
  }

  return(
    <div className={styles.searchContainer} ref={stickySearch}>
      <form className={styles.searchForm} onSubmit={searchEvent}>
        <label htmlFor="search" aria-label="Search Input"></label>
        <input className={styles.searchInput} type="text" placeholder="Search for your next vacation" name="search" onChange={(e) => {
          setSearchInput(e.target.value)
        }}/>
        <button type="submit" className={styles.searchButton}></button>
      </form>
    </div>
  )
}

export default Searchbar;