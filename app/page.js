'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

export default function Home() {
  // القيم الافتراضية لما الموقع يفتح
  const [height, setHeight] = useState(175); 
  const [weight, setWeight] = useState(70);  

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0">
        <Viewer height={height} weight={weight} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
        <header className="flex justify-between items-center pointer-events-auto">
          <h1 className="text-white font-bold tracking-[0.4em] text-2xl uppercase">Sway</h1>
        </header>

        <div className="pointer-events-auto flex flex-col gap-6 w-full max-w-[300px] bg-black/80 backdrop-blur-md p-6 border border-white/10">
          
          {/* متحكم الطول */}
          <div>
            <div className="flex justify-between text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              <span>Height</span>
              <span>{height} cm</span>
            </div>
            <input 
              type="range" 
              min="140" 
              max="220" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-1 bg-white/20 appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#00FFFF]"
            />
          </div>

          {/* متحكم الوزن */}
          <div>
            <div className="flex justify-between text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              <span>Weight</span>
              <span>{weight} kg</span>
            </div>
            <input 
              type="range" 
              min="40" 
              max="150" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-1 bg-white/20 appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#00FFFF]"
            />
          </div>

        </div>
      </div>
    </main>
  );
}
