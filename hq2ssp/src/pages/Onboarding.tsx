import React from 'react';
import Slider from 'react-slick';
import style from "./styles/Onboarding.module.css";
import { IonButton, IonIcon } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { useHistory } from 'react-router';


const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const history = useHistory();

  // Example slides
  const slides = [
    {
      title: 'Welcome to MyApp',
      description: 'Your all-in-one solution for seamless management.',
      image: '/assets/onboarding1.png',
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor your tasks and achievements easily.',
      image: '/assets/onboarding2.png',
    },
    {
      title: 'Get Started',
      description: 'Start exploring the amazing features today!',
      image: '/assets/onboarding3.png',
    },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background:"#f0f0f0f0" }}>
      {/* Slide r Section */}
      <Slider className={style.slider} {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              padding: '20px',
            }}

          >

            <div className={style.img}>
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: '80%',
                  margin: 'auto',
                  borderRadius: '10px',
                }}
              />
            </div>
            <div className={style.write}>
              <h2 style={{ marginTop: '20px' }}>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>

          </div>
        ))}
      </Slider>

          {/* "Get Started" Button */}
      <button className={style.button} onClick={onFinish}>
        <IonIcon className={style.icon} icon={chevronForward} />
      </button>
    </div>
  );
};

export default Onboarding;
