import { useEffect, useState } from "react";

type ProfileResponse = {
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
  bookings: [
    {
      id: string,
      created: string,
      dateFrom: string,
      dateTo: string,
      guests: number,
      updated: string,
      venue: {
        created: string,
        description: string,
        id: string,
        maxGuests: number,
        name: string,
        price: number,
        updated: string,
        location: {
          address: string,
          city: string,
          zip: string,
          country: string,
          continent: string
        },
        media: [
          {
            url: string,
            alt: string
          }
        ],
        meta: {
          wifi: boolean,
          parking: boolean,
          breakfast: boolean,
          pets: boolean
        },
      },
    }
  ],
  venues: [
    {
      id: string,
      created: string,
      description: string,
      maxGuests: number,
      name: string,
      price: number,
      rating: number,
      updated: string,
      media: [
        {
          url: string,
          alt: string
        }
      ],
      meta: {
        wifi: boolean,
        parking: boolean,
        breakfast: boolean,
        pets: boolean
      },
      location: {
        address: string,
        city: string,
        continent: string,
        country: string,
        lat: number,
        lng: number,
        zip: string
      }
    }
  ],
  venueManager: boolean,
  _count: {
    venues: number,
    bookings: number
  }
}


export function getProfile(url: string, verification: {}) {
  const [profileInfo, setProfileInfo] = useState<ProfileResponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const authEvent = await fetch(url, verification);
        if(authEvent.ok === true) {
          const authResponse = await authEvent.json();
          setProfileInfo(authResponse.data);
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [])

  return {profileInfo, isError, isLoading};
}