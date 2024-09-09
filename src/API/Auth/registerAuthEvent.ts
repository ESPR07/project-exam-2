import { useState } from "react";


export function registerAuthEvents() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function RegisterFetch(url: string, verifictaion: {}): Promise<Response | undefined> {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        return authEvent;
      } else {
        setIsError(true);
      }
      return authEvent;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {isError, isLoading, RegisterFetch};
}