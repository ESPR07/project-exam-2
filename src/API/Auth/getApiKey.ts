import { useState } from "react";

export function getApiKey() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function keyFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        return authResponse
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

  return {isError, isLoading, keyFetch};
}