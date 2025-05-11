import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logout from '../Components/Logout';
import Menetrend from '../Components/Menetrendek';
import { Footer } from '../Components/Footer';
import DisplayStreams from '../Components/DisplayStreams';

export const Home = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    // Itt lehetne redirect pl. ha csak admin láthat valamit
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return <div className="text-center text-purple-100">Betöltés...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Felső jobb sarok – Login/Logout/Admin */}
      <div className="absolute top-6 right-6 space-x-4">
        {!user ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              Bejelentkezés
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-pink-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 transition"
            >
              Regisztráció
            </button>
          </>
        ) : (
          <>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-amber-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-amber-700 transition"
              >
                Admin
              </button>
            )}
            <Logout />
          </>
        )}
      </div>

      {/* Üdvözlő szöveg */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-purple-50 mb-5 p-3">Szia, örülök, hogy itt vagy! 💜</h1>
      </div>

      {/* Kép */}
      <div className="flex justify-center items-center w-full mb-8">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/823dcb33-4a51-45d8-9388-491ce8de48f2-profile_image-70x70.jpeg"
          alt="Centered"
          className="w-full max-w-[100px] rounded-2xl shadow-2xl border-4 border-purple-700"
        />
      </div>

      {/* Menetrend komponens */}
      <Menetrend />

      {/* Névjegy gomb */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/nevjegy')}
          className="bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-800 transition"
        >
          Névjegy
        </button>
      </div>

      {/* Bemutatkozás blokk */}
      <div className="max-w-3xl text-center text-purple-200 mt-12 px-4">
        <p className="mt-4 font-medium text-pink-400">
          💜 Next Level Racing • Trustmaster
        </p>
      </div>

      {/* Lábjegyzet */}
      <Footer />
    </div>
  );
};
