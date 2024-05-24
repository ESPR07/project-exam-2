import { useContext, useEffect, useState } from "react";
import Button from "../common/Button";
import styles from "./BookingForm.module.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { postBooking } from "../../API/Data/postBooking";
import { AuthContext } from "../../App";

const defaultValue = new Date();

type DateValue = Date | null;

type DateMinMax = Date | undefined;

type Value = DateValue | [DateValue, DateValue];

type Bookings = [
  {
    id: string,
    created: string,
    dateFrom: string,
    dateTo: string,
    guests: number,
    updated: string,
    customer: {
      name: string,
      email: string,
      bio: string | null
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

const API_BASE = process.env.API_BASE_URL;
const API_BOOKING_PATH = process.env.API_BOOKINGS;
const API_POST_BOOKING_URL = `${API_BASE}${API_BOOKING_PATH}`


function BookingForm({venueID, bookings, maxGuests}: {venueID: string, bookings: Bookings, maxGuests: number}) {
  const [startDate, setStartDate] = useState<Value>(defaultValue);
  const [endDate, setEndDate] = useState<Value>(defaultValue);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [guests, setGuests] = useState<string>("");
  const [bookingError, setBookingError] = useState<boolean>(false);
  const {isLoggedIn} = useContext(AuthContext);

  const {bookingFetch, isError} = postBooking()

  useEffect(() => {
    const excludedDates = bookings.map((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const dateArray = [];
      let currentDate = start;

      while(currentDate <= end) {
        dateArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dateArray;
    });

    const unNestArray = excludedDates.flat();
    const excludedDatesArray = Array.from(new Set(unNestArray));

    setBookedDates(excludedDatesArray as string[]);
  }, [])

  const isDateDisabled = (date: Date): boolean => {
    const dateString = date.toISOString().split('T')[0];
    return bookedDates.includes(dateString);
  }

  const isDateRangeOverlapping = (startDate: Date, endDate: Date): boolean => {
    for (const booking of bookings) {
      const bookingStartDate = new Date(booking.dateFrom);
      const bookingEndDate = new Date(booking.dateTo);
      
      if (
        (startDate >= bookingStartDate && startDate <= bookingEndDate) ||
        (endDate >= bookingStartDate && endDate <= bookingEndDate) ||
        (startDate <= bookingStartDate && endDate >= bookingEndDate)
      ) {
        return true;
      }
    }
    return false;
  };


  const handleBooking = async () => {

    const bookingDetails = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      },
      body: JSON.stringify({
        dateFrom: startDate,
        dateTo: endDate,
        guests: Number(guests),
        venueId: venueID
      })
    }

    if (isDateRangeOverlapping(startDate as Date, endDate as Date)) {
      setBookingError(true);
      return;
    } else {
      setBookingError(false);
      const response = await bookingFetch(API_POST_BOOKING_URL, bookingDetails);
      if(response?.ok !== false) {
        alert("Booking was successfull, we look forward to your stay!")
      }
    }
  }

  if(!isLoggedIn) {
    return (
      <div className={styles.bookingContainer}>
        <h1>Please log in to place booking.</h1>
      </div>
    )
  }

  return(
    <div className={styles.bookingContainer}>
      <h2>Booking Information:</h2>
      <form className={styles.bookingForm} onSubmit={(e) => {
        e.preventDefault();
        handleBooking();
      }}>
        <div className={styles.calendarContainer}>
          <div>
            <label htmlFor="from" className={styles.fromLabel}>From:</label>
            <Calendar onChange={setStartDate} value={startDate} minDate={defaultValue} tileDisabled={({date}) => isDateDisabled(date)}/>
          </div>
          <div>
            <label htmlFor="to" className={styles.toLabel}>To:</label>
            <Calendar onChange={setEndDate} value={endDate} minDate={startDate as DateMinMax} tileDisabled={({date}) => isDateDisabled(date)}/>
          </div>
        </div>
        {bookingError? <p className={styles.bookingError}>Dates for bookings can't overlap.</p> : ""}
        <label htmlFor="guests" className={styles.guestsLabel}>Guests (Max {maxGuests}):</label>
        <input type="number" name="guests" id="guests" className={styles.guestsInput} placeholder="1" value={guests} min={1} max={maxGuests} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setGuests(e.target.value)
        }} required/>
        <Button text="Place Booking" type="submit" event={() => {}}/>
        {isError? <p className={styles.bookingError}>Something went wrong!</p> : ""}
      </form>
    </div>
  )
}

export default BookingForm;