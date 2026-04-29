'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import FaceUploader from './components/FaceUploader';

const Viewer = dynamic(() => import('./components/Viewer'), { 
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="text-[#00FFFF] uppercase tracking-[0.3em] text-sm animate-pulse mb-4">
          Loading SWAY Engine
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#00FFFF] animate-[loading_2s_ease-in-out_infinite]" 
               style={{
                 animation: 'loading 2s ease-in-out infinite',
               }}
          />
        </div>
      </div>
    </div>
  )
});

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const CONTACT_LINKS = {
  whatsapp: 'https://api.whatsapp.com/send?phone=201033866838',
  instagram: 'https://instagram.com/sway.maverick',
  tiktok: 'https://tiktok.com/@sway.maverick',
};

const productsList = [
  { id: '/maverick-phoenix-white.glb', name: 'MAVERICK PHOENIX (WHITE)', price: '730 EGP' },
  { id: '/maverick-phoenix-black.glb', name: 'MAVERICK PHOENIX (BLACK)', price: '730 EGP' },
  { id: '/powder-blue-venture-tee.glb', name: 'POWDER BLUE VENTURE TEE', price: '650 EGP' },
  { id: '/catalyst-tee.glb', name: 'THE CATALYST TEE', price: '680 EGP' },
  { id: '/bluish-splash.glb', name: 'BLUISH SPLASH', price: '650 EGP' },
  { id: '/yellowish-splash.glb', name: 'YELLOWISH SPLASH', price: '650 EGP' },
  { id: '/greenish-splash.glb', name: 'GREENISH SPLASH', price: '650 EGP' },
  { id: '/cyber-crescent.glb', name: 'CYBER CRESCENT', price: '720 EGP' },
  { id: '/eternity-protocol-white.glb', name: 'ETERNITY PROTOCOL (WHITE)', price: '750 EGP' },
  { id: '/eternity-protocol-navy.glb', name: 'ETERNITY PROTOCOL (NAVY)', price: '750 EGP' },
  { id: '/black-flux-sweatpants.glb', name: 'BLACK FLUX SWEATPANTS', price: '850 EGP' },
  { id: '/light-code-sweatpants.glb', name: 'LIGHT CODE SWEATPANTS', price: '850 EGP' }
];

