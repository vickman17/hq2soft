import React, { useState, useEffect } from 'react';
import style from './Autotype.module.css'; // Optional for styling
import { IonContent } from '@ionic/react';

interface AutoTypeProps {
  strings: string[]; // Array of strings to display
  typingSpeed?: number; // Typing speed in ms
  reverseSpeed?: number; // Speed of erasing in ms
  delay?: number; // Delay between typing and erasing
}

const AutoType: React.FC<AutoTypeProps> = ({
  strings,
  typingSpeed,
  reverseSpeed,
  delay,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current string
  const [displayedText, setDisplayedText] = useState(''); // Current displayed text
  const [isTyping, setIsTyping] = useState(true); // Tracks typing or erasing

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTyping) {
      interval = setInterval(() => {
        setDisplayedText((prev) =>
          prev + strings[currentIndex].charAt(prev.length)
        );

        if (displayedText === strings[currentIndex]) {
          clearInterval(interval);
          setTimeout(() => setIsTyping(false), delay);
        }
      }, typingSpeed);
    } else {
      interval = setInterval(() => {
        setDisplayedText((prev) => prev.slice(0, -1));

        if (displayedText === '') {
          clearInterval(interval);
          setCurrentIndex((prev) => (prev + 1) % strings.length);
          setIsTyping(true);
        }
      }, reverseSpeed);
    }

    return () => clearInterval(interval);
  }, [displayedText, isTyping, strings, typingSpeed, reverseSpeed, currentIndex, delay]);

  return(
    <div className={style.cont}>
      <div className={style.output}>
        {displayedText}
      </div>
      <div style={{color: "white", fontSize: "12px", width: "fit-content", margin:"auto"}}><p>Finish setting up your account.</p></div>
    </div>

  )
};

export default AutoType;
