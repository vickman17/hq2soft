import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import style from './styles/Onboarding.module.css';
import { IonIcon, IonPage } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const history = useHistory(); // Initialize useHistory

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  useEffect(()=>{
    localStorage.setItem('hasSeenOnboarding', 'true');
  }, [])

  const slides = [
    {
      title: 'Boost Your Income',
      description: 'Connect with clients and grow your business effortlessly.',
      image: '/assets/engLap.jpeg',
    },
    {
      title: 'Manage Your Work Like a Pro',
      description: 'Stay organized with tools that help you track jobs and schedules seamlessly.',
      image: '/assets/trackjob.jpeg',
    },
    {
      title: 'Join a Thriving Community',
      description: 'Become part of a network where your skills are in demand every day.',
      image: '/assets/tools.jpeg',
    },
  ];

  return (
    <IonPage
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `url(${slides[currentSlide].image}) center center / cover no-repeat`,
        transition: 'background 0.5s ease',
      }}
    >
      <div className={style.glass}>
        <Slider className={style.slider} {...settings}>
          {slides.map((slide, index) => (
            <div className={style.write} key={index} style={{ textAlign: 'center', padding: '20px' }}>
              <div className={style.writeup}>
                <h2
                  style={{
                    marginTop: '20px',
                    fontSize: '1.8rem',
                    fontFamily: 'Rubik',
                    fontWeight: '500',
                  }}
                >
                  {slide.title}
                </h2>
                <p style={{ color: '#fffff0' }}>{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>

        <div className={style.butCont}>
          <button
            className={style.button}
            onClick={()=>history.push("/home")}
          >
            <IonIcon className={style.icon} icon={arrowForward} />
          </button>
        </div>
      </div>
    </IonPage>
  );
};

export default Onboarding;
