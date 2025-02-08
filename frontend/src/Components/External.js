import React, { useState } from "react";
import "../Styles/External.css";
const ExternalResources = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", { // Update the URL if necessary
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Successfully signed up for email alerts!");
        setFormData({ name: "", email: "" }); // Reset form
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error.message}`);
    }
  };

  return (
    <div className="external-resources-container">
      <div className="content">
        <h1 className="title">Disaster Relief Help</h1>
        <p className="description">
        🌾 Get Enrolled in Our Natural Disaster Alert System! ⛅⚡<br />
      🚜 Protect Your Crops, Secure Your Future! 🌱<br />
      🔔 Stay Informed, Stay Prepared 📡<br />
      We predict the weather and provide crucial alerts 📩 about when to irrigate your fields 
      or take other necessary precautions. Our system analyzes weekly weather forecasts 🌦️ 
      to detect potential natural disasters 🌪️ and instantly notifies registered farmers 
      in case of an emergency.
      
      <br /><br />

      🌍 <strong>Why is This Important?</strong> 🧑‍🌾<br />
      Farmers often struggle with unexpected weather conditions that can impact their crops and yield. 
      With our advanced forecasting system 📊, we analyze real-time weather data 📡 and historical patterns 📜 
      to provide highly accurate predictions ✅.

      <br /><br />

      ⚠️ <strong>Extreme Weather? No Problem!</strong> 🌊🔥<br />
      Whether it’s heavy rainfall 🌧️, drought ☀️, or any other weather anomaly 🌪️, our system ensures 
      that farmers receive timely alerts ⏰. This allows them to prepare in advance, minimizing 
      potential damage and maximizing productivity.

      <br /><br />
      📢 <strong>Sign Up Today</strong> 📲 and stay ahead of nature’s uncertainties! 🌿
        </p>
      </div>

      <div className="form-container">
        <h2>Sign Up for Alerts</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="message">{message}</p>} {/* ✅ No more errors */}
      </div>
    </div>
  );
};

export default ExternalResources;
