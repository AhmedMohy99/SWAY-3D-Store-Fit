'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function Avatar({ height, weight, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); 

  const currentScale = useMemo(() => {
    const BASE_HEIGHT = 162; 
    const BASE_WEIGHT = 55;  
    const scaleY = height / BASE_HEIGHT;
    const weightRatio = weight / BASE_WEIGHT;
    const heightRatio = height / BASE_HEIGHT;
    const scaleXZ = Math.sqrt(weightRatio / heightRatio);
    return [scaleXZ, scaleY, scaleXZ];
  }, [height, weight]);

  useEffect(() => {
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(faceUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        scene.traverse((child) => {
          if (child.isMesh && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('face'))) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.5,
            });
            child.material.needsUpdate = true;
          }
        });
      });
    }
  }, [faceUrl, scene]);

  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

function ClothingItem({ activeShirt, shirtSize, fitType }) {
  const { scene } = useGLTF(activeShirt); 

  // حدثنا المقاسات عشان تشمل الـ 2XL
  const sizeScales = {
    "S": 1.0,
    "M": 1.05,
    "L": 1.10,
    "XL": 1.15,
    "2XL": 1.20
  };

  let newScale = sizeScales[shirtSize] || 1.0;

  if (fitType === 'OVERSIZED') newScale += 0.05;
  if (fitType === 'BOXY') newScale += 0.02;

  const yOffset = newScale > 1.0 ? -((newScale - 1.0) * 0.1) : 0;

  return <primitive object={scene} position={[0, -1 + yOffset, 0]} scale={[newScale, newScale, newScale]} />;
}

export default function Viewer({ height, weight, shirtSize, fitType, activeShirt, faceUrl }) {
  return (
    <Canvas camera={{ position: [2, 1, 4], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} faceUrl={faceUrl} />
        <ClothingItem activeShirt={activeShirt} shirtSize={shirtSize} fitType={fitType} />
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#00FFFF" />
      
      {/* خلينا الكاميرا تركز على المانيكان مع إزاحة بسيطة عشان الـ Sidebar اللي على الشمال مياكلش حتة منه */}
      <OrbitControls 
        enablePan={false} 
        minDistance={1.5} 
        maxDistance={5} 
        target={[0.5, 0.5, 0]} 
      />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
useGLTF.preload('/maverick-phoenix-white.glb');
