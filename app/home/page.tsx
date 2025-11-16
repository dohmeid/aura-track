'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

// Custom colors matching the signup page
const CUSTOM_COLORS = {
  chantilly: '#f3b2dd', // Pink/Lavender (Primary Accent)
  wistful: '#9fa1d2',   // Muted Blue (Secondary Accent)
  sidecar: '#f1e6ae',   // Light Yellow/Cream (Background Accent)
  blizzardBlue: '#a0dbe9', // Sky Blue (Background Base)
  mintTulip: '#c4f2e8',   // Mint Green (Background Accent)
  ghost: '#cdced3',     // Light Gray (Text/Borders)
  clamShell: '#d0b4b3', // Rosy Beige (Neutral Accent)
};

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);

  const successType = searchParams.get('success');
  const isLogin = successType === 'login';
  const isSignup = successType === 'signup';
  const hasSuccess = isLogin || isSignup;

  useEffect(() => {
    if (hasSuccess) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // Hide message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [hasSuccess]);

  const handleDismiss = () => {
    setShowMessage(false);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Success Message */}
      {hasSuccess && showMessage && (
        <div
          className="fixed top-8 left-1/2 transform -translate-x-1/2 max-w-md w-full animate-in slide-in-from-top-4"
          style={{
            backgroundColor: CUSTOM_COLORS.mintTulip,
            boxShadow: `0 10px 25px -5px ${CUSTOM_COLORS.wistful}40`,
          }}
        >
          <div className="p-5 rounded-xl flex items-start gap-4">
            <CheckCircle
              className="w-6 h-6 shrink-0 mt-0.5"
              style={{ color: '#059669' }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1" style={{ color: '#065f46' }}>
                {isSignup ? 'Welcome to Aura Track!' : 'Welcome Back!'}
              </h3>
              <p style={{ color: '#047857' }} className="text-sm">
                {isSignup
                  ? 'Your account has been created successfully. Start tracking your energy today!'
                  : 'You have been logged in successfully. Welcome back!'}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Close message"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-extrabold mb-4"
          style={{ color: CUSTOM_COLORS.chantilly }}
        >
          Welcome to Aura Track
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Track your energy and discover your potential.
        </p>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Energy Tracking', 'Analytics', 'Community'].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: 'white', borderLeft: `4px solid ${CUSTOM_COLORS.wistful}` }}
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: CUSTOM_COLORS.wistful }}>
                {feature}
              </h2>
              <p className="text-gray-600">
                {feature === 'Energy Tracking' && 'Monitor your daily energy levels and identify patterns.'}
                {feature === 'Analytics' && 'Get insights into your energy trends with detailed analytics.'}
                {feature === 'Community' && 'Connect with others and share your aura journey.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}