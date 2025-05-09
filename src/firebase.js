import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // EZ HIÁNYZOTT

const firebaseConfig = {
  apiKey: "AIzaSyC89J1ECni0ES2CGSChQ0kZ7bNRDPG2gDM",
  authDomain: "scheludemanager.firebaseapp.com",
  projectId: "scheludemanager",
  storageBucket: "scheludemanager.firebasestorage.app",
  messagingSenderId: "318991433644",
  appId: "1:318991433644:web:c6a62c686fd550d2418409",
  measurementId: "G-ESB0XGJ989"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app); // EZ KELL A BEJELENTKEZÉSHEZ ÉS REGISZTRÁCIÓHOZ
