'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

function Avatar({ faceUrl }) {
  // الكود بيفترض إن ملف avatar.glb لسه موجود عندك في public
  const { scene } = useGLTF('/avatar.glb'); 

  useEffect(() => {
    if (faceUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(faceUrl, (texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        scene.traverse((child) => {
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

function ClothingItem({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Viewer({ faceUrl, activeShirt }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar faceUrl={faceUrl} />
        <ClothingItem url={activeShirt} />
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={2} 
        maxDistance={6} 
        target={[0, 1, 0]} 
      />
    </Canvas>
  );
}

// التحميل المسبق للملفات الحقيقية بس
useGLTF.preload('/avatar.glb');
useGLTF.preload('/maverick-phoenix-white.glb');
