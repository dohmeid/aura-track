'use client';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

export default function QuoteCard() {
  const [quote, setQuote] = useState({ quote: 'Loading aura...', author: '' });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        setQuote({ quote: 'You are capable of amazing things.', author: 'Unknown' });
      }
    };
    fetchQuote();
  }, []);

  return (
    <div className="bg-linear-to-br from-sidecar/40 to-white/60 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-sm flex flex-col justify-center h-full relative overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
      <Quote className="absolute top-4 right-4 text-dark-yelow/20 w-16 h-16 rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
      <div className="relative">
        <p className="font-medium text-gray-800 leading-relaxed font-serif group-hover:text-gray-900 transition-colors">
          "{quote.quote}"
        </p>
        <p className="text-xs text-gray-500 mt-3 font-semibold group-hover:text-wistful transition-colors">— {quote.author}</p>
      </div>
    </div>
  );
}