import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/auth.actions';
import { getMoodsForUser } from '@/app/actions/mood.actions';
import { calculateStreaks } from '@/lib/insights.utils';
import { MoodEntry } from '@/lib/types';

// Components
import WelcomeHeader from '@/app/components/home/WelcomeHeader';
import StatsCards from '@/app/components/home/StatsCards';
import MoodOverview from '@/app/components/home/MoodOverview';
import QuoteCard from '@/app/components/home/QuoteCard';
import RecentHistory from '@/app/components/home/RecentHistory';

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const moods = await getMoodsForUser(user.userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMood = moods.find((mood: MoodEntry) => {
    const moodDate = new Date(mood.timestamp);
    moodDate.setHours(0, 0, 0, 0);
    return moodDate.getTime() === today.getTime();
  });

  const weeklyMoods = moods.filter((mood: MoodEntry) => {
    const moodDate = new Date(mood.timestamp);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return moodDate > lastWeek;
  });

  const avgMood =
    weeklyMoods.length > 0
      ? weeklyMoods.reduce((acc: number, mood: MoodEntry) => acc + mood.moodScore, 0) /
      weeklyMoods.length
      : 0;

  const avgSleep =
    weeklyMoods.length > 0
      ? weeklyMoods.reduce((acc: number, mood: MoodEntry) => acc + mood.sleepHours, 0) /
      weeklyMoods.length
      : 0;

  const streak = calculateStreaks(moods);

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="relative z-8 flex flex-col h-full max-w-8xl mx-auto space-y-12">
        {/* 1. Header Section */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <WelcomeHeader name={user.username || 'Friend'} />
        </div>

        {/* 2. Main Dashboard Grid (Bento Box Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-auto md:grid-rows-[minmax(300px,auto)_minmax(200px,auto)] gap-6 grow animate-in fade-in zoom-in-95 duration-1000 delay-100 fill-mode-backwards">

          {/* Main Hero Card (Take up 7 columns) */}
          <div className="md:col-span-7 lg:col-span-8 h-full min-h-[300px]">
            <MoodOverview todayMood={todayMood} />
          </div>

          {/* Side Stack (Stats) (Take up 5 columns) */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 h-full min-h-[300px]">
            <div className="flex-1">
              <StatsCards avgMood={avgMood} avgSleep={avgSleep} streak={streak} />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="md:col-span-5 lg:col-span-4 h-full min-h-[200px]">
            <QuoteCard />
          </div>

          <div className="md:col-span-7 lg:col-span-8 h-full min-h-[200px]">
            <RecentHistory moods={moods} />
          </div>

        </div>
      </div>
    </div>
  );
}
