import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage  } from "firebase/messaging";

const firebaseConfig = {
  apiKey: 'AIzaSyAkoEma7pfnSLO80njh6Z4TKRv6wq8UPpk',
  authDomain: 'wih-videocall-service.firebaseapp.com',
  projectId: 'wih-videocall-service',
  storageBucket: 'wih-videocall-service.firebasestorage.app',
  messagingSenderId: '1016242551603',
  appId: '1:1016242551603:web:d416e400ae8b18db8b5c46',
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { onMessage };

export const messaging = getMessaging(app);



export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission not granted");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};
