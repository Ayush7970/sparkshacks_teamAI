/*  
ABOUT PAGE:

Meant to define what motivated us to create this project and the problem it solves.
The page has a slight joke of saying "What Drove Us?" with an image of the truck at the bottom.

*/

import React, {useState} from 'react';
import Truck from "../Images/deliveryTruck.png"; //The delivery truck icon you see on the bottom of the screen


const About = () => {

  const [animate, setAnimate] = useState(false);

  const handleTruckClick = () => {
    setAnimate(true);

    // Reset animation state after it completes
    const animationDuration = 4000; // Matches the duration in CSS
    setTimeout(() => {
      setAnimate(false);
    }, animationDuration);
  };


    return (
        <div className="about-container">
        <h1 className="about-heading">🚀 What Drives Us?</h1>
  
        {/* Mission Statement */}
        <p className="about-text">
          - <strong>Empowering new-age farmers</strong> to thrive in a fast-changing world by providing them with modern tools, technology, and expert knowledge that simplifies complex agricultural processes.  
          <br /><br />
          - <strong>Meeting the rising food demand</strong> as the global population approaches <strong>10 billion by 2050</strong>, ensuring farming practices evolve to be both productive and environmentally sustainable.  
          <br /><br />
          - <strong>Harnessing the power of React technology</strong> to build an intuitive platform that serves as a digital hub for agricultural resources, allowing farmers to gain access to information and connect with experts efficiently.  
          <br /><br />
          - <strong>Supporting the new generation of farmers</strong> by integrating data-driven insights, expert advice, and innovative tools that help them navigate the complexities of modern agriculture with confidence.  
        </p>
  
        <div className="section-spacing"></div> {/* Space Between Sections */}
  
        {/* Climate Challenges & Solutions */}
        <p className="about-text">
          - <strong>Climate change poses a serious threat</strong> to global food security, with extreme weather conditions such as <em>prolonged droughts, devastating wildfires, and unpredictable rainfall</em> making it harder for farmers to sustain their crops and livestock.  
          <br /><br />
          - <strong>New farmers must adopt adaptive strategies</strong> to withstand these environmental shifts while striving to optimize their yields, ensuring food production remains stable despite changing climate patterns.  
          <br /><br />
          - <strong>Our platform promotes resilient and regenerative agriculture</strong> by integrating advanced farming techniques that focus on preserving soil health, minimizing resource wastage, and maximizing crop productivity.  
          <br /><br />
          - <strong>We leverage localized data analytics</strong> to provide tailored insights on soil conditions, water management, and climate trends, empowering farmers to make informed decisions that contribute to long-term sustainability.  
        </p>
  
        <div className="section-spacing"></div> {/* Space Between Sections */}
  
        {/* Building a Global Community */}
        <p className="about-text">
          - <strong>Agriculture has always been built on community</strong>, where farmers share knowledge, experiences, and best practices to collectively grow and sustain their livelihoods. Our goal is to extend this tradition into the digital age.  
          <br /><br />
          - <strong>Our platform bridges the gap</strong> between traditional farming methods and modern technology by fostering a collaborative online space where farmers worldwide can interact, exchange ideas, and learn from each other.  
          <br /><br />
          - <strong>By creating a network of informed and innovative farmers</strong>, we ensure that agricultural communities remain connected and adaptable, embracing sustainable practices that benefit both farmers and the environment.  
          <br /><br />
          - <strong>Every feature we build reflects our commitment</strong> to making agriculture a thriving and sustainable pillar of society, ensuring that as the world continues to grow, we develop the means to nourish it responsibly.  
        </p>
  
        {/* Interactive Truck Image */}
        <div className="about-image-container" onClick={handleTruckClick}>
          <img
            src={Truck}
            alt="Big Truck"
            className={`about-image ${animate ? "truck-animation" : ""}`}
          />
        </div>
      </div>
    );
}

export default About;