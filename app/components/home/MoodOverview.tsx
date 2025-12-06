import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { Mood } from '@/lib/types';

interface MoodOverviewProps {
  todayMood?: Mood;
}

export default function MoodOverview({ todayMood }: MoodOverviewProps) {
  if (todayMood) {
    // Determine gradient based on mood score
    const getGradient = (score: number) => {
      if (score >= 8) return 'from-mint-tulip to-blizzard-blue';
      if (score >= 5) return 'from-sidecar to-chantilly';
      return 'from-clam-shell to-wistful';
    };

    const gradient = getGradient(todayMood.moodScore);

    return (
      <div
        className={`relative h-full overflow-hidden rounded-[30px] p-8 text-white bg-linear-to-br ${gradient} shadow-lg group transition-all duration-500 hover:shadow-xl hover:scale-[1.01]`}
      >
        {/* Decorative Circles with subtle movement on hover */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium opacity-90">Today&apos;s Aura</h3>
              <p className="text-4xl font-bold mt-2 capitalize">{todayMood.moodEmotion}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="text-2xl font-bold">{todayMood.moodScore}</span>
              <span className="text-sm opacity-75">/10</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-lg opacity-90 line-clamp-2 italic">
              &quot;{todayMood.moodDescription || "No notes added for today."}&quot;
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex gap-2 flex-wrap">
            {todayMood.moodTriggers.slice(0, 3).map(trigger => (
              <span key={trigger} className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm transition-colors hover:bg-white/30 cursor-default">
                {trigger}
              </span>
            ))}
            {todayMood.moodTriggers.length > 3 && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                +{todayMood.moodTriggers.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Not Logged View
  return (
    <div className="h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-[30px] p-8 shadow-sm flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-xl hover:border-white/80 transition-all duration-300 hover:scale-[1.01]">
      <div className="absolute inset-0 bg-linear-to-br from-wistful/5 to-chantilly/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="bg-white p-4 rounded-full shadow-md mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
        <Plus className="w-8 h-8 text-wistful" />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">Log Your Mood</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-8">
        Take a moment to reflect on your day. Tracking your energy helps you find balance.
      </p>

      <Link
        href="/log-mood"
        className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl z-10"
      >
        Check In <ArrowRight size={18} />
      </Link>
    </div>
  );
}