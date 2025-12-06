'use client';
import { useEffect, useState } from 'react';

export default function WelcomeHeader({ name }: { name: string }) {
  const [greeting, setGreeting] = useState('Welcome back');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const newGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    setTimeout(() => {
      setGreeting(newGreeting);
      setDateStr(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
    }, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          {greeting}, <span className="text-wistful">{name}</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Here is your aura overview for today.
        </p>
      </div>
      <div className="text-right hidden md:block">
        <p className="text-sm font-bold text-clam-shell uppercase tracking-wider">{dateStr}</p>
      </div>
    </div>
  );
}