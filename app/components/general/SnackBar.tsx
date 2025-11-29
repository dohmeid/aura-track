'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface SnackBarProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function SnackBar({ message, type = 'success', isVisible, onClose }: SnackBarProps) {
  const [show, setShow] = useState(false);

  // Sync internal state with prop
  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';
  
  // Dynamic styles based on type
  const bgStyle = isSuccess 
    ? 'bg-mint-tulip/20 border-mint-tulip text-green-800' 
    : 'bg-red-100 border-red-200 text-red-800';

  const iconColor = isSuccess ? 'text-green-600' : 'text-red-600';

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div 
        className={`flex items-center justify-between p-4 rounded-xl border-2 shadow-lg backdrop-blur-md animate-in slide-in-from-top-2 fade-in duration-300 ${bgStyle}`}
      >
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle2 className={`w-6 h-6 ${iconColor}`} />
          ) : (
            <XCircle className={`w-6 h-6 ${iconColor}`} />
          )}
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-black/5 rounded-full transition-colors"
        >
          <X className="w-4 h-4 opacity-60" />
        </button>
      </div>
    </div>
  );
}