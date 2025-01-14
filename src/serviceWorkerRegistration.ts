const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/)
);

export function register(config?: { onUpdate?: (registration: ServiceWorkerRegistration) => void; onSuccess?: (registration: ServiceWorkerRegistration) => void; }) {
  if ('serviceWorker' in navigator) {
    // Directly reference the service worker file
    const swUrl = '/service-worker.js';

    if (isLocalhost) {
      checkValidServiceWorker(swUrl, config);
    } else {
      registerValidSW(swUrl, config);
    }
  }
}

function registerValidSW(swUrl: string, config?: { onUpdate?: (registration: ServiceWorkerRegistration) => void; onSuccess?: (registration: ServiceWorkerRegistration) => void; }) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration: ServiceWorkerRegistration) => {
      if (config && config.onSuccess) {
        config.onSuccess(registration);
      }
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              }
            }
          };
        }
      };
    })
    .catch((error: Error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: { onUpdate?: (registration: ServiceWorkerRegistration) => void; onSuccess?: (registration: ServiceWorkerRegistration) => void; }) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      if (response.status === 404 || response.headers.get('content-type')?.indexOf('javascript') === -1) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        registration.unregister();
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }
}
