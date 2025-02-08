import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; // Get state passed via navigation
import './PredictionResult.css';  // Ensure the CSS file is imported

function PredictionResult() {
  const location = useLocation();
  const { placementMessage, placementMessageClass } = location.state || {};  // Handle potential undefined state

  return (
    <div className="prediction-result-container">
      <h2>Prediction Result</h2>
      <p className={placementMessageClass}>
        {placementMessage || "No prediction result available."}
      </p>
    </div>
  );
}

export default PredictionResult;
