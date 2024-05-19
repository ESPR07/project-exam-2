import { useState } from "react";


export function updateVenue() {
  const [venueSuccess, setVenueSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  async function venueFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        setVenueSuccess(authResponse? true : false);
      } else {
        setIsError(true);
      }
      return authEvent;
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {venueSuccess, isError, isLoading, venueFetch};
}