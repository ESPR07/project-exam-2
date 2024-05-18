import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import styles from "./EditVenuePage.module.css";
import { useForm } from "react-hook-form";
import { getSingleVenue } from "../../API/Data/getSingleVenue";
import { useParams } from "react-router-dom";
import { updateVenue } from "../../API/Data/updateVenue";

type ImageLink = {
  url: string | undefined
}

type ImageLinks = ImageLink[]

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

function EditVenuePage() {
  const {id} = useParams();
  const API_POST_VENUE_URL = `${API_BASE}${API_VENUES_PATH}/${id}`
  
  const {register, handleSubmit, formState: { errors }} = useForm();
  const {venueData, isError, isLoading} = getSingleVenue(API_POST_VENUE_URL);
  const {venueFetch} = updateVenue();

  const [formPage, setFormPage] = useState<number>(0);
  const [imageLinksFetch, setImageLinksFetch] = useState<ImageLinks>([{url: ""}]);
  const [isimageError, setIsImageError] = useState<boolean>(false);
  const pageRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  console.log(imageLinksFetch);

  const mediaLinkFetch: ImageLinks = [{url: ""}];
  mediaLinkFetch.pop();
  
  venueData.media.map((image) => {
    mediaLinkFetch.push({url: image.url});
  })

  useEffect(() => {
    if(!isLoading && !isError) {
      setImageLinksFetch(mediaLinkFetch);
    }
  }, [isLoading])

  useEffect(() => {
    setFormPage(0);
    pageRef.current?.scrollTo({left: 0});
  }, [isLoading]);

  useEffect(() => {
    if(pageRef.current) {
      const activeImageElement = pageRef.current.querySelector(`#form-${formPage}`);
      if(activeImageElement) {
        activeImageElement.scrollIntoView({block: "center"});
      }
    }
  }, [formPage]);
  
  async function onSubmit(data: FormResponse) {
    const venueDetails = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": process.env.API_KEY,
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        media: imageLinksFetch,
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

    const updateVenue = await venueFetch(API_POST_VENUE_URL, venueDetails);
    if(updateVenue?.ok !== false) {
      alert(`Venue ${data.name} has been updated successfully!`);
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

  function updateImageLinks() {
    if(imageInputRef.current) {
      try {
        setIsImageError(false);

        new URL(imageInputRef.current.value);

        const imageInputLink: ImageLink = {
          url: imageInputRef.current?.value
        }
  
        setImageLinksFetch(oldArray => [...oldArray, imageInputLink]);
  
        imageInputRef.current.value = "";

      } catch(error) {

        setIsImageError(true);

      }
    }
  }

  function removeImageLink(index: number) {
    setImageLinksFetch([...imageLinksFetch.slice(0, index), ...imageLinksFetch.slice(index + 1)]);
  }

  function fallbackImage(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.currentTarget as HTMLImageElement;
    target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  }

  if(!isLoading && !isError) {
    return(
      <main className={styles.pageContent}>
        <h1>Update Venue</h1>
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
              <input type="text" id="name" defaultValue={venueData.name} {...register("name", {required: true})}/>
              {errors.name ? <p className={styles.errorText}>Name is required</p> : ""}
              <label htmlFor="description">Description*:</label>
              <textarea defaultValue={venueData.description} id="description" rows={15} {...register("description", {required: true})}/>
              {errors.description ? <p className={styles.errorText}>Description is required</p> : ""}
              <label htmlFor="price">Price* (USD):</label>
              <input type="number" id="price" defaultValue={venueData.price} {...register("price", {required: true})}/>
              {errors.price ? <p className={styles.errorText}>Price is required</p> : ""}
              <label htmlFor="maxGuests">Max Guests*:</label>
              <input type="number" id="maxGuests" defaultValue={venueData.maxGuests} {...register("maxGuests", {required: true})}/>
              {errors.maxGuests ? <p className={styles.errorText}>Max Guests is required</p> : ""}
              <div className={styles.tickBoxContainer}>
                <p>WiFi</p>
                <input type="checkbox" id="wifi" defaultChecked={venueData.meta.wifi} {...register("wifi")}/>
                <label htmlFor="wifi"></label>
                <p>Parking</p>
                <input type="checkbox" id="parking" defaultChecked={venueData.meta.parking} {...register("parking")}/>
                <label htmlFor="parking"></label>
                <p>Breakfast</p>
                <input type="checkbox" id="breakfast" defaultChecked={venueData.meta.breakfast} {...register("breakfast")}/>
                <label htmlFor="breakfast"></label>
                <p>Pets</p>
                <input type="checkbox" id="pets" defaultChecked={venueData.meta.pets} {...register("pets")}/>
                <label htmlFor="pets"></label>
              </div>
            </div>
            <div className={styles.container} id="form-1" onClick={() => {setFormPage(1)}}>
              <label htmlFor="continent">Continent:</label>
              <input type="text" id="continent" defaultValue={venueData.location.continent} {...register("continent")}/>
              <label htmlFor="country">Country*:</label>
              <input type="text" id="country" defaultValue={venueData.location.country} {...register("country", {required: true})}/>
              {errors.country ? <p className={styles.errorText}>Country is required</p> : ""}
              <label htmlFor="city">City:</label>
              <input type="text" id="city" defaultValue={venueData.location.city} {...register("city")}/>
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" defaultValue={venueData.location.address} {...register("address")}/>
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" defaultValue={venueData.location.zip} {...register("zip")}/>
              <label htmlFor="lat">Latitude:</label>
              <input type="text" id="lat" defaultValue={venueData.location.lat} {...register("lat")}/>
              <label htmlFor="lng">Longtitude:</label>
              <input type="text" id="lng" defaultValue={venueData.location.lng} {...register("lng")}/>
            </div>
            <div className={styles.container} id="form-2" onClick={() => {setFormPage(2)}}>
              <label htmlFor="imgURL">Image Links (Seperate by comma):</label>
              <div className={styles.imageInput}>
                <input type="text" id="imgURL" placeholder="https://www.imagelocation.com/image.jpeg" ref={imageInputRef}/>
                <Button text="+" type="button" event={() => {updateImageLinks()}}/>
              </div>
            {isimageError? <p className={styles.errorText}>URL is invalid</p> : ""}
              <div className={styles.imageSection}>
                {imageLinksFetch.map((image, index) => {
                  return(
                    <div key={index} className={styles.imageContainer}>
                      <img src={image.url} alt="Alternative" onError={fallbackImage}/>
                      <Button text="X" type="button" event={() => {removeImageLink(index)}}/>
                    </div>
                  )
                })}
              </div>
              <Button text="Update Venue" type="submit" event={() => {}}/>
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
} 

export default EditVenuePage;