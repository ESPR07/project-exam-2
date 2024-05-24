import { useEffect, useState } from "react";

export type VenueList = {
  data: [
    {
      id: string,
      name: string,
      description: string,
      media: [
        {
          url: string,
          alt: string
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
        email: string,
        bio: string
        avatar: {
          url: string,
          alt: string
        },
        banner: {
          url: string,
          alt: string
        }
      },
      bookings: [
        {
          id: string,
          dateFrom: string,
          dateTo: string,
          guests: number,
          created: string,
          updated: string,
          customer: {
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
            }
          }
        }
      ]
    }
  ],
  meta: {
    isFirstPage: Boolean,
    isLastPage: Boolean,
    currentPage: number,
    previousPage: Boolean | null,
    nextPage: Boolean | null,
    pageCount: number,
    totalCount: number
  }
}

export const dummyVenueList: VenueList = {
  data: [
    {
      id: "string",
      name: "string",
      description: "string",
      media: [
        {
          url: "string",
          alt: "string"
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
      bookings: [
        {
          id: "string",
          dateFrom: "string",
          dateTo: "string",
          guests: 0,
          created: "string",
          updated: "string",
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
          }
        }
      ]
    }
  ],
  meta: {
    isFirstPage: true,
    isLastPage: true,
    currentPage: 1,
    previousPage: null,
    nextPage: null,
    pageCount: 1,
    totalCount: 1
  }
}

export function getVenueList(url: string) {
  const [venueList, setVenueList] = useState<VenueList>(dummyVenueList);
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
          setVenueList(authResponse);
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    APIFetch();
  }, [url])

  return {venueList, isError, isLoading};
}