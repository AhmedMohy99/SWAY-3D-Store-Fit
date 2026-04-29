'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

function Avatar({ faceUrl }) {
  // هنا بنحمل المانيكان بس بمسار صريح وثابت عشان ميضربش
  const { scene } = useGLTF('/avatar.glb'); 

  useEffect(() => {
    // طباعة أسماء أجزاء الجسم في الكونسول
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("🔍 Part found:", child.name);
      }
    });

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

  return <primitive object={scene} position={[0, -1, 0]} scale={[1.2, 1.2, 1.2]} />;
}

export default function Viewer({ faceUrl }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Avatar faceUrl={faceUrl} />
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
