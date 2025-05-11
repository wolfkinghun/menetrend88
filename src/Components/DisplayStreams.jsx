import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, deleteDoc, doc } from "../firebase"; // Firebase
import { useAuth } from "../hooks/useAuth"; // Auth hook, tegyél ide megfelelő utat
import emailjs from 'emailjs-com';

const DisplayStreams = () => {
  const [streams, setStreams] = useState([]);
  const { isAdmin, user } = useAuth(); // Állítsd be a hook szerint

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "streams"));
        const streamsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStreams(streamsData);
      } catch (error) {
        console.error("Error loading streams: ", error);
      }
    };

    fetchStreams();
  }, []);

  const formatDay = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const options = { weekday: 'long' };
      return date.toLocaleDateString('hu-HU', options);
    }
    return "Nincs dátum";
  };

  const handleEdit = (stream) => {
    console.log("Szerkesztés:", stream);
    alert("Szerkesztés funkció még nincs kész.");
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "streams", id));
      setStreams(streams.filter((s) => s.id !== id));
      alert("Stream törölve.");
    } catch (err) {
      console.error("Törlési hiba:", err);
      alert("Hiba történt a törlés során.");
    }
  };

  const handleNotify = (stream) => {
    if (!user?.email) {
      alert("Csak bejelentkezett felhasználók kérhetnek értesítést.");
      return;
    }

    const templateParams = {
      to_email: user.email,
      stream_time: stream.time,
      stream_day: formatDay(new Date(stream.streamDate.seconds * 1000)),
    };

    emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
      .then(() => {
        alert('Értesítés elküldve emailben!');
      })
      .catch((error) => {
        console.error('Email küldési hiba:', error);
        alert('Hiba történt az értesítés küldésekor.');
      });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-5">
      <h2 className="text-2xl font-bold text-purple-100 text-center mb-6">Streamek Listája</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream) => {
          const streamDate = stream.streamDate
            ? new Date(stream.streamDate.seconds * 1000)
            : new Date();
          return (
            <div
              key={stream.id}
              className="bg-gray-900 border border-purple-700 text-white p-4 rounded-lg flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold text-purple-500">{formatDay(streamDate)}</h3>
              <p className="text-sm text-purple-400">{stream.time}</p>
              <p className="text-sm text-zinc-200">
                {stream.description !== 'Nincs leírás' ? stream.description : (
                  <span className="italic text-gray-400">Nincs leírás 📭</span>
                )}
              </p>

              {isAdmin ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(stream)}
                  >
                    ✏️ Szerkesztés
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(stream.id)}
                  >
                    🗑️ Törlés
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-2"
                  onClick={() => handleNotify(stream)}
                >
                  🔔 Értesítést kérek
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayStreams;
