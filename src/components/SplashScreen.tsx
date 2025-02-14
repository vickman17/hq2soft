import { useEffect, useState } from "react";
import style from "./SplashScreen.module.css"; // Import custom styles
// import splash from ""
// import logo from "../assets/splash-logo.png"; // Your custom splash logo

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      onFinish(); // Call the function to hide the splash screen
    }, 4500); // Change duration as needed
  }, [onFinish]);

  return isVisible ? (
    <div className={style.customSplashScreen}>
        <div>
            <img src="/assets/splash2.gif" alt="App Logo" className={style.splashLogo} />
        </div>
      <div>HQ2 SOFT</div>
    </div>
  ) : null;
};

export default SplashScreen;
