import React, { useState } from 'react';
import { db, collection, addDoc } from "../firebase";  // db importálása

function AddStream() {
  const [userId, setUserId] = useState('');
  const [streamTime, setStreamTime] = useState('');
  const [streamDescription, setStreamDescription] = useState('');
  const [streamDate, setStreamDate] = useState(''); // Új állapot a dátumhoz

  const handleAddStream = async () => {
    if (!streamTime || !streamDate) {
      alert('A stream időpont és dátum kötelező!');
      return;
    }

    try {
      // Stream dátum konvertálása
      const streamDateObj = new Date(streamDate);

      // Formázzuk a dátumot, hogy csak a hét napját jelenítse meg (pl: Hétfő, Kedd, ...)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = streamDateObj.toLocaleDateString('hu-HU', options);

      const newStream = {
        time: streamTime,      // Stream időpontja
        description: streamDescription || 'Nincs leírás', // Leírás (opcionális)
        streamDate: formattedDate,  // A stream dátuma (formázva)
        createdAt: new Date(), // A stream hozzáadásának időpontja
      };

      // A streamek hozzáadása a Firestore 'streams' kollekciójához
      await addDoc(collection(db, 'streams'), newStream);

      alert('Stream hozzáadva!');
      // A mezők kiürítése
      setUserId('');
      setStreamTime('');
      setStreamDescription('');
      setStreamDate('');
    } catch (error) {
      console.error('Hiba a stream hozzáadásakor: ', error);
    }
  };

  return (
    <div>
      <h2>Stream hozzáadása</h2>
      <div>
        <label htmlFor="streamTime">Stream időpont (pl: hétfő 10:30): </label>
        <input
          type="text"
          id="streamTime"
          value={streamTime}
          onChange={(e) => setStreamTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="streamDescription">Stream leírás (opcionális): </label>
        <input
          type="text"
          id="streamDescription"
          value={streamDescription}
          onChange={(e) => setStreamDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="streamDate">Stream dátuma: </label>
        <input
          type="date"
          id="streamDate"
          value={streamDate}
          onChange={(e) => setStreamDate(e.target.value)}
        />
      </div>
      <button onClick={handleAddStream}>Stream hozzáadása</button>
    </div>
  );
}

export default AddStream;
