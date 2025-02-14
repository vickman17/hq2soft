import React, { useState, useEffect } from "react";
import style from "./OfflineBanner.module.css"; // Add styles for the banner

const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineMessage(true);

      // Hide the "back online" message after 3 seconds
      setTimeout(() => setShowOnlineMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineMessage(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline && !showOnlineMessage) return null;

  return (
    <div style={{background: isOffline ? "red" : "#2f7d32"}} className={style.offlineBanner}>
      {isOffline ? "You are offline, Check network connection" : "You are back online"}
    </div>
  );
};

export default OfflineBanner;
