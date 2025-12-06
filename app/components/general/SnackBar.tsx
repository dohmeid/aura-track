'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X, AlertCircle } from 'lucide-react';

interface SnackBarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function SnackBar({ message, type = 'success', isVisible, onClose }: SnackBarProps) {
  const [show, setShow] = useState(isVisible);

  // Sync internal state with prop
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setShow(true);
      }, 0);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 0);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  let bgStyle = '';
  let iconColor = '';
  let Icon = CheckCircle2;

  switch (type) {
    case 'success':
      bgStyle = 'bg-mint-tulip/20 border-mint-tulip text-green-800';
      iconColor = 'text-green-600';
      Icon = CheckCircle2;
      break;
    case 'error':
      bgStyle = 'bg-red-50 border-red-200 text-red-800';
      iconColor = 'text-red-600';
      Icon = XCircle;
      break;
    default:
      bgStyle = 'bg-blue-50 border-blue-200 text-blue-800';
      iconColor = 'text-blue-600';
      Icon = AlertCircle;
  }

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border-2 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 fade-in duration-300 ${bgStyle}`}
      >
        <div className="flex items-center gap-4">
          <Icon className={`w-6 h-6 shrink-0 ${iconColor}`} />
          <p className="font-medium text-base leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-2 hover:bg-black/5 rounded-full transition-colors ml-4 shrink-0"
          aria-label="Close notification"
        >
          <X className="w-5 h-5 opacity-60" />
        </button>
      </div>
    </div>
  );
}
