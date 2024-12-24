// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import { IonInput, IonCard, IonCardContent, IonContent } from '@ionic/react';

// const OSMComponent: React.FC = () => {
//   const [address, setAddress] = useState('');
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

//   const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(e.target.value);
//     const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json`);
//     const data = await response.json();
//     const location = data[0];
//     if (location) {
//       setLocation({ lat: parseFloat(location.lat), lng: parseFloat(location.lon) });
//     }
//   };

//   return (
//     <IonContent>
//       <IonCard>
//         <IonCardContent>
//           <IonInput
//             value={address}
//             onIonInput={handleAddressChange}
//             placeholder="Enter address"
//             clearInput
//             style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
//           />
//           <MapContainer
//             center={location || { lat: 35.6895, lng: 139.6917 }} // Default to Tokyo
//             zoom={10}
//             style={{ width: '100%', height: '400px' }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {location && (
//               <Marker position={location}>
//                 <Popup>Address: {address}</Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </IonCardContent>
//       </IonCard>
//     </IonContent>
//   );
// };

// export default OSMComponent;
