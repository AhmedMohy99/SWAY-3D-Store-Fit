"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function Shirt({ textureUrl }) {
  const texture = useTexture(textureUrl);

  return (
    <mesh>
      <boxGeometry args={[2, 2.5, 0.5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Viewer({ texture }) {
  return (
    <Canvas style={{ height: "400px", background: "#f5f5f5", borderRadius: "8px" }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />

      <Shirt textureUrl={texture} />

      <OrbitControls />
    </Canvas>
  );
}
