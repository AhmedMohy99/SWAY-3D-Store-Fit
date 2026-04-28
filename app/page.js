"use client";

import { useState } from "react";
import Viewer from "./components/Viewer";
import SizeForm from "./components/SizeForm";
import Recommendation from "./components/Recommendation";

import { PRODUCTS } from "../lib/products";
import { getRecommendedSize } from "../lib/sizeEngine";

export default function Home() {
  const [result, setResult] = useState(null);
  const [product] = useState(PRODUCTS[0]);

  function handleSubmit(height, weight) {
    const res = getRecommendedSize(
      parseInt(height, 10),
      parseInt(weight, 10),
      product.type
    );

    setResult(res);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>SWAY 3D Virtual Fitting Room</h1>

      <Viewer texture={product.texture} />

      <SizeForm onSubmit={handleSubmit} />

      <Recommendation result={result} product={product} />
    </main>
  );
}
