import { Mood } from '@/lib/types';
import { Clock } from 'lucide-react';

export default function RecentHistory({ moods }: { moods: Mood[] }) {
  // Take last 3 entries
  const recent = moods.slice(0, 3);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-wistful" />
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No recent history found.</p>
        ) : (
          recent.map((mood, idx) => (
            <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/80 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-default"
            >
              <div className="flex items-center gap-3">
                <div 
                   className="w-2 h-10 rounded-full" 
                   style={{ 
                     backgroundColor: mood.moodScore >= 7 ? 'var(--mint-tulip)' : mood.moodScore >= 4 ? 'var(--sidecar)' : 'var(--clam-shell)'
                   }}
                ></div>
                <div>
                    <p className="font-semibold text-gray-700 capitalize">{mood.moodEmotion}</p>
                    <p className="text-xs text-gray-400">
                        {new Date(mood.timestamp).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                </div>
              </div>
              <span className="font-bold text-gray-400 text-sm">{mood.moodScore}/10</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}