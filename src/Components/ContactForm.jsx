import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_id', // Az EmailJS által biztosított szolgáltatás ID
      'template_id', // Az általad választott sablon ID
      e.target,
      'user_id' // Az API kulcsod
    )
    .then(
      (result) => {
        console.log('Email sent:', result.text);
        alert('Üzenet sikeresen elküldve!');
      },
      (error) => {
        console.error('Email küldési hiba:', error.text);
        alert('Hiba történt az üzenet küldésekor!');
      }
    );
  };

  return (
    <div>
      <h2>Kapcsolat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Név:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Üzenet:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Üzenet küldése</button>
      </form>
    </div>
  );
};

export default ContactForm;
