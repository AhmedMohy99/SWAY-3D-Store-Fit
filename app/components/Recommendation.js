export default function Recommendation({ result, product }) {
  if (!result) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>✨ Your Smart Recommendation</h3>

      <p>
        Based on your profile, we recommend <strong>Size {result.size}</strong> for{" "}
        {product.name}.
      </p>

      <p>
        • Garment Width: {result.width} cm • Garment Length: {result.length} cm
      </p>

      <p>
        This will give you the intended <b>{product.type}</b> look.
      </p>

      <p style={{ opacity: 0.7 }}>(Estimated body width: {result.bodyWidth} cm)</p>

      <p>👉 Want it baggier? Go one size up.</p>
    </div>
  );
}
