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

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0">
        {/* بنبعت الأرقام اللي العميل بيكتبها للمانيكان */}
        <Viewer height={height} weight={weight} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway</h1>
        </header>

        <div className="pointer-events-auto flex flex-col gap-6 w-full max-w-[300px] bg-black/80 backdrop-blur-md p-6 border border-white/10">
          
          <div className="text-center mb-2">
            <p className="text-white text-xs tracking-[0.2em] uppercase">Virtual Fitting</p>
            <p className="text-gray-500 text-[9px] tracking-widest uppercase mt-1">Enter your exact metrics</p>
          </div>

          {/* مربع إدخال الطول */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Height (CM)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-12 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-lg tracking-widest outline-none transition-all duration-300 placeholder:text-gray-700"
              placeholder="175"
            />
          </div>

          {/* مربع إدخال الوزن */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-2">Weight (KG)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-12 bg-black/50 border border-white/20 focus:border-[#00FFFF] text-white text-center text-lg tracking-widest outline-none transition-all duration-300 placeholder:text-gray-700"
              placeholder="70"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
