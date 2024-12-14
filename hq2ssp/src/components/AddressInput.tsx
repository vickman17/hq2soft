// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AddressInput = () => {
//   const [address, setAddress] = useState("");
//   const [map, setMap] = useState<H.Map | null>(null);
//   const [marker, setMarker] = useState<H.map.Marker | null>(null);

//   // Initialize the map
//   const initializeMap = () => {
//     // Ensure HERE Maps API is loaded
//     if (typeof H === "undefined") {
//       console.error("HERE Maps API is not loaded");
//       return;
//     }

//     const platform = new H.service.Platform({
//       apikey: "YOUR_API_KEY", // Replace with your actual API key
//     });

//     const defaultLayers = platform.createDefaultLayers();
//     const mapContainer = document.getElementById("mapContainer");

//     const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
//       zoom: 10,
//       center: { lat: 35.6895, lng: 139.6917 }, // Default to Tokyo, Japan
//     });
//     setMap(map);
//   };

//   // Function to handle address input
//   const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(e.target.value);

//     if (e.target.value) {
//       try {
//         // Make the Axios request to HERE Geocoding API
//         const response = await axios.get(
//           `https://geocode.search.hereapi.com/v1/geocode`,
//           {
//             params: {
//               q: e.target.value,
//               apiKey: "YOUR_API_KEY", // Replace with your actual API key
//             },
//           }
//         );

//         const result = response.data.items[0];
//         const location = result.position;

//         if (marker) {
//           map?.removeObject(marker);
//         }

//         // Create a new marker and set the map center to the new location
//         const newMarker = new H.map.Marker(location);
//         setMarker(newMarker);
//         map?.addObject(newMarker);
//         map?.setCenter(location);
//       } catch (error) {
//         console.error("Geocode error:", error);
//       }
//     }
//   };

//   // Set up the map when the component is mounted
//   useEffect(() => {
//     initializeMap();
//     return () => {
//       if (map) {
//         map.dispose();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         value={address}
//         onChange={handleAddressChange}
//         placeholder="Enter address"
//         style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
//       />
//       <div id="mapContainer" style={{ width: "100%", height: "400px" }}></div>
//     </div>
//   );
// };

// export default AddressInput;
