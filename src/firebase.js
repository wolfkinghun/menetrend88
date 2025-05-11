import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,    // <- EZ KELL A SZERKESZTÉSHEZ
  setDoc        // <- Ha teljes dokumentumot cserélnél
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC89J1ECni0ES2CGSChQ0kZ7bNRDPG2gDM",
  authDomain: "scheludemanager.firebaseapp.com",
  projectId: "scheludemanager",
  storageBucket: "scheludemanager.firebasestorage.app",
  messagingSenderId: "318991433644",
  appId: "1:318991433644:web:c6a62c686fd550d2418409",
  measurementId: "G-ESB0XGJ989"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const db = firestore;
export const auth = getAuth(app);

// Exportáljuk az összes használt metódust
export {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,   // <- MOST MÁR ELÉRHETŐ LESZ
  setDoc
};
