import { deleteVenue } from "../../../API/Data/deleteVenue";
import styles from "./OwnerInteractions.module.css";

const API_BASE = process.env.API_BASE_URL;
const API_VENUES = process.env.API_VENUES;

function OwnerInteractions({id}: {id: string}) {
  const API_VENUE_DELETE_URL = `${API_BASE}${API_VENUES}/${id}`;
  const {deleteFetch} = deleteVenue();

  function deleteVenueEvent(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const header = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      }
    };

    deleteFetch(API_VENUE_DELETE_URL, header);
  }

  return(
    <div className={styles.ownerInteractions}>
        <button type="button" className={styles.edit}></button>
        <button type="button" className={styles.delete} onClick={deleteVenueEvent}></button>
    </div>
  )
}

export default OwnerInteractions;