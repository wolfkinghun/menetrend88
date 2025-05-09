import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); // Itt kell hívni a useNavigate-t

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Sikeres kijelentkezés!');
      navigate("/"); // Navigálás kijelentkezés után
    } catch (err) {
      alert('Hiba: ' + err.message);
    }
  };

  return <button onClick={handleLogout}>Kijelentkezés</button>;
};

export default Logout;
