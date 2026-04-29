'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

export default function Home() {
  const [height, setHeight] = useState(175); 
  const [weight, setWeight] = useState(70);  
  const [shirtSize, setShirtSize] = useState('1 (S)'); // المقاس الافتراضي للتيشيرت

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0">
        <Viewer height={height} weight={weight} shirtSize={shirtSize} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway</h1>
        </header>

        <div className="pointer-events-auto flex flex-col gap-6 w-full max-w-[300px] bg-black/80 backdrop-blur-md p-6 border border-white/10">
          
          <div className="text-center mb-2">
            <p className="text-white text-xs tracking-[0.2em] uppercase">Virtual Fitting</p>
          </div>

          {/* مقاسات التيشيرت */}
          <div>
            <p className="text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Shirt Fit (Oversized Logic)</p>
            <div className="flex gap-2">
              {['1 (S)', '2 (M)', '3 (L)', '4 (XL)'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setShirtSize(size)}
                  className={`flex-1 h-10 text-xs border uppercase tracking-widest transition-all ${
                    shirtSize === size 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] font-bold' 
                    : 'text-white border-white/30 hover:border-white'
                  }`}
                >
                  {size.split(' ')[1]} {/* عشان يعرض S, M, L, XL بس على الزرار */}
                </button>
              ))}
            </div>
          </div>

          {/* إدخال الطول */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Your Height (CM)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-10 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-sm tracking-widest outline-none transition-all duration-300"
            />
          </div>

          {/* إدخال الوزن */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Your Weight (KG)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-10 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-sm tracking-widest outline-none transition-all duration-300"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
