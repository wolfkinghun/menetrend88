import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, deleteDoc, doc, updateDoc } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const DisplayStreams = () => {
  const [streams, setStreams] = useState([]);
  const [editingStream, setEditingStream] = useState(null);
  const [editedData, setEditedData] = useState({ description: "", time: "", streamDate: "" });
  const { isAdmin, user } = useAuth();

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
    setEditingStream(stream);
    setEditedData({
      description: stream.description,
      time: stream.time,
      streamDate: new Date(stream.streamDate.seconds * 1000).toISOString().slice(0, 10),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const streamRef = doc(db, "streams", editingStream.id);
      await updateDoc(streamRef, {
        description: editedData.description,
        time: editedData.time,
        streamDate: new Date(editedData.streamDate),
      });

      setStreams(prev =>
        prev.map(s =>
          s.id === editingStream.id
            ? { ...s, ...editedData, streamDate: new Date(editedData.streamDate) }
            : s
        )
      );

      alert("Sikeres szerkesztés.");
      setEditingStream(null);
    } catch (err) {
      console.error("Hiba a frissítéskor:", err);
      alert("Hiba történt a szerkesztés során.");
    }
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
    alert(`Értesítést kérsz erre: ${stream.time} (${formatDay(new Date(stream.streamDate.seconds * 1000))})`);
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

              {user && (
                isAdmin ? (
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
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Szerkesztő modal (egyszerű verzió) */}
      {editingStream && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-purple-700 rounded-lg p-6 w-full max-w-md text-white">
            <h3 className="text-xl font-bold mb-4">Stream szerkesztése</h3>
            <label className="block mb-2">Leírás:</label>
            <input
              type="text"
              name="description"
              value={editedData.description}
              onChange={handleEditChange}
              className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
            />
            <label className="block mb-2">Időpont (óra:perc):</label>
            <input
              type="text"
              name="time"
              value={editedData.time}
              onChange={handleEditChange}
              className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
            />
            <label className="block mb-2">Dátum:</label>
            <input
              type="date"
              name="streamDate"
              value={editedData.streamDate}
              onChange={handleEditChange}
              className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingStream(null)} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500">Mégse</button>
              <button onClick={saveEdit} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Mentés</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayStreams;
