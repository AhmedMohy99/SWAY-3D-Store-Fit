'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

function Avatar({ height, weight }) {
  const { scene } = useGLTF('/avatar.glb'); 

  // حساب الأبعاد الديناميكية
  const currentScale = useMemo(() => {
    // 1. تحديد مقاسات المانيكان الافتراضية (وهو على مقياس 1)
    const BASE_HEIGHT = 175; // سم
    const BASE_WEIGHT = 70;  // كجم

    // 2. حساب نسبة الطول (Y-Axis)
    const scaleY = height / BASE_HEIGHT;

    // 3. حساب نسبة العرض والعمق (X & Z Axes)
    const weightRatio = weight / BASE_WEIGHT;
    const heightRatio = height / BASE_HEIGHT;
    
    // استخدام الجذر التربيعي عشان زيادة الوزن تبان بشكل طبيعي مش مجرد استرتش غبي
    const scaleXZ = Math.sqrt(weightRatio / heightRatio);

    return [scaleXZ, scaleY, scaleXZ];
  }, [height, weight]);

  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

export default function Viewer({ height, weight }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} />
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

useGLTF.preload('/avatar.glb');
