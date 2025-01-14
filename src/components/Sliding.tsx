import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Sliding.module.css";


const SlidingCard: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <IonCard className={style.slidingCard}>
      <IonCardHeader>
        <IonCardTitle>Sliding Card Carousel</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className={style.cardCont}>
        <Slider {...settings}>
          <div className={style.cardCont}>
            <h3>Content Slide 1</h3>
            <p>This is the first card content.</p>
          </div>
          <div>
            <h3>Content Slide 2</h3>
            <p>This is the second card content.</p>
          </div>
          <div>
            <h3>Content Slide 3</h3>
            <p>This is the third card content.</p>
          </div>
        </Slider>

        {/* Floating "Swipe" Message */}
        <div className={style.swipeOverlay}>
          <span> {"Swipe >>>"} </span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default SlidingCard;
