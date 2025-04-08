import React, { useState, useEffect } from "react";
import { Color } from "@shared/schema";
import { hexToRgb, rgbToHex } from "@/lib/colorUtils";

interface AdjustColorModalProps {
  color: Color;
  onClose: () => void;
  onApply: (color: Color) => void;
}

export default function AdjustColorModal({ color, onClose, onApply }: AdjustColorModalProps) {
  const [hexValue, setHexValue] = useState(color.hex);
  const [redValue, setRedValue] = useState(color.rgb.r);
  const [greenValue, setGreenValue] = useState(color.rgb.g);
  const [blueValue, setBlueValue] = useState(color.rgb.b);
  
  // Update RGB values when hex changes
  useEffect(() => {
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setRedValue(rgb.r);
      setGreenValue(rgb.g);
      setBlueValue(rgb.b);
    }
  }, [hexValue]);
  
  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Always make sure it starts with #
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    
    // Validate hex format
    if (/^#[0-9A-F]{0,6}$/i.test(value)) {
      setHexValue(value);
    }
  };
  
  // Handle RGB slider/input changes
  const handleRedChange = (value: number) => {
    const validValue = Math.min(255, Math.max(0, value));
    setRedValue(validValue);
    updateHexFromRgb(validValue, greenValue, blueValue);
  };
  
  const handleGreenChange = (value: number) => {
    const validValue = Math.min(255, Math.max(0, value));
    setGreenValue(validValue);
    updateHexFromRgb(redValue, validValue, blueValue);
  };
  
  const handleBlueChange = (value: number) => {
    const validValue = Math.min(255, Math.max(0, value));
    setBlueValue(validValue);
    updateHexFromRgb(redValue, greenValue, validValue);
  };
  
  const updateHexFromRgb = (r: number, g: number, b: number) => {
    setHexValue(rgbToHex(r, g, b));
  };
  
  const handleApply = () => {
    // Ensure hex is a valid 7-character hex code
    let finalHex = hexValue;
    if (finalHex.length < 7) {
      // Pad with zeros if necessary
      finalHex = finalHex + "0".repeat(7 - finalHex.length);
    }
    
    const updatedColor: Color = {
      hex: finalHex,
      rgb: { r: redValue, g: greenValue, b: blueValue },
      locked: color.locked
    };
    
    onApply(updatedColor);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Adjust Color</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="mb-6 space-y-4">
          <div 
            className="h-20 rounded-lg"
            style={{ backgroundColor: hexValue.length === 7 ? hexValue : color.hex }}
            id="adjustColorPreview"
          ></div>
          
          <div>
            <label htmlFor="hexInput" className="block text-gray-700 text-sm font-medium mb-2">Hex</label>
            <input 
              type="text" 
              id="hexInput"
              value={hexValue}
              onChange={handleHexChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="redSlider" className="block text-gray-700 text-sm font-medium mb-2">Red</label>
              <input 
                type="range" 
                id="redSlider" 
                min="0" 
                max="255" 
                value={redValue}
                onChange={(e) => handleRedChange(parseInt(e.target.value))}
                className="w-full"
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={redValue}
                onChange={(e) => handleRedChange(parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="greenSlider" className="block text-gray-700 text-sm font-medium mb-2">Green</label>
              <input 
                type="range" 
                id="greenSlider" 
                min="0" 
                max="255" 
                value={greenValue}
                onChange={(e) => handleGreenChange(parseInt(e.target.value))}
                className="w-full"
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={greenValue}
                onChange={(e) => handleGreenChange(parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="blueSlider" className="block text-gray-700 text-sm font-medium mb-2">Blue</label>
              <input 
                type="range" 
                id="blueSlider" 
                min="0" 
                max="255" 
                value={blueValue}
                onChange={(e) => handleBlueChange(parseInt(e.target.value))}
                className="w-full"
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={blueValue}
                onChange={(e) => handleBlueChange(parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-md"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
