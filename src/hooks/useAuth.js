import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCredential) => {
      if (userCredential) {
        setUser(userCredential);  // Beállítjuk a bejelentkezett felhasználót
        
        // Ellenőrizzük a Firestore-ban a felhasználó adatokat
        const userDocRef = doc(firestore, 'users', userCredential.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData.role === 'admin');  // Ha admin szerepkör, beállítjuk
        } else {
          setIsAdmin(false);  // Ha nincs admin szerepkör, alapértelmezetten false
        }
      } else {
        setUser(null);  // Ha nincs bejelentkezett felhasználó
        setIsAdmin(false);  // Ha nincs felhasználó, nincs admin szerepkör
      }
      
      setLoading(false);  // A betöltés befejeződött
    });

    return () => unsubscribe();  // Cleanup, ha a komponens eltűnik
  }, []);

  return { user, isAdmin, loading };
};
