'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';

function Avatar({ faceUrl, bodySize }) {
  const { scene } = useGLTF('/avatar.glb'); 

  // حساب الأبعاد بناءً على المقاس المختار
  // تقدر تغير الأرقام دي براحتك عشان تظبط التخانة والطول زي ما إنت عايز
  const currentScale = useMemo(() => {
    switch (bodySize) {
      case 'S':  return [1.1, 1.15, 1.1]; // أرفع وأقصر شوية
      case 'M':  return [1.2, 1.2, 1.2];  // المقاس الطبيعي بتاعنا
      case 'L':  return [1.3, 1.25, 1.3]; // أعرض وأطول شوية
      case 'XL': return [1.4, 1.3, 1.4];  // أعرض وأطول حاجة
      default:   return [1.2, 1.2, 1.2];
    }
  }, [bodySize]);

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

  // هنا بنطبق الأبعاد (currentScale) على المجسم، وكمان خلينا حركة المجسم ناعمة (animated)
  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

export default function Viewer({ faceUrl, bodySize }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        {/* بنمرر المقاس للمانيكان */}
        <Avatar faceUrl={faceUrl} bodySize={bodySize} />
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
