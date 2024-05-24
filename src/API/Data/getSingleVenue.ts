import { useEffect, useState } from "react";

type SingleVenue = {
  id: string,
  name: string,
  description: string,
  media: [
    {
      url: string,
      alt: string
    },
  ],
  bookings: [
    {
      created: string,
      customer: {
        name: string,
        email: string,
        bio: string | null,
        avatar: {
          url: string,
          alt: string
        },
        banner: {
          url: string,
          alt: string
        },
      },
      dateFrom: string,
      dateTo: string,
      guests: number,
      id: string,
      updated: string
    }
  ],
  price: number,
  maxGuests: number,
  rating: number,
  created: string,
  updated: string,
  meta: {
    wifi: true,
    parking: true,
    breakfast: true,
    pets: true
  },
  location: {
    address: string,
    city: string,
    zip: string,
    country: string,
    continent: string,
    lat: number,
    lng: number
  },
  owner: {
    name: string,
  }
}

const fakeSingleVenue: SingleVenue = {
  id: "fake",
  name: "string",
  description: "string",
  media: [
    {
      url: "https://url.com/image.jpg",
      alt: "string"
    },
  ],
  bookings: [
    {
      created: "string",
      customer: {
        name: "string",
        email: "string",
        bio: "string",
        avatar: {
          url: "string",
          alt: "string"
        },
        banner: {
          url: "string",
          alt: "string"
        }
      },
      dateFrom: "string",
      dateTo: "string",
      guests: 1,
      id: "string",
      updated: "string"
    }
  ],
  price: 0,
  maxGuests: 0,
  rating: 0,
  created: "string",
  updated: "string",
  meta: {
    wifi: true,
    parking: true,
    breakfast: true,
    pets: true
  },
  location: {
    address: "string",
    city: "string",
    zip: "string",
    country: "string",
    continent: "string",
    lat: 0,
    lng: 0
  },
  owner: {
    name: "string",
  }
}

export function getSingleVenue(url: string) {
  const [venueData, setVenueData] = useState<SingleVenue>(fakeSingleVenue);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  useEffect(() => {
    async function APIFetch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const authEvent = await fetch(url);
        if(authEvent.ok === true) {
          const authResponse = await authEvent.json();
          setVenueData(authResponse.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [])

  return {venueData, isError, isLoading};
}