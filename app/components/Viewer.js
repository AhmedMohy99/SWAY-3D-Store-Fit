'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// 1. المانيكان (حجم الجسم + تركيب الوجه)
function Avatar({ height, weight, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); 

  // حساب الأبعاد بناءً على الطول والوزن
  const currentScale = useMemo(() => {
    const BASE_HEIGHT = 162; 
    const BASE_WEIGHT = 55;  
    const scaleY = height / BASE_HEIGHT;
    const weightRatio = weight / BASE_WEIGHT;
    const heightRatio = height / BASE_HEIGHT;
    const scaleXZ = Math.sqrt(weightRatio / heightRatio);
    return [scaleXZ, scaleY, scaleXZ];
  }, [height, weight]);

  // تركيب صورة الوجه على المانيكان
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

// 2. التيشيرت (حسب الملف المختار، المقاس، ونوع التلبيس)
function ClothingItem({ activeShirt, shirtSize, fitType }) {
  // بنحمل الملف اللي العميل اختاره (حالياً المافيريك شغال)
  // ملحوظة: لو اختار ملف مش موجود الموقع هيجيب إيرور 404 لحد ما ترفع باقي الملفات
  const { scene } = useGLTF(activeShirt); 

  const sizeScales = {
    "1 (S)": 1.0,
    "2 (M)": 1.05,
    "3 (L)": 1.10,
    "4 (XL)": 1.15
  };

  let newScale = sizeScales[shirtSize] || 1.0;

  // تعديل إضافي للـ Scale بناءً على الـ Fit Type
  if (fitType === 'Oversized') newScale += 0.05;
  if (fitType === 'Boxy') newScale += 0.02; // البوكسي أعرض بس مش أطول، بس هنمشيها scale مؤقتاً

  const yOffset = newScale > 1.0 ? -((newScale - 1.0) * 0.1) : 0;

  return <primitive object={scene} position={[0, -1 + yOffset, 0]} scale={[newScale, newScale, newScale]} />;
}

export default function Viewer({ height, weight, shirtSize, fitType, activeShirt, faceUrl }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} faceUrl={faceUrl} />
        
        {/* بنستدعي التيشيرت هنا */}
        <ClothingItem activeShirt={activeShirt} shirtSize={shirtSize} fitType={fitType} />
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#00FFFF" />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={1.5} 
        maxDistance={4} 
        target={[0, 0.5, 0]} 
      />
    </Canvas>
  );
}

// التحميل المسبق للملفات اللي موجودة عندك فعلاً
useGLTF.preload('/avatar.glb');
useGLTF.preload('/maverick-phoenix-white.glb');
