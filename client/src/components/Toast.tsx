import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ 
  message, 
  duration = 3000, 
  isVisible, 
  onClose 
}: ToastProps) {
  const [isShowing, setIsShowing] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for exit animation to complete
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transform transition-all duration-300 z-50 ${
        isShowing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {message}
    </div>
  );
}
