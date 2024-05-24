import { useState } from "react";

export function deleteVenue() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function deleteFetch(url: string, verification: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verification);
      if(authEvent.ok === true) {
        alert("Venue has been deleted.");
      } else {
        console.log(await authEvent.json());
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {isError, isLoading, deleteFetch};
}