export default function Home() {
  const [height, setHeight] = useState(162); 
  const [weight, setWeight] = useState(55);  
  const [shirtSize, setShirtSize] = useState('M'); 
  const [fitType, setFitType] = useState('OVERSIZED');
  const [activeShirt, setActiveShirt] = useState('/maverick-phoenix-white.glb');
  const [faceUrl, setFaceUrl] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const activeProduct = productsList.find(p => p.id === activeShirt);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    // Add haptic feedback for better UX
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      
      {/* 3D Viewer Background */}
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

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-6 pointer-events-auto">
        <div className="flex items-center gap-8">
          <button className="text-white/60 text-[9px] tracking-widest uppercase hover:text-[#00FFFF] transition-colors">
            HOME
          </button>
          <button className="text-white/60 text-[9px] tracking-widest uppercase hover:text-[#00FFFF] transition-colors">
            COLLECTION
          </button>
          <button className="text-white/60 text-[9px] tracking-widest uppercase hover:text-[#00FFFF] transition-colors">
            ABOUT
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="text-white text-[10px] tracking-widest uppercase hover:text-[#00FFFF] transition-colors relative"
        >
          CART ({cartCount})
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00FFFF] rounded-full animate-ping" />
          )}
        </button>
      </div>

      {/* Left Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-[380px] bg-black/90 backdrop-blur-md border-r border-white/5 p-8 flex flex-col z-10 overflow-y-auto pointer-events-auto custom-scrollbar">
        
        {/* Brand Header */}
        <div className="mb-10">
          <h1 className="text-white font-bold tracking-[0.3em] text-2xl uppercase">SWAY MAVERICK</h1>
          <p className="text-[#00FFFF] text-[8px] tracking-[0.2em] uppercase mt-1">TECHNICAL STREETWEAR</p>
        </div>

        <div className="flex flex-col gap-8 flex-1">
          
          {/* Face Upload */}
          <FaceUploader onFaceUpload={setFaceUrl} faceUrl={faceUrl} />

          {/* Product Selector */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              Select Item
            </label>
            <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {productsList.map((product) => (
                <button 
                  key={product.id}
                  onClick={() => setActiveShirt(product.id)}
                  className={`w-full px-4 py-3 text-[9px] border uppercase tracking-[0.1em] transition-all flex items-center justify-between group ${
                    activeShirt === product.id 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'text-gray-400 border-white/10 hover:border-[#00FFFF]/50 hover:text-white'
                  }`}
                >
                  <span>{product.name}</span>
                  <span className={`text-[8px] ${activeShirt === product.id ? 'text-black' : 'text-[#00FFFF]/70'}`}>
                    {product.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Fit Type */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              Fit Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['STANDARD', 'OVERSIZED', 'BOXY'].map((fit) => (
                <button 
                  key={fit}
                  onClick={() => setFitType(fit)}
                  className={`h-10 text-[9px] border uppercase tracking-widest transition-all ${
                    fitType === fit 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] font-bold scale-105' 
                    : 'text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              Size
            </label>
            <div className="grid grid-cols-5 gap-2">
              {SIZES.map((size) => (
                <button 
                  key={size}
                  onClick={() => setShirtSize(size)}
                  className={`h-12 text-[11px] border uppercase tracking-widest transition-all font-bold ${
                    shirtSize === size 
                    ? 'bg-[#00FFFF] text-black border-[#00FFFF] scale-110' 
                    : 'text-gray-400 border-white/10 hover:border-[#00FFFF]/50 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Body Measurements */}
          <div>
            <label className="block text-[#00FFFF] text-[10px] tracking-widest uppercase mb-3">
              Your Measurements
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 text-[9px] tracking-widest uppercase mb-2">
                  Height (CM)
                </label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min="100"
                  max="250"
                  className="w-full h-12 bg-transparent border border-white/10 focus:border-[#00FFFF] text-white text-center text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-[9px] tracking-widest uppercase mb-2">
                  Weight (KG)
                </label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  min="30"
                  max="200"
                  className="w-full h-12 bg-transparent border border-white/10 focus:border-[#00FFFF] text-white text-center text-sm outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full h-14 bg-[#00FFFF] text-black text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95"
          >
            Add to Cart • {activeProduct?.price}
          </button>

        </div>

        {/* Footer Links */}
        <footer className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <a 
              href={CONTACT_LINKS.instagram} 
              target="_blank" 
              rel="noreferrer" 
              className="text-center py-2 border border-white/10 text-gray-500 text-[8px] tracking-[0.2em] uppercase hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all"
            >
              Instagram
            </a>
            <a 
              href={CONTACT_LINKS.tiktok} 
              target="_blank" 
              rel="noreferrer" 
              className="text-center py-2 border border-white/10 text-gray-500 text-[8px] tracking-[0.2em] uppercase hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all"
            >
              TikTok
            </a>
          </div>
          <a 
            href={CONTACT_LINKS.whatsapp} 
            target="_blank" 
            rel="noreferrer" 
            className="block w-full text-center py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[9px] tracking-[0.2em] uppercase hover:bg-[#25D366]/20 transition-all"
          >
            Contact on WhatsApp
          </a>
        </footer>

      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-auto">
        <div className="flex flex-col gap-3">
          <button className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FFFF] hover:border-[#00FFFF]/50 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FFFF] hover:border-[#00FFFF]/50 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0%, 100% { width: 0%; }
          50% { width: 100%; }
        }
      `}</style>
    </main>
  );
}
