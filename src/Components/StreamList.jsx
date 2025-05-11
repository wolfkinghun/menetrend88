import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from './firebase';

function StreamList() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      const querySnapshot = await getDocs(collection(db, 'streams'));
      const streamsList = querySnapshot.docs.map(doc => doc.data());
      setStreams(streamsList);
    };

    fetchStreams();
  }, []);

  return (
    <div>
      <h2>Streamek</h2>
      <ul>
        {streams.map((stream, index) => (
          <li key={index}>
            <strong>{stream.time}</strong> - {stream.description} (Felhasználó ID: {stream.userId})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
