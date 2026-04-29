'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

export default function Home() {
  const [height, setHeight] = useState(175); 
  const [weight, setWeight] = useState(70);  
  const [shirtSize, setShirtSize] = useState('2 (M)'); 
  const [fitType, setFitType] = useState('Oversized');
  const [activeShirt, setActiveShirt] = useState('/maverick-phoenix-white.glb');
  const [faceUrl, setFaceUrl] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFaceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaceUrl(url);
    }
  };

  // قائمة التيشيرتات (تقدر تغير الأسماء وتضيف براحتك)
  const shirtsList = [
    { id: '/maverick-phoenix-white.glb', name: 'Maverick Phoenix (White)' },
    { id: '/cyber-core-black.glb', name: 'Cyber Core (Black)' },
    { id: '/neon-drift-grey.glb', name: 'Neon Drift (Grey)' },
  ];

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      {/* طبقة الـ 3D */}
      <div className="absolute inset-0 z-0">
        <Viewer 
          height={height} 
          weight={weight} 
          shirtSize={shirtSize} 
          fitType={fitType} 
          activeShirt={activeShirt}
          faceUrl={faceUrl}
        />
      </div>

      {/* طبقة التحكم (UI) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-8">
        
        {/* البار العلوي */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div>
            <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway Maverick</h1>
            <p className="text-[#00FFFF] text-[9px] tracking-widest uppercase mt-1">Technical Streetwear</p>
          </div>
          <button className="text-white text-xs tracking-widest uppercase hover:text-[#00FFFF] transition-colors">Cart (0)</button>
        </header>

        {/* لوحة التحكم الرئيسية */}
        <div className="pointer-events-auto flex flex-col gap-5 w-full max-w-[320px] bg-black/80 backdrop-blur-md p-6 border border-white/10 overflow-y-auto max-h-[80vh] custom-scrollbar">
          
          {/* 1. رفع الصورة */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-[#00FFFF] text-[10px] tracking-widest uppercase">Face Mapping</label>
              {faceUrl && <span className="text-green-400 text-[8px] uppercase tracking-widest">Mapped ✓</span>}
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFaceUpload} className="hidden" />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-10 border border-[#00FFFF] text-[#00FFFF] text-xs uppercase tracking-wider hover:bg-[#00FFFF] hover:text-black transition-all"
            >
              Upload Your Face
            </button>
          </div>

          <hr className="border-white/10" />

          {/* 2. اختيار التيشيرت */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Select Item</label>
            <div className="flex flex-col gap-2">
              {shirtsList.map((shirt) => (
                <button 
                  key={shirt.id}
                  onClick={() => setActiveShirt(shirt.id)}
                  className={`w-full h-9 text-[10px] border uppercase tracking-widest transition-all ${
                    activeShirt === shirt.id 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'text-gray-400 border-white/20 hover:border-white/50'
                  }`}
                >
                  {shirt.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. نوع التلبيس */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Fit Type</label>
            <div className="flex gap-2">
              {['Standard', 'Oversized', 'Boxy'].map((fit) => (
                <button 
                  key={fit}
                  onClick={() => setFitType(fit)}
                  className={`flex-1 h-8 text-[9px] border uppercase tracking-widest transition-all ${
                    fitType === fit 
                    ? 'bg-gray-700 text-white border-gray-700' 
                    : 'text-gray-500 border-white/20 hover:border-white/50'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* 4. مقاس التيشيرت */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Size</label>
            <div className="flex gap-2">
              {['1 (S)', '2 (M)', '3 (L)', '4 (XL)'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setShirtSize(size)}
                  className={`flex-1 h-9 text-xs border uppercase tracking-widest transition-all ${
                    shirtSize === size 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] font-bold' 
                    : 'text-white border-white/30 hover:border-white'
                  }`}
                >
                  {size.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-white/10" />

          {/* 5. أبعاد العميل */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-400 text-[9px] tracking-widest uppercase mb-1">Height (CM)</label>
              <input 
                type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-9 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-sm outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 text-[9px] tracking-widest uppercase mb-1">Weight (KG)</label>
              <input 
                type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-9 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-sm outline-none"
              />
            </div>
          </div>

        </div>

        {/* السوشيال ميديا (أسفل الشاشة) */}
        <footer className="pointer-events-auto mt-auto pt-6 flex gap-6 text-white/50 text-[10px] tracking-widest uppercase">
          <a href="#" className="hover:text-[#00FFFF] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">TikTok</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">Twitter</a>
        </footer>

      </div>
    </main>
  );
}
