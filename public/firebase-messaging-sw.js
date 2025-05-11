import { getMessaging, onBackgroundMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';  // Az Firebase beállításaid

// Firebase inicializálása
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Háttér értesítések kezelése
onBackgroundMessage(messaging, (payload) => {
  console.log('Háttér értesítés érkezett:', payload);
  const notificationTitle = 'Stream Értesítés';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
