import React, { useState } from "react";
import "../Styles/ranking.css";

const Ranking = () => {
  const cropOptions = ["Rice", "Wheat", "Barley", "Beans"];

  const [selectedCrop, setSelectedCrop] = useState(cropOptions[0]);
  const [analysis, setAnalysis] = useState(""); // Stores backend response
  const [topFarms, setTopFarms] = useState([]); // Store top farms ranking

  const handleSubmit = async () => {
    console.log(`Submitting crop choice: ${selectedCrop}`);

    try {
      const response = await fetch("http://127.0.0.1:5000/ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crop: selectedCrop.toLowerCase() }), // Convert to lowercase
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data.expert_analysis || "No analysis available.");
        setTopFarms(data.top_farms || []); // Store the top 3 farms
      } else {
        setAnalysis(data.error || "Error fetching data.");
        setTopFarms([]); // Clear the farms list on error
      }
    } catch (error) {
      console.error("Error fetching ranking:", error);
      setAnalysis("Failed to retrieve expert analysis.");
      setTopFarms([]);
    }
  };

  return (
    <div className="ranking-container">
      <h2>Farm Ranking</h2>

      {/* Dropdown for selecting a crop */}
      <div className="ranking-controls">
        <select 
          value={selectedCrop} 
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          {cropOptions.map((crop, index) => (
            <option key={index} value={crop}>
              {crop}
            </option>
          ))}
        </select>

        {/* Submit button to send selection to backend */}
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Expert Analysis */}
      <p className="analysis-text">
        <strong>Expert Analysis:</strong> {analysis || "Please select an option"}
      </p>

      {/* Display Top 3 Farms */}
      {topFarms.length > 0 && (
        <div className="farm-rankings">
          <h3>Top 3 Farms for {selectedCrop}</h3>
          <ul>
            {topFarms.map((farm, index) => (
              <li key={index}>
                <strong>Farm ID:</strong> {farm.farm_id} | 
                <strong> Score:</strong> {farm.predicted_score.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ranking;
