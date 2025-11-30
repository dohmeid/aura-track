import { Moon, Flame, Smile } from 'lucide-react';

interface StatsProps {
  avgMood: number;
  avgSleep: number;
  streak: number;
}

export default function StatsCards({ avgMood, avgSleep, streak }: StatsProps) {
  const stats = [
    {
      label: 'Avg Mood',
      value: avgMood ? avgMood.toFixed(1) : '-',
      sub: '/ 10',
      icon: Smile,
      color: 'text-chantilly',
      bg: 'bg-chantilly/10',
    },
    {
      label: 'Avg Sleep',
      value: avgSleep ? avgSleep.toFixed(1) : '-',
      sub: 'hrs',
      icon: Moon,
      color: 'text-ethereal-blue',
      bg: 'bg-ethereal-blue/10',
    },
    {
      label: 'Streak',
      value: streak,
      sub: 'days',
      icon: Flame,
      color: 'text-dark-yelow',
      bg: 'bg-dark-yelow/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-white/60 backdrop-blur-md border border-white/60 p-5 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 hover:bg-white/80 transition-all duration-300 group cursor-default"
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
            <stat.icon size={20} className={stat.color} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              <span className="text-xs text-gray-500 font-medium">{stat.sub}</span>
            </div>
            <p className="text-sm text-gray-400 font-medium mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}