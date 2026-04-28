"use client";

import { useState } from "react";

export default function SizeForm({ onSubmit }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="p-4">
      <h2>Create Your Digital Twin</h2>

      <input
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <input
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <button onClick={() => onSubmit(height, weight)}>Try & Fit</button>
    </div>
  );
}
