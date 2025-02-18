import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      maximize: () => void;
    };
  }
}

const useTawk = () => {
  useEffect(() => {
    if (document.getElementById("tawk-script")) return; // Prevent duplicate script loading

    const tawkScript = document.createElement("script");
    tawkScript.id = "tawk-script";
    tawkScript.src = "https://embed.tawk.to/67aac34d3a842732607cc42a/1ijpglpnl";
    tawkScript.async = true;
    tawkScript.onload = () => {
      const checkTawk = setInterval(() => {
        if (window.Tawk_API && typeof window.Tawk_API.hideWidget === "function") {
          window.Tawk_API.hideWidget(); // Hide the widget on load
          clearInterval(checkTawk);
        }
      }, 500);
    };

    document.body.appendChild(tawkScript);

    return () => {
      if (tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }
    };
  }, []);
};

export default useTawk;
