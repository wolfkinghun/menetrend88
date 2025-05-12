import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const NotifyUser = () => {
  const [email, setEmail] = useState(""); // Az email cím tárolása

  const handleSubmit = (e) => {
    e.preventDefault();

    // Itt kell elküldeni az emailt
    emailjs.send("service_g5ceale", "template_yzi6t7a", {
      email: email, // Az email cím, amely a form-ban van
    })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Értesítés küldése</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Írd be az email címed"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Értesítés küldése</button>
      </form>
    </div>
  );
};

export default NotifyUser;
