'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

export default function Home() {
  const [faceUrl, setFaceUrl] = useState(null);
  const [bodySize, setBodySize] = useState('M'); // المقاس الافتراضي
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
        {/* بنبعت المقاس للـ 3D هنا */}
        <Viewer faceUrl={faceUrl} bodySize={bodySize} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway</h1>
          <button className="text-white text-xs tracking-widest uppercase hover:text-[#00FFFF] transition-colors">Cart(0)</button>
        </header>

        <div className="pointer-events-auto flex flex-col gap-6 w-full max-w-[250px] bg-black/60 backdrop-blur-md p-6 border border-white/10">
          
          {/* اختيار المقاس */}
          <div>
            <p className="text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">Select Fit Size</p>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setBodySize(size)}
                  className={`flex-1 h-10 text-xs border uppercase tracking-widest transition-all ${
                    bodySize === size 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] font-bold' 
                    : 'text-white border-white/30 hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </main>
  );
}
