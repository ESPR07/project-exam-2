import { useState } from "react";


export function postBooking() {
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  async function bookingFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        setBookingSuccess(authResponse? true : false);
      } else {
        setIsError(true);
      }
      return authEvent;
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {bookingSuccess, isError, isLoading, bookingFetch};
}