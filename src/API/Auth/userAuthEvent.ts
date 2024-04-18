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

type RegisterResponse = {
  name: string,
  email: string,
  bio: string,
  avatar: {
    url: string,
    alt: string
  },
  banner: {
    url: string,
    alt: string
  },
  venueManager: Boolean
  }

const fakeResponse = {
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

export function userAuthEvents(url: string, verifictaion: {}) {
  const [userInfo, setUserInfo] = useState<LoginResponse>(fakeResponse);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  async function APIFetch() {
    try {
      setIsLoading(true);
      setIsError(false);
      const authEvent = await fetch(url, verifictaion);
      const authResponse = await authEvent.json();
      setUserInfo(authResponse.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {userInfo, isError, isLoading, APIFetch};
}