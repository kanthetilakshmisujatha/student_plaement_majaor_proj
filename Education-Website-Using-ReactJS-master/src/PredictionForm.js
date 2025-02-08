import React, { useState, useEffect } from "react";
import axios from "axios";
import "./prediction.css";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    sscPercentage: "",
    pucPercentage: "",
    btechPercentage: "",
    testCenter: "",
    workExperience: "",
    testPercentage: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cppbuzzStarted, setCppbuzzStarted] = useState(false);
  const [cppbuzzClosed, setCppbuzzClosed] = useState(false);
  const [cppbuzzWindow, setCppbuzzWindow] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartTest = () => {
    const newWindow = window.open("http://localhost:3000/", "_blank");
    if (newWindow) {
      setCppbuzzStarted(true);
      setCppbuzzWindow(newWindow);
    }
  };

  useEffect(() => {
    const checkCppbuzzClosed = () => {
      if (cppbuzzStarted && cppbuzzWindow && cppbuzzWindow.closed) {
        setCppbuzzClosed(true);
        setCppbuzzStarted(false);
      }
    };
    const intervalId = setInterval(checkCppbuzzClosed, 1000);
    return () => clearInterval(intervalId);
  }, [cppbuzzStarted, cppbuzzWindow]);

  const handleSubmitPrediction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        gender: formData.gender,
        ssc_p: parseFloat(formData.sscPercentage),
        puc_p: parseFloat(formData.pucPercentage),
        btech_p: parseFloat(formData.btechPercentage),
        workex: formData.workExperience,
        etest_p: parseFloat(formData.testPercentage),
      };

      const apiUrl = "http://127.0.0.1:5000/predict"; // Make sure to use the correct IP here

      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        setResult(response.data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError("Failed to get prediction. Ensure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">Welcome to the Prediction Form</h1>
      <form className="form" onSubmit={handleSubmitPrediction}>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sscPercentage">SSC Percentage:</label>
          <input
            type="number"
            id="sscPercentage"
            name="sscPercentage"
            value={formData.sscPercentage}
            onChange={handleChange}
            placeholder="Enter SSC Percentage"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pucPercentage">PUC Percentage:</label>
          <input
            type="number"
            id="pucPercentage"
            name="pucPercentage"
            value={formData.pucPercentage}
            onChange={handleChange}
            placeholder="Enter PUC Percentage"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="btechPercentage">BTech Percentage:</label>
          <input
            type="number"
            id="btechPercentage"
            name="btechPercentage"
            value={formData.btechPercentage}
            onChange={handleChange}
            placeholder="Enter BTech Percentage"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="workExperience">Work Experience:</label>
          <input
            type="text"
            id="workExperience"
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            placeholder="Enter Work Experience"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="testPercentage">Test Percentage:</label>
          <input
            type="number"
            id="testPercentage"
            name="testPercentage"
            value={formData.testPercentage}
            onChange={handleChange}
            placeholder="Enter Test Percentage after test"
            disabled={!cppbuzzClosed} // Disable input until test is closed
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="test-start-button" onClick={handleStartTest} disabled={cppbuzzStarted}>
            {cppbuzzStarted ? "Test in Progress..." : "Start Test"}
          </button>
          <button type="submit" className="prediction-button" disabled={loading || !cppbuzzClosed}>
            {loading ? "Loading..." : "Get Prediction"}
          </button>
        </div>
      </form>

      {result && (
        <div className="result-box">
          <h2>Prediction Result</h2>
          <p>{result.result}</p>
          <p>Probability: {result.result === "Placed" ? result.probability_placed : "N/A"}%</p>
        </div>
      )}

      {error && <div className="error-box">{error}</div>}
    </div>
  );
};

export default PredictionForm;
