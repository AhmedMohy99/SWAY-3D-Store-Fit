'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// =========================================================================
// 🎛️ لوحة التحكم وإعدادات التطابق مع جدول المقاسات الجديد
// =========================================================================
const CONFIG = {
  BASE_HEIGHT: 162,          // الطول المرجعي (عند وزن 55 كيلو يطابق مقاس M)
  BASE_WEIGHT: 55,           
  SHIRT_OFFSET_Y: 0.49,      // وزنية الارتفاع عند الرقبة
  SHIRT_OFFSET_Z: 0.07,      // وزنية البروز للأمام لمنع تداخل الظهر
  SHIRT_OFFSET_X: 0.00
};
// =========================================================================

function Avatar({ height, weight, faceUrl }) {
  const { scene } = useGLTF('/avatar.glb'); 

  const currentScale = useMemo(() => {
    const scaleY = height / CONFIG.BASE_HEIGHT;
    const weightRatio = weight / CONFIG.BASE_WEIGHT;
    const heightRatio = height / CONFIG.BASE_HEIGHT;
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

  return <primitive object={scene} position={[0, -1, 0]} scale={currentScale} />;
}

function ClothingItem({ activeShirt, shirtSize, fitType, height, weight }) {
  const { scene } = useGLTF(activeShirt); 

  const bodyScaleY = height / CONFIG.BASE_HEIGHT;
  const weightRatio = weight / CONFIG.BASE_WEIGHT;
  const heightRatio = height / CONFIG.BASE_HEIGHT;
  const bodyScaleXZ = Math.sqrt(weightRatio / heightRatio);

  // 📐 حسابات دقيقة بناءً على جدول المقاسات الخاص بك (معيار المقارنة هو مقاس M = 1.0)
  // تم حساب الفروق بناءً على زيادة الـ 2 سم المنتظمة في العرض والطول بالجدول
  const sizeWidthScales = {
    "M": 1.00,
    "L": 1.034,
    "XL": 1.069,
    "XXL": 1.103,
    "3XL": 1.138
  };

  const sizeHeightScales = {
    "M": 1.00,
    "L": 1.028,
    "XL": 1.057,
    "XXL": 1.085,
    "3XL": 1.114
  };

  // جلب المعاملات بناءً على المقاس المختار (وإرجاع الافتراضي M إذا لم يوجد)
  let widthMultiplier = sizeWidthScales[shirtSize] || 1.0;
  let heightMultiplier = sizeHeightScales[shirtSize] || 1.0;
  
  // تطبيق تأثير الـ Oversized أو Boxy بشكل متناسق مع الأبعاد الجديدة
  if (fitType === 'OVERSIZED') {
    widthMultiplier *= 1.04;
    heightMultiplier *= 1.03;
  }
  if (fitType === 'BOXY') {
    widthMultiplier *= 1.03;
    heightMultiplier *= 0.98; // الـ Boxy بيكون أقصر شوية في الطول وأعرض في الجوانب
  }

  // فوارق الأمان الثابتة (Clearance) لمنع ظهور مش الأفاتار من تحت القماش
  const CLEARANCE_X = 1.03;  
  const CLEARANCE_Z = 1.05;  
  const CLEARANCE_Y = 1.01;  
  
  // حساب المقاييس النهائية المنفصلة للمحاور الثلاثة
  const finalScaleX = bodyScaleXZ * widthMultiplier * CLEARANCE_X;
  const finalScaleY = bodyScaleY * heightMultiplier * CLEARANCE_Y;
  const finalScaleZ = bodyScaleXZ * widthMultiplier * CLEARANCE_Z; // العظام الجانبية والعمق تتبع العرض

  // ضبط المواقع بناءً على الإعدادات الديناميكية
  const posX = CONFIG.SHIRT_OFFSET_X;
  const posY = -1 + (CONFIG.SHIRT_OFFSET_Y * bodyScaleY);
  const posZ = (CONFIG.SHIRT_OFFSET_Z * bodyScaleXZ); 

  return (
    <primitive 
      object={scene} 
      position={[posX, posY, posZ]} 
      scale={[finalScaleX, finalScaleY, finalScaleZ]} 
    />
  );
}

export default function Viewer({ height, weight, shirtSize, fitType, activeShirt, faceUrl }) {
  return (
    <Canvas camera={{ position: [0, 0.3, 2.3], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} intensity={1.2} castShadow />

      <Suspense fallback={null}>
        <Avatar height={height} weight={weight} faceUrl={faceUrl} />
        
        {activeShirt && (
          <ClothingItem 
            key={activeShirt + '-' + shirtSize + '-' + fitType} // كود حاسم لإعادة بناء الموديل فوراً عند تغيير المقاس أو الستايل
            activeShirt={activeShirt} 
            shirtSize={shirtSize} 
            fitType={fitType} 
            height={height} 
            weight={weight} 
          />
        )}
      </Suspense>

      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={8} blur={1.5} far={3} color="#00FFFF" />
      
      <OrbitControls 
        enablePan={false} 
        minDistance={1.0} 
        maxDistance={4} 
        target={[0, 0.1, 0]} 
      />
    </Canvas>
  );
}

useGLTF.preload('/avatar.glb');
