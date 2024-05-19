import { useState } from "react";

export function updateUserEvent() {
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  async function updateUserFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        setUpdateSuccess(authResponse? true : false);
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

  return {updateSuccess, isError, isLoading, updateUserFetch};
}