import React from 'react';

const Menetrend = () => {
  const schedule = [
    { day: 'Szerda', time: '18:00', activity: 'Stream: Game Night' },
    { day: 'Péntek', time: '18:00', activity: 'Stream: Q&A' },
    { day: 'Szombat', time: '10:30 vagy 18:00', activity: 'Stream: Challenge' },
    { day: 'Vasárnap', time: '10:30', activity: 'Stream: Community Night' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-5">
      <h2 className="text-2xl font-bold text-purple-100 text-center mb-6">Általános Menetrend</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-purple-700 text-white p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-purple-500">{item.day}</h3>
            <p className="text-sm text-purple-400">{item.time}</p>
            <p className="mt-1 text-sm text-zinc-200">{item.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menetrend;
