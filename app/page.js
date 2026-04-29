'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-screen items-center justify-center text-[#00FFFF] bg-black uppercase tracking-widest text-sm animate-pulse">Loading SWAY Engine...</div>
});

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const CONTACT_LINKS = {
  whatsapp: 'https://api.whatsapp.com/send?phone=201033866838',
};

const productsList = [
  { id: '/maverick-phoenix-white.glb', name: 'MAVERICK PHOENIX (WHITE)' },
  { id: '/maverick-phoenix-black.glb', name: 'MAVERICK PHOENIX (BLACK)' },
  { id: '/powder-blue-venture-tee.glb', name: 'POWDER BLUE VENTURE TEE' },
  { id: '/catalyst-tee.glb', name: 'THE CATALYST TEE' },
  { id: '/bluish-splash.glb', name: 'BLUISH SPLASH' },
  { id: '/yellowish-splash.glb', name: 'YELLOWISH SPLASH' },
  { id: '/greenish-splash.glb', name: 'GREENISH SPLASH' },
  { id: '/cyber-crescent.glb', name: 'CYBER CRESCENT' },
  { id: '/eternity-protocol-white.glb', name: 'ETERNITY PROTOCOL (WHITE)' },
  { id: '/eternity-protocol-navy.glb', name: 'ETERNITY PROTOCOL (NAVY)' },
  { id: '/black-flux-sweatpants.glb', name: 'BLACK FLUX SWEATPANTS' },
  { id: '/light-code-sweatpants.glb', name: 'LIGHT CODE SWEATPANTS' }
];

export default function Home() {
  const [height, setHeight] = useState(162); 
  const [weight, setWeight] = useState(55);  
  const [shirtSize, setShirtSize] = useState('M'); 
  const [fitType, setFitType] = useState('OVERSIZED');
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

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
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

      <div className="absolute top-8 right-8 z-20 pointer-events-auto">
        <button className="text-white text-[10px] tracking-widest uppercase hover:text-[#00FFFF] transition-colors">CART (0)</button>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-[380px] bg-black/90 backdrop-blur-md border-r border-white/5 p-8 flex flex-col z-10 overflow-y-auto pointer-events-auto custom-scrollbar">
        
        <div className="mb-10">
          <h1 className="text-white font-bold tracking-[0.3em] text-2xl uppercase">SWAY MAVERICK</h1>
          <p className="text-[#00FFFF] text-[8px] tracking-[0.2em] uppercase mt-1">TECHNICAL STREETWEAR</p>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          
          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="text-[#00FFFF] text-[10px] tracking-widest uppercase">FACE MAPPING</label>
              {faceUrl && <span className="text-green-400 text-[8px] uppercase tracking-widest">MAPPED ✓</span>}
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFaceUpload} className="hidden" />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-12 border border-[#00FFFF] text-[#00FFFF] text-[10px] uppercase tracking-[0.2em] hover:bg-[#00FFFF] hover:text-black transition-all"
            >
              UPLOAD YOUR FACE
            </button>
          </div>

          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">SELECT ITEM</label>
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
              {productsList.map((shirt) => (
                <button 
                  key={shirt.id}
                  onClick={() => setActiveShirt(shirt.id)}
                  className={`w-full h-10 text-[9px] border uppercase tracking-[0.1em] transition-all flex-shrink-0 ${
                    activeShirt === shirt.id 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'text-gray-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  {shirt.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">FIT TYPE</label>
            <div className="flex gap-2">
              {['STANDARD', 'OVERSIZED', 'BOXY'].map((fit) => (
                <button 
                  key={fit}
                  onClick={() => setFitType(fit)}
                  className={`flex-1 h-10 text-[9px] border uppercase tracking-widest transition-all ${
                    fitType === fit 
                    ? 'bg-gray-700 text-white border-gray-700' 
                    : 'text-gray-500 border-white/10 hover:border-white/30'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">SIZE</label>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button 
                  key={size}
                  onClick={() => setShirtSize(size)}
                  className={`flex-1 h-10 text-[10px] border uppercase tracking-widest transition-all ${
                    shirtSize === size 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] font-bold' 
                    : 'text-gray-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  ({size})
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-500 text-[9px] tracking-widest uppercase mb-2">HEIGHT (CM)</label>
              <input 
                type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-10 bg-transparent border border-white/10 focus:border-[#00FFFF] text-white text-center text-xs outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-500 text-[9px] tracking-widest uppercase mb-2">WEIGHT (KG)</label>
              <input 
                type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-10 bg-transparent border border-white/10 focus:border-[#00FFFF] text-white text-center text-xs outline-none"
              />
            </div>
          </div>

        </div>

        <footer className="mt-8 pt-6 border-t border-white/10 flex gap-6 text-gray-500 text-[8px] tracking-[0.2em] uppercase">
          <a href="#" className="hover:text-[#00FFFF] transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">TIKTOK</a>
          <a href="#" className="hover:text-[#00FFFF] transition-colors">TWITTER</a>
          <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#00FFFF] transition-colors ml-auto text-[#00FFFF]/70">WHATSAPP</a>
        </footer>

      </div>
    </main>
  );
}
