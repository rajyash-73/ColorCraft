import React from "react";

export default function KeyboardShortcutsBar() {
  return (
    <div className="bg-gray-800 text-white text-xs py-1 px-4 flex justify-center items-center space-x-4 shadow-md">
      <div className="flex items-center space-x-1">
        <div className="px-2 py-1 bg-gray-700 rounded text-center">Space</div>
        <span>Generate new palette</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="px-2 py-1 bg-gray-700 rounded text-center">L</div>
        <span>Lock/unlock color</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="px-2 py-1 bg-gray-700 rounded text-center">C</div>
        <span>Copy color code</span>
      </div>
    </div>
  );
}
