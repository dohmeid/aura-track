import { Sparkles } from 'lucide-react';

export default function Logo() {

    return (
        <>
            <Sparkles className="w-6 h-6 text-white/90 group-hover:text-white transition-colors" />
            <span
                className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            >
                AuraTrack
            </span>
        </>
    );
};