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
    <div className="min-h-screen flex items-center p-8">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        {/* 1. Header Section */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <WelcomeHeader name={user.username || 'Friend'} />
        </div>

        {/* 2. Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-1000 delay-100 fill-mode-backwards">
          <MoodOverview todayMood={todayMood} />
          <StatsCards avgMood={avgMood} avgSleep={avgSleep} streak={streak} />
          <RecentHistory moods={moods} />
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}
