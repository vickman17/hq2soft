import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationProvider';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}



const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <NotificationProvider>
  <Router>
    <App />
  </Router>
  </NotificationProvider>
);