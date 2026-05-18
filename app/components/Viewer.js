'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// =========================================================================
// 🛠️ الإعدادات الأساسية للأفاتار
// =========================================================================
const BASE_HEIGHT = 162;       // الطول الافتراضي للأفاتار بالسنتيمتر
const BASE_WEIGHT = 55;        // الوزن الافتراضي للأفاتار بالكيلوجم
const CHEST_HEIGHT_FROM_PIVOT = 0.42; // ارتفاع الصدر عن نقطة المنتصف (عدلها لو التيشيرت محتاج ترحيل فوق أو تحت)
// =========================================================================

function Avatar({ height, weight, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); 

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
        
        scene.traverse((child) => {
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
  }, [faceUrl, scene]);

  // الأفاتار يبدأ من الأرض [0, -1, 0]
  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

function ClothingItem({ activeShirt, shirtSize, fitType, height, weight }) {
  const { scene } = useGLTF(activeShirt); 

  const bodyScaleY = height / BASE_HEIGHT;
  const weightRatio = weight / BASE_WEIGHT;
  const heightRatio = height / BASE_HEIGHT;
  const bodyScaleXZ = Math.sqrt(weightRatio / heightRatio);

  // نسب تكبير المقاسات لحجم التيشيرت
  const sizeScales = {
    "S": 0.95,
    "M": 1.00,
    "L": 1.05,
    "XL": 1.10,
    "2XL": 1.15
  };

  let fitScale = sizeScales[shirtSize] || 1.0;
  
  if (fitType === 'OVERSIZED') fitScale *= 1.06;
  if (fitType === 'BOXY') fitScale *= 1.03;

  // فوارق بسيطة جداً لمنع تداخل الأسطح (Clipping)
  const CLEARANCE_X = 1.02;  
  const CLEARANCE_Z = 1.03;  
  const CLEARANCE_Y = 1.00;  
  
  const finalScaleX = bodyScaleXZ * fitScale * CLEARANCE_X;
  const finalScaleY = bodyScaleY * fitScale * CLEARANCE_Y;
  const finalScaleZ = bodyScaleXZ * fitScale * CLEARANCE_Z;

  // 🔥 الحسبة الجديدة: التيشيرت بيتحرك مباشرة لمستوى الصدر بناءً على طول الجسم
  const yPosition = -1 + (CHEST_HEIGHT_FROM_PIVOT * bodyScaleY);

  return (
    <primitive 
      object={scene} 
      position={[0, yPosition, 0]} 
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
            key={activeShirt} // الـ key هنا بيجبر ريأكت يجدد التيشيرت بشكل نظيف عند التغيير بدل الـ clone
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

useGLTF.preload('/avatar.glb');
