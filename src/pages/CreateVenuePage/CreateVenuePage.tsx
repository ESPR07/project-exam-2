import { useEffect, useRef, useState } from "react";
import Button from "../../components/common/Button";
import styles from "./CreateVenuePage.module.css";
import { useForm } from "react-hook-form";

function CreateVenuePage() {
  const [formPage, setFormPage] = useState<number>(0);
  const pageRef = useRef<HTMLFormElement>(null)

  const {register, reset, handleSubmit, formState: { errors }} = useForm();

  useEffect(() => {
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
  
  function onSubmit(data) {
    console.log(data);
  }

  function scrollRight() {
    if(formPage < 3) {
      setFormPage(prevValue => prevValue + 1);
    }
  }

  function scrollLeft() {
    if(formPage <= 3 && formPage !== 0) {
      setFormPage(prevValue => prevValue - 1);
    }
  }

  return(
    <main className={styles.pageContent}>
      <h1>Create Venue</h1>
      <div className={styles.progressContainer}>
        <p className={formPage === 0 ? styles.active : ""}>Info</p>
        <span className={styles.progressArrow}></span>
        <p className={formPage === 1 ? styles.active : ""}>Location</p>
        <span className={styles.progressArrow}></span>
        <p className={formPage === 2 ? styles.active : ""}>Images</p>
      </div>
      <section className={styles.carouselContainer}>
        <form className={styles.createVenueForm} onSubmit={handleSubmit(onSubmit)} ref={pageRef}>
          <div className={styles.infoContainer} id="form-0">
            <label htmlFor="name">Name*:</label>
            <input type="text" id="name" placeholder="Venue name" {...register("name", {required: true})}/>
            {errors.name ? <p className={styles.errorText}>Name is required</p> : ""}
            <label htmlFor="description">Description*:</label>
            <textarea placeholder="Write something about the venue" id="description" rows={15} {...register("description", {required: true})}/>
            {errors.description ? <p className={styles.errorText}>Description is required</p> : ""}
            <label htmlFor="price">Price*:</label>
            <input type="number" id="price" placeholder="$100" {...register("price", {required: true})}/>
            {errors.price ? <p className={styles.errorText}>Price is required</p> : ""}
            <label htmlFor="maxGuests">Max Guests*:</label>
            <input type="number" id="maxGuests" placeholder="$100" {...register("maxGuests", {required: true})}/>
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
          <div className={styles.locationContainer} id="form-1">
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
          <div className={styles.imageContainer} id="form-2">
            <label htmlFor="imgURL">Image Link:</label>
            <input type="text" id="imgURL" placeholder="https://www.imagelocation.com/image.jpeg" {...register("url")}/>
            <label htmlFor="imgALT">Image Description:</label>
            <input type="text" id="imgALT" placeholder="Beautiful villa overlooking the vinyard" {...register("alt")}/>
            <img src="/src/assets/banner.webp" alt="Help me!"/>
            <Button text="Create Venue" type="submit" event={() => {}}/>
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