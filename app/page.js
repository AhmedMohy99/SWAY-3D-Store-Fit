"use client";

import { useState } from "react";
import Viewer from "./components/Viewer";
import SizeForm from "./components/SizeForm";
import Recommendation from "./components/Recommendation";

import { PRODUCTS } from "../lib/products";
import { getRecommendedSize } from "../lib/sizeEngine";

export default function Home() {
  const [result, setResult] = useState(null);
  const [product, setProduct] = useState(PRODUCTS[0]);

  function handleSubmit(height, weight) {
    const res = getRecommendedSize(height, weight, product.type);
    setResult(res);
  }

  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>SWAY 3D Virtual Fitting Room</h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Don't guess your size—see it. Try on our latest collection.
        </p>
      </header>

      {/* Product Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "500" }}>
          Select Product:
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setProduct(p);
                setResult(null);
              }}
              style={{
                padding: "10px 20px",
                background: product.id === p.id ? "#000" : "#fff",
                color: product.id === p.id ? "#fff" : "#000",
                border: "2px solid #000",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "5px" }}>{product.name}</h2>
        <p style={{ fontSize: "18px", color: "#2563eb", marginBottom: "10px" }}>{product.price}</p>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
          <strong>Fit Type:</strong> {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>{product.description}</p>
      </div>

      {/* 3D Viewer */}
      <Viewer texture={product.texture} />

      {/* Size Form */}
      <SizeForm onSubmit={handleSubmit} />

      {/* Recommendation */}
      <Recommendation result={result} product={product} />

      {/* Size Guide */}
      <div style={{ marginTop: "40px", padding: "20px", background: "#fff", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>📏 Size Guide</h2>
        
        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Oversized Fit</h3>
        <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Size</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Width (cm)</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>S</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>54</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>72.5</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>M</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>57</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>73.5</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>L</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>60</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>74.5</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>XL</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>63</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>76.5</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Regular Fit</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Size</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Width (cm)</th>
              <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>S</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>52</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>68</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>M</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>54</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>70</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>L</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>56</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>72</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>XL</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>58</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>74</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>XXL</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>60</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>76</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
