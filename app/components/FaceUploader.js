'use client';
import { useRef, useState } from 'react';

export default function FaceUploader({ onFaceUpload, faceUrl }) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const extractFace = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for face extraction
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to square for better face mapping
          const size = Math.min(img.width, img.height);
          canvas.width = 512;
          canvas.height = 512;
          
          // Calculate center crop
          const sourceX = (img.width - size) / 2;
          const sourceY = (img.height - size) / 2;
          
          // Draw center-cropped image
          ctx.drawImage(
            img,
            sourceX, sourceY, size, size,
            0, 0, 512, 512
          );
          
          // Apply slight brightness/contrast enhancement
          const imageData = ctx.getImageData(0, 0, 512, 512);
          const data = imageData.data;
          
          for (let i = 0; i < data.length; i += 4) {
            // Slight contrast boost
            data[i] = Math.min(255, data[i] * 1.1);     // R
            data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
            data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          // Convert to blob URL
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            resolve(url);
          }, 'image/png', 0.95);
        };
        
        img.onerror = reject;
        img.src = e.target.result;
      };
      
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size must be less than 10MB');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const faceUrl = await extractFace(file);
      onFaceUpload(faceUrl);
    } catch (error) {
      console.error('Error processing face:', error);
      alert('Failed to process image. Please try another photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="text-[#00FFFF] text-[10px] tracking-widest uppercase">
          Face Mapping
        </label>
        {faceUrl && (
          <span className="text-green-400 text-[8px] uppercase tracking-widest animate-pulse">
            ✓ MAPPED
          </span>
        )}
        {isProcessing && (
          <span className="text-yellow-400 text-[8px] uppercase tracking-widest animate-pulse">
            Processing...
          </span>
        )}
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        className="hidden" 
      />
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="w-full h-12 border border-[#00FFFF] text-[#00FFFF] text-[10px] uppercase tracking-[0.2em] hover:bg-[#00FFFF] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'PROCESSING...' : faceUrl ? 'CHANGE FACE' : 'UPLOAD YOUR FACE'}
      </button>
      
      {faceUrl && (
        <button
          onClick={() => onFaceUpload(null)}
          className="w-full h-8 mt-2 text-[8px] text-gray-500 uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          Remove Face
        </button>
      )}
    </div>
  );
}
