import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
  delay?: number;
}

export default function InsightCard({ title, value, hint, icon: Icon, colorClass = "text-gray-800", delay = 0 }: Props) {
  return (
    <div 
        className="bg-white/60 backdrop-blur-md border border-white/60 p-5 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
        style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-2">
         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
         {Icon && <Icon className={`w-5 h-5 opacity-70 ${colorClass}`} />}
      </div>
      
      <div>
        <div className={`text-2xl font-bold mt-1 ${colorClass}`}>
            {value}
        </div>
        {hint && <div className="text-xs text-gray-400 mt-2 font-medium">{hint}</div>}
      </div>
    </div>
  );
}