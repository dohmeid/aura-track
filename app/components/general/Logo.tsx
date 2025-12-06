import { Sparkles } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 group">
      <Sparkles
        className="w-6 h-6 transition-colors duration-200"
        style={{ color: 'var(--chantilly)' }}
      />
      <span
        className="text-xl font-bold transition-colors duration-200 truncate"
        style={{
          color: 'var(--foreground)',
          textShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        AuraTrack
      </span>
    </div>
  );
}
