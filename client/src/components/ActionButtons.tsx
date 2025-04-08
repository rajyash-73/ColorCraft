import React from "react";

interface ActionButtonsProps {
  onGenerate: () => void;
  onAddColor: () => void;
  onClearAll: () => void;
}

export default function ActionButtons({ onGenerate, onAddColor, onClearAll }: ActionButtonsProps) {
  return (
    <div className="p-3 bg-white shadow-md flex justify-between items-center border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <button 
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition"
          onClick={onAddColor}
          aria-label="Add color"
        >
          <i className="fas fa-plus text-sm"></i>
          <span className="text-sm font-medium">Add Color</span>
        </button>
        
        <button 
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition"
          onClick={onClearAll}
          aria-label="Clear all colors"
        >
          <i className="fas fa-trash-alt text-sm"></i>
          <span className="text-sm font-medium">Clear All</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          className="flex items-center space-x-2 bg-primary hover:bg-blue-500 text-white py-2 px-5 rounded-md transition-colors group relative animate-bounce-slow"
          onClick={onGenerate}
          aria-label="Generate new palette"
        >
          <i className="fas fa-dice text-sm"></i>
          <span className="text-sm font-medium">Generate</span>
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Press Space
          </span>
        </button>
      </div>
    </div>
  );
}
