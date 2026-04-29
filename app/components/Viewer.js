'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

// 1. المانيكان الأساسي (بيتأثر بالطول والوزن)
function Avatar({ height, weight }) {
  const { scene } = useGLTF('/avatar.glb'); 

  const currentScale = useMemo(() => {
    const BASE_HEIGHT = 162; // خليناها 162 زي ما طلبت في اللوجيك
    const BASE_WEIGHT = 55;  

    const scaleY = height / BASE_HEIGHT;
    const weightRatio = weight / BASE_WEIGHT;
    const heightRatio = height / BASE_HEIGHT;
    const scaleXZ = Math.sqrt(weightRatio / heightRatio);

    return [scaleXZ, scaleY, scaleXZ];
  }, [height, weight]);

  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

// 2. التيشيرت (بيتأثر بالمقاس المختار وبيترجم اللوجيك بتاعك)
function ClothingItem({ shirtSize }) {
  // لما يوصلك ملف التيشيرت، هتحط اسمه هنا بدل avatar
  // مؤقتاً أنا موقف السطر ده عشان ميضربش إيرور لحد ما تجيب الملف
  // const { scene } = useGLTF('/shirt.glb'); 

  // النسب اللي إنت كتبتها في اللوجيك
  const sizeScales = {
    "1 (S)": 1.0,
    "2 (M)": 1.05,
    "3 (L)": 1.10,
    "4 (XL)": 1.15
  };

  const newScale = sizeScales[shirtSize] || 1.0;
  
  // اللوجيك بتاعك: النزول لتحت لو المقاس كبير عشان ميبقاش طاير
  const yOffset = newScale > 1.0 ? -((newScale - 1.0) * 0.1) : 0;

  // لما يكون معاك الملف، هترجع السطر ده وتلغي الـ return null
  // return <primitive object={scene} position={[0, -1 + yOffset, 0]} scale={[newScale, newScale, newScale]} />;
  
  return null; // مؤقتاً لحد ما ترفع ملف التيشيرت
}

// المشهد الرئيسي
export default function Viewer({ height, weight, shirtSize }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} />
        
        {/* مررنا مقاس التيشيرت للقطعة */}
        <ClothingItem shirtSize={shirtSize} />
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
// useGLTF.preload('/shirt.glb'); // هتشغل دي لما ترفع الملف
