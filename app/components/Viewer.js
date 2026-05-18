'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// =========================================================================
// 🛠️ CONFIGURATION CONSTANTS (Adjust these when you change your avatar model)
// =========================================================================
const BASE_HEIGHT = 162;       // Base height of your avatar model in cm
const BASE_WEIGHT = 55;        // Base weight of your avatar model in kg
const SHOULDER_HEIGHT = 1.35;  // Distance from floor to shoulders in your GLB (in 3D units)
// =========================================================================

function Avatar({ height, weight, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); 
  
  // Clean clone ensures mutations (like face textures) don't bleed across re-renders
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const currentScale = useMemo(() => {
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
        
        clonedScene.traverse((child) => {
          // ⚠️ ATTENTION: When you change your avatar model, make sure 
          // one of these keywords matches your new model's head mesh name.
          if (child.isMesh && (
            child.name.toLowerCase().includes('head') || 
            child.name.toLowerCase().includes('face') ||
            child.name.toLowerCase().includes('skin')
          )) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.6,
            });
            child.material.needsUpdate = true;
          }
        });
      });
    }
  }, [faceUrl, clonedScene]);

  return <primitive object={clonedScene} position={[0, -1, 0]} scale={currentScale} />;
}

function ClothingItem({ activeShirt, shirtSize, fitType, height, weight }) {
  const { scene } = useGLTF(activeShirt); 
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const bodyScaleY = height / BASE_HEIGHT;
  const weightRatio = weight / BASE_WEIGHT;
  const heightRatio = height / BASE_HEIGHT;
  const bodyScaleXZ = Math.sqrt(weightRatio / heightRatio);

  // Balanced scaling increments to prevent exponential ballooning
  const sizeScales = {
    "S": 0.94,
    "M": 1.00,
    "L": 1.06,
    "XL": 1.12,
    "2XL": 1.18
  };

  let fitScale = sizeScales[shirtSize] || 1.0;
  
  if (fitType === 'OVERSIZED') fitScale *= 1.08;
  if (fitType === 'BOXY') fitScale *= 1.04;

  // Global clearances to avoid mesh clipping without turning the shirt into a box
  const CLEARANCE_X = 1.05;  
  const CLEARANCE_Z = 1.08;  
  const CLEARANCE_Y = 1.01;  
  
  const finalScaleX = bodyScaleXZ * fitScale * CLEARANCE_X;
  const finalScaleY = bodyScaleY * fitScale * CLEARANCE_Y;
  const finalScaleZ = bodyScaleXZ * fitScale * CLEARANCE_Z;

  // 🔥 FIXED POSITIONING MATH:
  // Calculates the delta movement caused by scaling from a floor pivot point.
  // It pulls the shirt down perfectly to lock its collar to the avatar's neck line.
  const yPositionOffset = SHOULDER_HEIGHT * (bodyScaleY - finalScaleY);

  return (
    <primitive 
      object={clonedScene} 
      position={[0, -1 + yPositionOffset, 0]} 
      scale={[finalScaleX, finalScaleY, finalScaleZ]} 
    />
  );
}

export default function Viewer({ height, weight, shirtSize, fitType, activeShirt, faceUrl }) {
  return (
    <Canvas camera={{ position: [0, 0.2, 2.5], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} intensity={1.2} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} faceUrl={faceUrl} />
        
        {activeShirt && (
          <ClothingItem 
            activeShirt={activeShirt} 
            shirtSize={shirtSize} 
            fitType={fitType} 
            height={height} 
            weight={weight} 
          />
        )}
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={8} blur={1.5} far={3} color="#00FFFF" />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={1.2} 
        maxDistance={4} 
        target={[0, 0, 0]} 
      />
    </Canvas>
  );
}

// Preload baseline assets for speed
useGLTF.preload('/avatar.glb');
