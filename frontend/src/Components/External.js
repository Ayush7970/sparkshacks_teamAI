import React, { useState } from "react";

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non felis vitae nulla ultricies pharetra. 
          Integer sodales, nunc id cursus vulputate, lectus justo venenatis turpis, nec ultrices turpis justo ut lectus. 
          Sed sed scelerisque mi, eu aliquet ligula. Duis vitae nunc vitae eros laoreet convallis. Vivamus gravida nisi id 
          orci suscipit, vel dignissim tortor tincidunt. Nam auctor pharetra neque, sit amet facilisis turpis bibendum et. 
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam nec diam ac lectus 
          volutpat pharetra. Pellentesque a lacus et nunc lacinia bibendum. Suspendisse viverra ultricies felis, non consequat 
          lectus congue eget. Nam a justo risus. Curabitur aliquet pharetra metus, sed accumsan lectus laoreet at.
          
          <br /><br />

          Fusce dapibus ligula id odio condimentum, eu feugiat ipsum molestie. Cras ac libero augue. Donec mattis efficitur 
          velit, nec viverra turpis laoreet nec. Aenean pharetra erat ut ante vehicula, non hendrerit nisi laoreet. Nullam 
          euismod velit non metus bibendum, eu lacinia dolor volutpat. Morbi efficitur, purus nec lobortis consectetur, est 
          neque eleifend orci, at malesuada urna mi id dui. Proin efficitur luctus nisi, nec dapibus lacus euismod at. Duis 
          nec sapien ut mauris scelerisque interdum. Aliquam sit amet enim quis risus convallis rhoncus nec at lorem. 
          Pellentesque id felis sed lacus pellentesque fermentum.
          
          <br /><br />

          Vivamus quis eros scelerisque, malesuada ligula in, condimentum nunc. Donec vel dui et nulla euismod auctor eget 
          eu quam. Nulla facilisi. Cras malesuada bibendum turpis, nec aliquet arcu volutpat sit amet. Sed congue, neque at 
          varius egestas, eros lacus fringilla purus, sit amet egestas dui urna non nisi. Phasellus convallis massa ut 
          consequat viverra. Aenean euismod justo sit amet sem tincidunt, at dictum ligula fermentum.
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
