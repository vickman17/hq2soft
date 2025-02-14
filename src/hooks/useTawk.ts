import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      customStyle?: (style: { bottom: string }) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };
  }
}

const useTawk = () => {
  useEffect(() => {
    const scriptId = "tawk-script";

    // Check if script already exists
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://embed.tawk.to/67aac34d3a842732607cc42a/1ijpglpnl";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    }

    const adjustTawkPosition = () => {
      const chatWidget = document.querySelector("#tawkchat-container") as HTMLElement;
      if (chatWidget) {
        chatWidget.style.bottom = "80px"; // Adjust as needed
      }
    };

    const initTawk = () => {
      if (!window.Tawk_API) return;

      window.Tawk_API.onLoad = function () {
        console.log("Tawk API Loaded.");
        
        // Try adjusting with customStyle
        window.Tawk_API?.customStyle?.({
          bottom: "80px",
        });

        // Ensure it's visible
        window.Tawk_API?.showWidget?.();

        // Apply manual adjustment in case customStyle fails
        setTimeout(adjustTawkPosition, 1000);
      };
    };

    const checkTawk = setInterval(() => {
      if (window.Tawk_API) {
        clearInterval(checkTawk);
        initTawk();
      }
    }, 500);

    return () => clearInterval(checkTawk);
  }, []);

  return null;
};

export default useTawk;
