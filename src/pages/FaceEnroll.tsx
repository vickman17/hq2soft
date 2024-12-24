import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const FaceEnroll: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [detectedFaces, setDetectedFaces] = useState<any>(null);

  const API_KEY = '7bSMaDdlZaOVOyDvC6Al_ntyBaIyjNWR'; // Replace with your Face++ API Key
  const API_SECRET = '-jAZiEekUdU1blHBLh0YSHxs9aSbueBG'; // Replace with your Face++ API Secret
  const API_URL = 'https://api-us.faceplusplus.com/facepp/v3/detect';

  useEffect(() => {
    const startVideoStream = async () => {
      if (navigator.mediaDevices && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    startVideoStream();
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImageUrl(canvas.toDataURL('image/jpeg'));
      }
    }
  };

  const detectFaces = async () => {
    if (!imageUrl) return;

    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_base64', imageUrl.split(',')[1]);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDetectedFaces(response.data.faces);
    } catch (error) {
      console.error('Error detecting faces:', error);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="100%" height="auto" muted></video>
      <button onClick={captureImage}>Capture</button>
      <button onClick={detectFaces}>Detect Faces</button>

      {detectedFaces && (
        <div>
          <h3>Detected Faces</h3>
          {detectedFaces.map((face: any, index: number) => (
            <div key={index}>
              <p>Face {index + 1}: Confidence: {face.confidence}</p>
              <p>Rectangle: {JSON.stringify(face.face_rectangle)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceEnroll;
