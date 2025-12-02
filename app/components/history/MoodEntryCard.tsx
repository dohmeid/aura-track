import React from 'react';
import { Calendar, Moon, Battery, Activity, ChevronDown } from 'lucide-react';
import { Mood } from '@/lib/types';

interface MoodEntryCardProps {
    mood: Mood;
}

const MoodEntryCard: React.FC<MoodEntryCardProps> = ({ mood }) => {
    const { timestamp, moodEmotion, sleepHours, energyLevel, activities, moodDescription, _id } = mood;

    // Determine color bar based on score (visual indicator)
    const scoreColor =
        mood.moodScore >= 8 ? 'bg-[var(--mint-tulip)]' :
            mood.moodScore >= 5 ? 'bg-[var(--blizzard-blue)]' :
                'bg-[var(--clam-shell)]';

    return (
        <article className="group relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            {/* Visual Indicator Bar on Left */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${scoreColor} opacity-70`}></div>

            <div className="p-6 pl-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    {/* Header: Date & Emotion */}
                    <div className="flex items-start gap-4">
                        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${scoreColor}/20 text-gray-700`}>
                            <span className="text-xl font-bold">{mood.moodScore}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">/10</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 capitalize">{moodEmotion}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Calendar size={14} />
                                <time dateTime={new Date(timestamp).toISOString()}>
                                    {new Date(timestamp).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white/50 rounded-xl p-3 border border-white/50">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">
                            <Moon size={14} className="text-ethereal-blue" /> Sleep
                        </div>
                        <p className="font-semibold text-gray-700">{sleepHours} hrs</p>
                    </div>

                    <div className="bg-white/50 rounded-xl p-3 border border-white/50">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">
                            <Battery size={14} className="text-dark-yelow" /> Energy
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div className="bg-dark-yelow h-1.5 rounded-full" style={{ width: `${energyLevel}%` }}></div>
                        </div>
                    </div>

                    <div className="col-span-2 bg-white/50 rounded-xl p-3 border border-white/50">
                        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">
                            <Activity size={14} className="text-chantilly" /> Activities
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                            {activities.length > 0 ? activities.join(', ') : 'No activities logged'}
                        </p>
                    </div>
                </div>

                {/* Expandable Notes */}
                {moodDescription && (
                    <details className="group/details border-t border-gray-100 pt-4">
                        <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-wistful hover:text-chantilly transition-colors">
                            <span>View Notes</span>
                            <ChevronDown size={16} className="transform transition-transform duration-300 group-open/details:rotate-180" />
                        </summary>
                        <div className="mt-3 text-gray-600 italic leading-relaxed bg-(--sidecar)/10 p-4 rounded-xl text-sm animate-in slide-in-from-top-2 fade-in duration-300">
                            "{moodDescription}"
                        </div>
                    </details>
                )}
            </div>
        </article>
    );
};

export default MoodEntryCard;