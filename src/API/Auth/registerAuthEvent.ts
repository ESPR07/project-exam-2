import { useState } from "react";


export function registerAuthEvents() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function RegisterFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        return authResponse.data
      } else {
        setIsError(true);
        console.log("Something went wrong!");
      }
      return authEvent;
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {isError, isLoading, RegisterFetch};
}