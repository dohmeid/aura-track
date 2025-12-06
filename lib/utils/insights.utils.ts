import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Mood {
  timestamp: string | Date;
}

export function calculateStreaks (moods: Mood[]): number {
  if (moods.length === 0) {
    return 0;
  }

  const sortedMoods = moods.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const moodDates = sortedMoods.map((mood) => {
    const date = new Date(mood.timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const uniqueMoodDates = [...new Set(moodDates)];

  const currentDate = new Date(today);

  for (let i = 0; i < uniqueMoodDates.length; i++) {
    const moodDate = new Date(uniqueMoodDates[i]);

    if (moodDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
