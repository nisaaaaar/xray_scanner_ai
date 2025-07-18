import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setInsights("");
    setShowResult(false);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload an X-ray image");

    const formData = new FormData();
    formData.append("xray", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setInsights(res.data.insights);
      setShowResult(true);
    } catch (error) {
      console.error("Upload failed", error);
      setInsights("Failed to analyze image.");
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowResult(false);
    setInsights("");
    setFile(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🩻 X-ray Insight Scanner</h2>

      {!showResult && (
        <>
          <p style={styles.description}>
            Upload a chest X-ray to detect potential abnormalities using AI.
            This tool uses a fine-tuned <b>DenseNet121</b> model trained on
            the ChestX-ray14 dataset to analyze common thoracic diseases like <b>Pneumonia</b>, <b>Edema</b>, <b>Fibrosis</b>, and more.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#444" : "#1e90ff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </>
      )}

      {showResult && (
        <>
          <div style={styles.resultBox}>
            <h3 style={styles.subheading}>🧠 Insights</h3>
            <p style={styles.paragraph}>{insights}</p>
          </div>
          <button
            onClick={handleBack}
            style={{
              ...styles.button,
              backgroundColor: "#757575ff",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </>
      )}

      {!showResult && (
        <div style={styles.infoBox}>
          <h3 style={styles.subheading}>⚙️ How It Works</h3>
          <ul style={styles.ul}>
            <li>Upload a chest X-ray image (JPG or PNG).</li>
            <li>Our AI model scans for 14 different lung-related diseases.</li>
            <li>Returns predicted diseases with confidence scores.</li>
            <li>
              <b>Disclaimer:</b> This tool is for research and educational purposes only, not for clinical diagnosis.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: "100%",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  description: {
    textAlign: "center",
    maxWidth: "700px",
    marginBottom: "2rem",
    color: "#cccccc",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  input: {
    marginBottom: "1.5rem",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "1px solid #333",
    padding: "0.5rem",
    borderRadius: "6px",
    width: "47%",
  },
  button: {
    padding: "0.7rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "background 0.3s",
  },
  resultBox: {
    marginTop: "2rem",
    backgroundColor: "#1f1f1f",
    padding: "1.5rem",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "90%",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.05)",
  },
  subheading: {
    marginBottom: "1rem",
    fontSize: "1.2rem",
    color: "#9dd9ff",
  },
  paragraph: {
    lineHeight: "1.6",
    color: "#cccccc",
  },
  infoBox: {
    backgroundColor: "#1f1f1f",
    padding: "1.5rem",
    borderRadius: "10px",
    marginTop: "2rem",
    maxWidth: "700px",
    width: "90%",
    color: "#cccccc",
  },
  ul: {
    lineHeight: "1.6",
    paddingLeft: "1.5rem",
  },
};

export default App;
