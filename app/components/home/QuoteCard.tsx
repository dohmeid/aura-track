'use client';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import selfLoveQuotes from '@/lib/data/selfLoveQuotes.json';

export default function QuoteCard() {
  const [quote, setQuote] = useState('Loading aura...');

  useEffect(() => {
    const getRandomQuote = () => {
      try {
        const randomIndex = Math.floor(Math.random() * selfLoveQuotes.length);
        setQuote(selfLoveQuotes[randomIndex]);
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuote('You are worthy of love and kindness, especially from yourself.');
      }
    };
    getRandomQuote();
  }, []);

  return (
    <div className="bg-linear-to-br from-sidecar/40 to-white/60 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-sm flex flex-col justify-center h-full relative overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
      <Quote className="absolute top-4 right-4 text-dark-yelow/20 w-16 h-16 rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
      <div className="relative">
        <p className="font-medium text-gray-800 leading-relaxed font-serif group-hover:text-gray-900 transition-colors text-center">
          "{quote}"
        </p>
      </div>
    </div>
  );
}