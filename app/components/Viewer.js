'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

// 1. مكون الموديل الأساسي (الشخص) وتركيب الوجه
function Avatar({ faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); // لازم ملف avatar.glb يكون في فولدر public

  useEffect(() => {
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(faceUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        // البحث عن جزء الرأس في المجسم لتغيير صورته
        scene.traverse((child) => {
          // ملحوظة: لو اسم الرأس في الـ 3D مختلف عن 'Head'، غير الكلمة دي
          if (child.isMesh && (child.name.includes('Head') || child.name.includes('Face'))) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });
      });
    }
  }, [faceUrl, scene]);

  return <primitive object={scene} />;
}

// 2. مكون الملابس (تيشيرت أو بنطلون)
function ClothingItem({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// 3. المشهد الرئيسي
export default function Viewer({ faceUrl, activeShirt, activePants }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      {/* إضاءة احترافية */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        {/* عرض الموديل الأساسي */}
        <Avatar faceUrl={faceUrl} />
        
        {/* عرض التيشيرت المختار */}
        <ClothingItem url={activeShirt} />
        
        {/* عرض البنطلون المختار */}
        <ClothingItem url={activePants} />
      </Suspense>

      {/* ظل خفيف تحت الموديل */}
      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      
      {/* التحكم في الكاميرا بالماوس */}
      <OrbitControls 
        enablePan={false} 
        minDistance={2} 
        maxDistance={6} 
        target={[0, 1, 0]} // تركيز الكاميرا على نص الجسم
      />
    </Canvas>
  );
}

// تحميل مسبق للملفات عشان الموقع ميعلقش
useGLTF.preload('/avatar.glb');
useGLTF.preload('/maverick-phoenix-white.glb');
useGLTF.preload('/shirt2.glb');
useGLTF.preload('/pants1.glb');
useGLTF.preload('/pants2.glb');
