import { useEffect, useRef, useState } from "react";
import styles from "./ImageCarousel.module.css";

type Images = {
  url: string,
  alt: string
}

function ImageCarousel({images}: {images: [Images]}) {
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);
  const activeImage = useRef<HTMLImageElement>(null);

  useEffect(() => {
    activeImage.current?.scrollTo({left: 0});
    setImageCount(images.length);
  }, []);

  useEffect(() => {
    if(activeImage.current) {
      const activeImageElement = activeImage.current.querySelector(`#image-${scrollValue}`);
      if(activeImageElement) {
        activeImageElement.scrollIntoView({block: "center"});
      }
    }
  }, [scrollValue]);

  function scrollRight() {
    if(scrollValue < imageCount) {
      setScrollValue(prevValue => prevValue + 1);
    }
  }

  function scrollLeft() {
    if(scrollValue <= imageCount && scrollValue !== 0) {
      setScrollValue(prevValue => prevValue - 1);
    }
  }

  return(
    <>
    <div id="carousel" ref={activeImage} className={styles.carouselContainer}>
      <div className={styles.imageContainer}>
        {images.map((image, index) => {
          return(
            <img key={`image-${index}`} id={`image-${index}`} src={image.url} alt={image.alt}></img>
          )
        })}
      </div>
      <div className={styles.dotContainer}>
        {images.map((_, index) => {
          return(
            <button key={`button-${index}`} id={`button-${index}`} className={`${styles.dotSelector} ${scrollValue === index? styles.dotActive: ""}`} onClick={() => {setScrollValue(index)}}></button>
          )
        })}
      </div>
      <button className={`${styles.carouselButton} ${styles.prevImage}`} onClick={scrollLeft} disabled={scrollValue === 0 || !images.length}></button>
      <button className={`${styles.carouselButton} ${styles.nextImage}`} onClick={scrollRight} disabled={scrollValue === imageCount - 1 || !images.length}></button>
    </div>
    </>
  )
}

export default ImageCarousel;