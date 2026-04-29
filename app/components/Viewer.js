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

function ClothingItem({ activeShirt, shirtSize, fitType, height, weight }) {
  const { scene } = useGLTF(activeShirt); 

  const BASE_HEIGHT = 162; 
  const BASE_WEIGHT = 55;  
  const bodyScaleY = height / BASE_HEIGHT;
  const weightRatio = weight / BASE_WEIGHT;
  const heightRatio = height / BASE_HEIGHT;
  const bodyScaleXZ = Math.sqrt(weightRatio / heightRatio);

  // Size multipliers for different sizes
  const sizeScales = {
    "S": 1.0,
    "M": 1.05,
    "L": 1.10,
    "XL": 1.15,
    "2XL": 1.20
  };

  let fitScale = sizeScales[shirtSize] || 1.0;
  
  // Add extra scaling for different fit types
  if (fitType === 'OVERSIZED') fitScale += 0.08;
  if (fitType === 'BOXY') fitScale += 0.05;

  // CRITICAL FIX: Enhanced clearance multipliers to prevent body clipping
  // These values ensure the shirt mesh completely covers the body mesh
  const CLEARANCE_X = 1.15;  // Width clearance (left-right)
  const CLEARANCE_Z = 1.20;  // Depth clearance (front-back) - most important!
  const CLEARANCE_Y = 1.03;  // Height clearance (up-down)
  
  // Calculate final scales with clearance
  const finalScaleX = bodyScaleXZ * fitScale * CLEARANCE_X;
  const finalScaleY = bodyScaleY * fitScale * CLEARANCE_Y;
  const finalScaleZ = bodyScaleXZ * fitScale * CLEARANCE_Z;

  // Vertical positioning to align with shoulders
  // This positions the shirt collar at the correct shoulder height
  const SHOULDER_ALIGNMENT = 0.92 * bodyScaleY;
  
  // Slight downward adjustment for larger sizes to maintain proper drape
  const yOffset = fitScale > 1.0 ? -((fitScale - 1.0) * 0.08) : 0;

  return (
    <primitive 
      object={scene} 
      position={[0, -1 + SHOULDER_ALIGNMENT + yOffset, 0]} 
      scale={[finalScaleX, finalScaleY, finalScaleZ]} 
    />
  );
}

export default function Viewer({ height, weight, shirtSize, fitType, activeShirt, faceUrl }) {
  return (
    <Canvas camera={{ position: [2, 1, 4], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} faceUrl={faceUrl} />
        
        <ClothingItem 
          activeShirt={activeShirt} 
          shirtSize={shirtSize} 
          fitType={fitType} 
          height={height} 
          weight={weight} 
        />
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#00FFFF" />
      
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
