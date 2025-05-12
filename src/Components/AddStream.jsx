import React, { useState } from 'react';
import { db, collection, addDoc } from "../firebase";
import { useNavigate } from 'react-router-dom';


function AddStream() {
  const [streamTime, setStreamTime] = useState('');
  const [streamDescription, setStreamDescription] = useState('');
  const [streamDate, setStreamDate] = useState('');
 const navigate = useNavigate()

  const handleAddStream = async () => {
    if (!streamTime || !streamDate) {
      alert('A stream időpont és dátum kötelező!');
      return;
    }

    try {
      const streamDateObj = new Date(streamDate);

      const newStream = {
        time: streamTime,
        description: streamDescription || 'Nincs leírás',
        streamDate: streamDateObj,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'streams'), newStream);

      alert('Stream hozzáadva!');
      setStreamTime('');
      setStreamDescription('');
      setStreamDate('');
    } catch (error) {
      console.error('Hiba a stream hozzáadásakor: ', error);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 via-purple-800 to-black'>
    <div className="w-full max-w-md mx-auto max-w-[500px] max-h-[500px] pb-[50px] mb-[125px] p-6 bg-gray-900 border border-purple-700 rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)} // Vissza gomb funkció
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          🔙 Vissza
        </button>
        <h2 className="text-xl font-bold text-purple-400 text-center">➕ Stream hozzáadása</h2>
      </div>

      <div className="mb-4">
        <label htmlFor="streamTime" className="block mb-1">Stream időpont (pl: 19:00):</label>
        <input
          type="text"
          id="streamTime"
          value={streamTime}
          onChange={(e) => setStreamTime(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="streamDescription" className="block mb-1">Leírás (opcionális):</label>
        <input
          type="text"
          id="streamDescription"
          value={streamDescription}
          onChange={(e) => setStreamDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="streamDate" className="block mb-1">Dátum:</label>
        <input
          type="date"
          id="streamDate"
          value={streamDate}
          onChange={(e) => setStreamDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      </div>

      <button
        onClick={handleAddStream}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        ✅ Stream hozzáadása
      </button>
    </div>
    </div>
  );
}

export default AddStream;
