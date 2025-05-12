import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nevjegy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-900 to-black text-violet-100 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Vissza gomb */}
        <button
        onClick={() => navigate('/')}
        className="group mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-700 hover:bg-violet-600 transition-all text-violet-100 font-semibold shadow-lg hover:shadow-violet-800/50"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Vissza a főoldalra
      </button>


        {/* Főcím */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-violet-100 mb-4">ESZTI88 Névjegye</h1>
          <p className="text-xl mb-4">4,6 E Követő</p>
          <p className="text-lg max-w-3xl mx-auto">
            Szia! Autóversenyző és hobbi streamerként, Gran Turismo 7, Rally, F1 és Warzone streamekkel várlak az oldalamon. 💜
            <br />🤝 Next Level Racing Ambassador
          </p>
        </div>

        {/* Linkek */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-base font-medium">
          <a href="https://www.instagram.com/velezdi.eszter" className="hover:text-violet-100">Instagram</a>
          {/* <a href="https://www.facebook.com/eszti88" className="hover:text-violet-100">Facebook</a> */}
          {/* <a href="https://www.youtube.com/channel/eszti88-autosport" className="hover:text-violet-100">YouTube Autosport</a>
          <a href="https://www.youtube.com/channel/eszti88-gaming" className="hover:text-violet-100">YouTube Gaming</a>
          <a href="https://www.tiktok.com/@eszti88" className="hover:text-violet-100">TikTok</a> */}
        </div>

        {/* Szekciók */}
        {[
          {
            title: "Pluszcél",
            content: (
              <>
                <p className="mt-2">Segíts pontokat szerezni, hogy elérhessem a(z) 1. Plusz-szintet</p>
                <div className="mt-4">
                  <progress className="w-full h-2 bg-violet-700 rounded-full" value="8" max="100" />
                  <p className="text-sm mt-2">10/100</p>
                </div>
              </>
            )
          },
          {
            title: "My Gear List",
            content: (
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>GT ELITE RACING SIMULATOR COCKPIT</li>
                <li>SEAT ERS1</li>
                <li>TABLET&BUTTON BOX Add On</li>
                <li>KEYBOARD&MOUSE TRAY</li>
                <li>FREESTANDING SINGLE MONITOR STAND</li>
                <li>T-GTII Servo Base</li>
                <li>Ferrari 599XX EVO 30 Wheel Add-On</li>
                <li>T-LCM pedals</li>
                <li>TSS Handbrake Sparco mod</li>
              </ul>
            )
          },
          {
            title: "Következő Stream",
            content: (
              <div className="space-y-2">
                <p>Szerda: 18:00</p>
                <p>Péntek: 18:00</p>
                <p>Szombat: 10:30 vagy 18:00</p>
                <p>Vasárnap: 10:30</p>
                <p className="mt-3">Kattints a menetrendre a részletekért!</p>
              </div>
            )
          },
          {
            title: "Szabályok",
            content: (
              <ul className="list-decimal ml-6 mt-2 space-y-1">
                <li>Kéretlen tanácsok és oktatás nem megengedett.</li>
                <li>Tiszteljük egymást és a közösséget.</li>
                <li>Szexista, rasszista üzenet automatikus BAN-t eredményez.</li>
                <li>Nyugodtan kérdezz, türelemmel válaszolunk.</li>
              </ul>
            )
          },
          {
            title: "Támogatás",
            content: (
              <>
                <p>Ha szeretnél támogatni itt megteheted:</p>
                <a href="https://streamelements.com/eszti88/tip" className="text-violet-100 hover:text-violet-200 block mt-1">Kattints ide a támogatáshoz</a>
                <p className="mt-2">A támogatás önkéntes és nem visszatérítendő.</p>
              </>
            )
          },
          {
            title: "Kapcsolat",
            content: (
              <>
                <p>Ha szeretnél kapcsolatba lépni, írj a következő e-mail címre:</p>
                <a href="mailto:assistantformarketing@gmail.com" className="text-violet-100 hover:text-violet-200 block mt-1">assistantformarketing@gmail.com</a>
              </>
            )
          },
          {
            title: "PC Konfiguráció",
            content: (
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>CPU: i9</li>
                <li>GPU: Nvidia GeForce RTX 4080</li>
                <li>Motherboard: ASUS ROG STRIX Z790-A GAMING WIFI II</li>
                <li>Monitor: AOC CQ32G4VE</li>
                <li>Konzol: Playstation 5</li>
                <li>Kamera: Razer Kiyo Pro</li>
                <li>Mikrofon: Shure MV6</li>
              </ul>
            )
          }
        ].map((section, index) => (
          <div key={index} className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl mb-10">
            <h3 className="text-2xl font-semibold text-violet-200 mb-3">{section.title}</h3>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nevjegy;
