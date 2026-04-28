'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

export default function Home() {
  const [faceUrl, setFaceUrl] = useState(null);
  // خلينا التيشيرت الافتراضي والوحيد هو الملف بتاعك
  const [activeShirt, setActiveShirt] = useState('/maverick-phoenix-white.glb');
  const fileInputRef = useRef(null);

  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceUrl(url);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0">
        {/* شيلنا البنطلون من هنا لأنه مش موجود */}
        <Viewer faceUrl={faceUrl} activeShirt={activeShirt} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
        
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway</h1>
          <button className="text-white text-xs tracking-widest uppercase hover:text-[#00FFFF] transition-colors">Cart(0)</button>
        </header>

        <div className="pointer-events-auto flex flex-col gap-6 w-full max-w-[250px] bg-black/60 backdrop-blur-md p-6 border border-white/10">
          
          {/* زرار رفع الصورة */}
          <div>
            <p className="text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">Face Mapping</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFaceUpload} className="hidden" />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-12 border border-[#00FFFF] text-[#00FFFF] text-xs uppercase tracking-wider hover:bg-[#00FFFF] hover:text-black transition-all"
            >
              Upload Face
            </button>
          </div>

          {/* القطعة الحالية */}
          <div>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-3">Selected Item</p>
            <button className="w-full h-12 text-xs border bg-white text-black border-white uppercase tracking-widest font-bold">
              Maverick Phoenix
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
