import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import styles from "./CreateVenuePage.module.css";
import { useForm } from "react-hook-form";
import { postVenue } from "../../API/Data/postVenue";

type ImageLinks = [
  {
    url: string,
  },
]

type FormResponse = {
  address: string,
  breakfast: boolean,
  city: string,
  continent: string,
  country: string,
  description: string,
  lat: string,
  lng: string,
  maxGuests: string,
  name: string,
  parking: boolean,
  pets: boolean,
  price: string,
  wifi: boolean,
  zip: string,
} 

const API_BASE = process.env.API_BASE_URL;
const API_VENUES_PATH = process.env.API_VENUES;
const API_POST_VENUE_URL = `${API_BASE}${API_VENUES_PATH}`

function CreateVenuePage() {
  const [formPage, setFormPage] = useState<number>(0);
  const [imageLinks, setImageLinks] = useState<ImageLinks>([{url: "/src/assets/banner.webp"}]);
  const pageRef = useRef<HTMLFormElement>(null);

  const {register, reset, handleSubmit, formState: { errors }} = useForm();
  const {venueSuccess, isError, isLoading, venueFetch} = postVenue();

  console.log("venue status: ", venueSuccess)
  console.log("error status: ", isError)
  console.log("loading status: ", isLoading)


  useEffect(() => {
    setFormPage(0);
    pageRef.current?.scrollTo({left: 0});
  }, []);

  useEffect(() => {
    if(pageRef.current) {
      const activeImageElement = pageRef.current.querySelector(`#form-${formPage}`);
      if(activeImageElement) {
        activeImageElement.scrollIntoView({block: "center"});
      }
    }
  }, [formPage]);
  
  async function onSubmit(data: FormResponse) {
    reset();

    const venueDetails = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        media: imageLinks,
        price: Number(data.price),
        maxGuests: Number(data.maxGuests),
        meta: {
          wifi: data.wifi,
          parking: data.parking,
          breakfast: data.breakfast,
          pets: data.pets
        },
        location: {
          address: data.address,
          city: data.city,
          zip: data.zip,
          country: data.country,
          continent: data.continent,
          lat: Number(data.lat),
          lng: Number(data.lng)
        }
      })
    }

    console.log(data);
    console.log(venueDetails);
    const postVenue = await venueFetch(API_POST_VENUE_URL, venueDetails);
    if(postVenue?.ok !== false) {
      alert(`Welcome to ${data.name}! We look forward to your visit!`);
    }

  }

  function scrollRight() {
    if(formPage < 2) {
      setFormPage(prevValue => prevValue + 1);
    }
  }

  function scrollLeft() {
    if(formPage <= 2 && formPage !== 0) {
      setFormPage(prevValue => prevValue - 1);
    }
  }

  function scrollTo(index: number) {
    setFormPage(index)
  }

  function updateImageLinks(e: React.FocusEvent<HTMLInputElement>) {
    const formattedArray: ImageLinks = [{url: "string"}]
    const handleLinks = e.target.value.split(",");
    formattedArray.pop();
    handleLinks.map((link) => {
      formattedArray.push({url: link})
    });
    setImageLinks(formattedArray);
  }

  function fallbackImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.currentTarget as HTMLImageElement;
    target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }

  return(
    <main className={styles.pageContent}>
      <h1>Create Venue</h1>
      <div className={styles.progressContainer}>
        <p className={formPage === 0 ? styles.active : ""} onClick={() => {scrollTo(0)}}>Info</p>
        <span className={styles.progressArrow}></span>
        <p className={formPage === 1 ? styles.active : ""} onClick={() => {scrollTo(1)}}>Location</p>
        <span className={styles.progressArrow}></span>
        <p className={formPage === 2 ? styles.active : ""} onClick={() => {scrollTo(2)}}>Images</p>
      </div>
      <section className={styles.carouselContainer}>
        <form className={styles.createVenueForm} onSubmit={handleSubmit(async (data) => await onSubmit(data as FormResponse))} ref={pageRef}>
          <div className={styles.container} id="form-0">
            <label htmlFor="name">Name*:</label>
            <input type="text" id="name" placeholder="Venue name" {...register("name", {required: true})}/>
            {errors.name ? <p className={styles.errorText}>Name is required</p> : ""}
            <label htmlFor="description">Description*:</label>
            <textarea placeholder="Write something about the venue" id="description" rows={15} {...register("description", {required: true})}/>
            {errors.description ? <p className={styles.errorText}>Description is required</p> : ""}
            <label htmlFor="price">Price* (USD):</label>
            <input type="number" id="price" placeholder="100" {...register("price", {required: true})}/>
            {errors.price ? <p className={styles.errorText}>Price is required</p> : ""}
            <label htmlFor="maxGuests">Max Guests*:</label>
            <input type="number" id="maxGuests" placeholder="1" {...register("maxGuests", {required: true})}/>
            {errors.maxGuests ? <p className={styles.errorText}>Max Guests is required</p> : ""}
            <div className={styles.tickBoxContainer}>
              <p>WiFi</p>
              <input type="checkbox" id="wifi" {...register("wifi")}/>
              <label htmlFor="wifi"></label>
              <p>Parking</p>
              <input type="checkbox" id="parking" {...register("parking")}/>
              <label htmlFor="parking"></label>
              <p>Breakfast</p>
              <input type="checkbox" id="breakfast" {...register("breakfast")}/>
              <label htmlFor="breakfast"></label>
              <p>Pets</p>
              <input type="checkbox" id="pets" {...register("pets")}/>
              <label htmlFor="pets"></label>
            </div>
          </div>
          <div className={styles.container} id="form-1" onClick={() => {setFormPage(1)}}>
            <label htmlFor="continent">Continent:</label>
            <input type="text" id="continent" placeholder="Europe" {...register("continent")}/>
            <label htmlFor="country">Country*:</label>
            <input type="text" id="country" placeholder="Italy" {...register("country", {required: true})}/>
            {errors.country ? <p className={styles.errorText}>Country is required</p> : ""}
            <label htmlFor="city">City:</label>
            <input type="text" id="city" placeholder="Venice" {...register("city")}/>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="Streetname" {...register("address")}/>
            <label htmlFor="zip">Zip:</label>
            <input type="text" id="zip" placeholder="0000" {...register("zip")}/>
            <label htmlFor="lan">Latitude:</label>
            <input type="text" id="lan" placeholder="0" {...register("lat")}/>
            <label htmlFor="lng">Longtitude:</label>
            <input type="text" id="lng" placeholder="0" {...register("lng")}/>
          </div>
          <div className={styles.container} id="form-2" onClick={() => {setFormPage(2)}}>
            <label htmlFor="imgURL">Image Links (Seperate by comma):</label>
            <input type="text" id="imgURL" placeholder="https://www.imagelocation.com/image.jpeg, https://www.imagelocation.com/image.jpeg" onBlur={updateImageLinks}/>
            <div className={styles.imageContainer}>
              {imageLinks.map((image) => {
                return(
                  <img src={image.url} alt="Alternative" onError={fallbackImage}/>
                )
              })}
            </div>
            <Button text="Submit Venue" type="submit" event={() => {}}/>
          </div>
        </form>
        <div className={styles.navigationContainer}>
          <Button text="Back" type="button" event={() => {scrollLeft()}}/>
          <Button text="Next" type="button" event={() => {scrollRight()}}/>
        </div>
      </section>
    </main>
  )
} 

export default CreateVenuePage;