"use client";

import { useState } from "react";

export default function SizeForm({ onSubmit }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    const h = parseInt(height, 10);
    const w = parseInt(weight, 10);

    if (!height || !weight) {
      setError("Please enter both height and weight");
      return;
    }

    if (isNaN(h) || isNaN(w)) {
      setError("Please enter valid numbers");
      return;
    }

    if (h <= 0 || w <= 0) {
      setError("Height and weight must be positive numbers");
      return;
    }

    if (h < 100 || h > 250) {
      setError("Height must be between 100-250 cm");
      return;
    }

    if (w < 30 || w > 200) {
      setError("Weight must be between 30-200 kg");
      return;
    }

    onSubmit(h, w);
  };

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px", marginTop: "20px" }}>
      <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>🔮 Create Your Digital Twin</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        See exactly how this piece fits your unique body before you buy.
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Height (cm)
        </label>
        <input
          type="number"
          placeholder="e.g., 162"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Weight (kg)
        </label>
        <input
          type="number"
          placeholder="e.g., 55"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Try & Fit
      </button>
    </div>
  );
}
