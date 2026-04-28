'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// استدعاء شاشة الـ 3D بطريقة تمنع إيرور Vercel الأبيض
const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen items-center justify-center text-white bg-black uppercase tracking-widest">Loading SWAY Engine...</div>
});

export default function Home() {
  const [faceUrl, setFaceUrl] = useState(null);
  const [activeShirt, setActiveShirt] = useState('/maverick-phoenix-white.glb');
  const [activePants, setActivePants] = useState('/pants1.glb');
  const fileInputRef = useRef(null);

  // دالة التعامل مع رفع صورتك
  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceUrl(url);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-zinc-950 overflow-hidden font-sans">
      
      {/* طبقة الـ 3D في الخلفية */}
      <div className="absolute inset-0 z-0">
        <Viewer faceUrl={faceUrl} activeShirt={activeShirt} activePants={activePants} />
      </div>

      {/* طبقة واجهة المستخدم UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6">
        
        {/* البار العلوي واللوجو */}
        <header className="flex justify-between items-center pointer-events-auto">
          {/* لو عندك لوجو حقيقي حطه هنا، لو مش شغال هيبان كـ نص */}
          <div className="w-24 h-8 relative">
             <Image src="/logo.png" alt="SWAY" fill className="object-contain" />
          </div>
          <button className="text-white text-xs tracking-widest uppercase hover:text-cyan-400">Cart(0)</button>
        </header>

        {/* لوحة التحكم الجانبية */}
        <div className="pointer-events-auto flex flex-col gap-6 w-64 bg-black/60 backdrop-blur-md p-6 border border-white/10 rounded-lg">
          
          {/* 1. رفع الصورة */}
          <div>
            <p className="text-cyan-400 text-[10px] tracking-widest uppercase mb-2">Face Mapping</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFaceUpload} className="hidden" />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-10 border border-white/20 text-white text-xs uppercase hover:bg-white hover:text-black transition-all"
            >
              Upload Your Face
            </button>
          </div>

          {/* 2. اختيار التيشيرت */}
          <div>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-2">T-Shirts</p>
            <div className="flex gap-2">
              <button onClick={() => setActiveShirt('/shirt1.glb')} className={`flex-1 h-8 text-xs border ${activeShirt === '/shirt1.glb' ? 'bg-cyan-400 text-black border-cyan-400' : 'text-white border-white/20'}`}>Tee 1</button>
              <button onClick={() => setActiveShirt('/shirt2.glb')} className={`flex-1 h-8 text-xs border ${activeShirt === '/shirt2.glb' ? 'bg-cyan-400 text-black border-cyan-400' : 'text-white border-white/20'}`}>Tee 2</button>
            </div>
          </div>

          {/* 3. اختيار البنطلون */}
          <div>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-2">Pants</p>
            <div className="flex gap-2">
              <button onClick={() => setActivePants('/pants1.glb')} className={`flex-1 h-8 text-xs border ${activePants === '/pants1.glb' ? 'bg-cyan-400 text-black border-cyan-400' : 'text-white border-white/20'}`}>Pant 1</button>
              <button onClick={() => setActivePants('/pants2.glb')} className={`flex-1 h-8 text-xs border ${activePants === '/pants2.glb' ? 'bg-cyan-400 text-black border-cyan-400' : 'text-white border-white/20'}`}>Pant 2</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
