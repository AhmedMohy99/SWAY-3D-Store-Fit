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

  const sizeScales = {
    "S": 1.0,
    "M": 1.05,
    "L": 1.10,
    "XL": 1.15,
    "2XL": 1.20
  };

  let fitScale = sizeScales[shirtSize] || 1.0;
  if (fitType === 'OVERSIZED') fitScale += 0.05;
  if (fitType === 'BOXY') fitScale += 0.02;

  // 🎯 الحل السحري: فصلنا البراح (Clearance) عشان التيشيرت ميخترقش الجسم
  const finalScaleX = bodyScaleXZ * fitScale * 1.06; // عرض التيشيرت
  const finalScaleY = bodyScaleY * fitScale * 1.02;  // طول التيشيرت عشان يغطي الكتف
  const finalScaleZ = bodyScaleXZ * fitScale * 1.12; // عمق التيشيرت (ده اللي بيخفي عضلات الصدر والظهر)

  // 🎯 رفعنا التيشيرت لمستوى الكتف (بدل 0.8 خليناها 0.95)
  const SHIRT_HEIGHT_FIX = 0.95 * bodyScaleY; 
  const yOffset = fitScale > 1.0 ? -((fitScale - 1.0) * 0.1) : 0;

  // 🎯 شيلنا زقة ה-Z اللي كانت بتفضح الظهر، ورجعناه في النص بالظبط (0)
  return (
    <primitive 
      object={scene} 
      position={[0, -1 + SHIRT_HEIGHT_FIX + yOffset, 0]} 
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
