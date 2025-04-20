import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'wouter';
import { Color } from '@/types/Color';
import { Upload, Image as ImageIcon, ArrowLeft, RefreshCw } from 'lucide-react';
import { usePalette } from '@/contexts/PaletteContext';
import { hexToRgb, getColorName, rgbToHex } from '@/lib/colorUtils';

export default function ImagePalette() {
  const { setPalette } = usePalette();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedPalette, setExtractedPalette] = useState<Color[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setExtractedPalette([]);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };
  
  const extractColors = useCallback(() => {
    if (!uploadedImage || !canvasRef.current) return;
    
    setIsExtracting(true);
    setError(null);
    
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setError('Canvas context not supported in your browser.');
        setIsExtracting(false);
        return;
      }
      
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      try {
        // Get pixel data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        
        // Sample pixels and create color map
        const colorMap: { [key: string]: number } = {};
        const pixelCount = imageData.length / 4;
        const sampleRate = Math.max(1, Math.floor(pixelCount / 10000)); // Sample at most 10,000 pixels
        
        for (let i = 0; i < pixelCount; i += sampleRate) {
          const offset = i * 4;
          const r = imageData[offset];
          const g = imageData[offset + 1];
          const b = imageData[offset + 2];
          
          // Skip transparent pixels
          if (imageData[offset + 3] < 128) continue;
          
          // Convert to hex
          const hex = rgbToHex(r, g, b);
          
          // Quantize colors to reduce variations
          const quantizedHex = quantizeColor(hex, 24); // Group similar colors together
          
          if (colorMap[quantizedHex]) {
            colorMap[quantizedHex]++;
          } else {
            colorMap[quantizedHex] = 1;
          }
        }
        
        // Sort colors by frequency and take the top 5
        const sortedColors = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .map(([hex]) => hex)
          .slice(0, 5);
        
        // Create Color objects
        const palette: Color[] = sortedColors.map(hex => {
          const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
          const name = getColorName(hex);
          return {
            hex,
            rgb,
            locked: false,
            name
          };
        });
        
        setExtractedPalette(palette);
      } catch (err) {
        console.error('Error extracting colors:', err);
        setError('Failed to extract colors from the image.');
      }
      
      setIsExtracting(false);
    };
    
    img.onerror = () => {
      setError('Failed to load the image. Please try another one.');
      setIsExtracting(false);
    };
    
    img.src = uploadedImage;
  }, [uploadedImage]);
  
  const useExtractedPalette = () => {
    if (extractedPalette.length > 0) {
      setPalette(extractedPalette);
      window.location.href = '/'; // Redirect to the main page
    }
  };
  
  // Using imported rgbToHex function from colorUtils.ts
  
  // Helper function to quantize colors (reduce color space)
  const quantizeColor = (hex: string, levels: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const factor = 255 / (levels - 1);
    
    const qr = Math.round(Math.round(r / factor) * factor);
    const qg = Math.round(Math.round(g / factor) * factor);
    const qb = Math.round(Math.round(b / factor) * factor);
    
    return rgbToHex(qr, qg, qb);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
            Image to Palette
          </h1>
          <Link href="/">
            <a className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="mr-1" size={20} />
              Back to Generator
            </a>
          </Link>
        </div>
        <p className="text-gray-600 mt-2">
          Upload an image to extract a color palette from its dominant colors.
        </p>
      </header>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col items-center">
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <button
            onClick={triggerFileInput}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mb-6"
          >
            <Upload size={20} />
            {uploadedImage ? 'Upload Different Image' : 'Upload Image'}
          </button>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 w-full">
              {error}
            </div>
          )}
          
          {uploadedImage && (
            <div className="w-full max-w-2xl mx-auto mb-6">
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full object-contain max-h-[400px]" 
                />
              </div>
              
              <button
                onClick={extractColors}
                disabled={isExtracting}
                className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2 mx-auto"
              >
                {isExtracting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Extracting Colors...
                  </>
                ) : (
                  <>
                    <ImageIcon size={18} />
                    Extract Colors
                  </>
                )}
              </button>
            </div>
          )}
          
          {extractedPalette.length > 0 && (
            <div className="w-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Extracted Palette</h2>
              
              <div className="flex h-24 mb-6 rounded-lg overflow-hidden shadow-md">
                {extractedPalette.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex-1" 
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="h-full flex items-end justify-center p-2">
                      <div className="text-center">
                        <span 
                          className={`text-xs font-medium px-2 py-1 rounded bg-white bg-opacity-30 ${
                            parseInt(color.hex.slice(1), 16) > 0xFFFFFF / 2 ? 'text-gray-800' : 'text-white'
                          }`}
                        >
                          {color.hex}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={useExtractedPalette}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                Use This Palette
              </button>
            </div>
          )}
          
          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}