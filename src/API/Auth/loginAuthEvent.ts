import { useState } from "react";

type LoginResponse = {
  name: string,
  email: string,
  avatar: {
    url: string,
    alt: string
  },
  banner: {
    url: string,
    alt: string
  },
  accessToken: string
}

export const fakeResponse = {
  "name": "my_username",
  "email": "first.last@stud.noroff.no",
  "avatar": {
    "url": "https://img.service.com/avatar.jpg",
    "alt": "My avatar alt text"
  },
  "banner": {
    "url": "https://img.service.com/banner.jpg",
    "alt": "My banner alt text"
  },
  "accessToken": "Fake Key"
  }

export function loginAuthEvents() {
  const [userInfo, setUserInfo] = useState<LoginResponse>(fakeResponse);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function APIFetch(url: string, verifictaion: {}) {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      if(authEvent.ok === true) {
        const authResponse = await authEvent.json();
        console.log(authResponse.data);
        setUserInfo(authResponse.data);
        localStorage.setItem("token", authResponse.data.accessToken);
        localStorage.setItem("name", authResponse.data.name);
        localStorage.setItem("avatar", authResponse.data.avatar.url);
        localStorage.setItem("banner", authResponse.data.banner.url);
        localStorage.setItem("isManager", authResponse.data.venueManager);
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

  return {userInfo, isError, isLoading, APIFetch, setUserInfo};
}