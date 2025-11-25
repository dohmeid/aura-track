'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

function SuccessMessage({ isLogin }: { isLogin: boolean }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowMessage(false);
  };

  if (!showMessage) return null;

  return (
    <div
      role="status"
      className="fixed left-1/2 top-8 w-full max-w-md -translate-x-1/2 animate-in slide-in-from-top-4"
      style={{
        backgroundColor: 'var(--mint-tulip)',
        boxShadow: `0 10px 25px -5px var(--wistful) 40`,
      }}
    >
      <div className="flex items-center justify-between rounded-lg px-6 py-4">
        <div className="flex items-center gap-3">
          <CheckCircle size={24} className="text-green-600" />
          <div>
            <p className="font-semibold text-gray-800">
              {isLogin ? 'Welcome back!' : 'Account created!'}
            </p>
            <p className="text-sm text-gray-700">
              {isLogin
                ? 'You have successfully logged in.'
                : 'Your account has been created successfully.'}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Dismiss message"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default SuccessMessage;
