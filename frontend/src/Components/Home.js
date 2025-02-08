import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/happy-farmer-hat.svg";
import { FiArrowRight } from "react-icons/fi";
import "../Styles/Home.css"; 
import axios from "axios";


const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    landSize: "",
    cropType: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);  // ✅ Debugging

    try {
      // ✅ Send form data to Flask `/chat` endpoint
      const response = await axios.post("http://127.0.0.1:5000/farm-assistant", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from backend:", response.data);  // ✅ Debugging

      alert("Form submitted successfully!");
      setShowPopup(false);  // Close the popup on success
      navigate("/chat");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Try again!");
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">New to farming? Ask Foodie</h1>
          <p className="primary-text">
          Bob is your personalized farming assistant, dedicated to providing expert support and guidance for all your farming needs.
Whether it's crop management, soil health, or maximizing your harvest, Bob is here to help every step of the way!{" "}
          </p>
          <button className="secondary-button" onClick={() => setShowPopup(true)}>
            Learn More <FiArrowRight />
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Get Started with Farming</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Location:
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </label>
              <label>
                How much land do you have (in acres)?
                <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} required />
              </label>
              <label>
                What type of crop do you want to grow?
                <input type="text" name="cropType" value={formData.cropType} onChange={handleChange} required />
              </label>
              <label>
                How much is your budget?
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} required />
              </label>
              <button type="submit">Submit</button>
              <button type="button" className="close-button" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;