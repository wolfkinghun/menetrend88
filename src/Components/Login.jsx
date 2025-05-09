import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';  // Firebase importálása
import { signInWithEmailAndPassword } from 'firebase/auth'; // Bejelentkezési függvény

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Firebase bejelentkezés
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Ha sikerült a bejelentkezés
        const user = userCredential.user;
        console.log('Bejelentkezett felhasználó:', user);
        alert('Sikeres bejelentkezés!');
        navigate('/');  // Átirányítás a főoldalra
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Hiba bejelentkezés közben:', errorCode, errorMessage);
        alert(`Hiba: ${errorMessage}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Vissza gomb */}
      <button
        onClick={() => navigate(-1)}  // Vissza az előző oldalra
        className="absolute top-6 left-6 bg-rose-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        Vissza
      </button>

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-10 rounded-lg shadow-2xl w-96 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Bejelentkezés</h2>
        
        <div>
          <label htmlFor="email" className="block text-sm text-purple-200">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-purple-500 rounded-md mt-1 bg-transparent text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm text-purple-200">Jelszó</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-purple-500 rounded-md mt-1 bg-transparent text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg mt-4 hover:bg-purple-500 transition duration-300"
        >
          Bejelentkezés
        </button>
      </form>
    </div>
  );
};

export default Login;
