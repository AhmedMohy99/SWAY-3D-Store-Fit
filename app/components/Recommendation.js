export default function Recommendation({ result, product }) {
  if (!result) return null;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        background: "#f0f9ff",
        border: "2px solid #3b82f6",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>✨ Your Smart Recommendation</h3>

      <p style={{ marginBottom: "10px", fontSize: "16px" }}>
        Based on your profile, we recommend <strong>Size {result.size}</strong> for{" "}
        {product.name}.
      </p>

      <p style={{ marginBottom: "10px", color: "#555" }}>
        • Garment Width: {result.width} cm<br />
        • Garment Length: {result.length} cm
      </p>

      <p style={{ marginBottom: "10px" }}>
        This will give you the intended <b>{product.type}</b> look.
      </p>

      <p style={{ opacity: 0.7, fontSize: "14px", marginBottom: "10px" }}>
        (Estimated body width: {result.bodyWidth} cm)
      </p>

      <p style={{ marginTop: "15px", fontSize: "14px", color: "#2563eb" }}>
        👉 Want it baggier? Go one size up.
      </p>
    </div>
  );
}
